import logging
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import qrcode
import base64
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from .models import UserData
from .serializers import UserSerializer
import uuid
from pymongo import MongoClient


from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = 'index.html'


# Set up logging
logger = logging.getLogger(__name__)

# MongoDB Configuration
MONGO_DB_NAME = 'work'
MONGO_COLLECTION_NAME = 'data'
MONGO_COLLECTION_NAME2 = 'course'
MONGO_CLIENT = MongoClient('mongodb://localhost:27017/')
mongo_collection = MONGO_CLIENT[MONGO_DB_NAME][MONGO_COLLECTION_NAME]
mongo_collection2 = MONGO_CLIENT[MONGO_DB_NAME][MONGO_COLLECTION_NAME2]

@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        data = request.data
        logger.info(f"Incoming request data: {data}")

        required_fields = ['name_project', 'name_lead', 'email', 'phone', 'no_people']
        for field in required_fields:
            if field not in data:
                logger.error(f"Missing field: {field}. Incoming data: {data}")
                return Response({'error': f'Missing required field: {field}', 'incoming_data': data}, status=status.HTTP_400_BAD_REQUEST)

        unique_id = str(uuid.uuid4())
        unique_id = str(uuid.uuid4())
        try:
            qr_data = (
                f"ID: {unique_id}\n"
                f"Project: {data['name_project']}\n"
                f"Team Lead: {data['name_lead']}\n"
                f"Email: {data['email']}\n"
                f"Contact: {data['phone']}\n"
                f"Team Members: {data['no_people']}\n"
                f"Apply Date: {data['applydate']}"
            )
            qr_code = qrcode.make(qr_data).convert("RGBA")
            logger.info("QR CODE GENERATED")

            logo_path = "logo.jpg"
            logo = Image.open(logo_path).convert("RGBA")
            logo_size = (70, 70)
            logo = logo.resize(logo_size, Image.LANCZOS)

            qr_width, qr_height = qr_code.size
            logo_position = ((qr_width - logo_size[0]) // 2, (qr_height - logo_size[1]) // 2)
            qr_code.alpha_composite(logo, logo_position)

            qr_code_resized = qr_code.resize((500, 500), Image.LANCZOS)

            background_path = "template.jpg"  
            background = Image.open(background_path).convert("RGBA")

            qr_x_position, qr_y_position = 220, 120
            text_x_position, text_y_position = 100, 750

            background.alpha_composite(qr_code_resized, (qr_x_position, qr_y_position))

            draw = ImageDraw.Draw(background)
            font = ImageFont.truetype("calibri.ttf", 50)
            text = (
                f"Project title: {data['name_project']}\n"
                f"Team Lead: {data['name_lead']}\n"
                f"Email: {data['email']}\n"
                f"Contact: {data['phone']}\n"
                f"Team Members: {data['no_people']}\n"
                f"Apply Date: {data['applydate']}"
            )
            draw.multiline_text((text_x_position, text_y_position), text, fill="black", font=font, spacing=5)

            combined_image_buffer = BytesIO()
            background.save(combined_image_buffer, format="PNG")
            combined_image_buffer.seek(0)
            combined_image_base64 = base64.b64encode(combined_image_buffer.getvalue()).decode('utf-8')
            combined_image_data_uri = f"data:image/png;base64,{combined_image_base64}"

            qr_image_buffer = BytesIO()
            qr_code.save(qr_image_buffer, format='PNG')
            qr_image_buffer.seek(0)
            qr_code_base64 = base64.b64encode(qr_image_buffer.getvalue()).decode('utf-8')
            qr_code_data_uri = f"data:image/png;base64,{qr_code_base64}"

            # Save user data to the Django model
            user = UserData.objects.create(
                name_project=data['name_project'],
                name_lead =data['name_lead'],
                phone=data['phone'],
                email=data['email'],
                no_people=data['no_people'],
                applydate=data['applydate'],
                unique_id=unique_id
            )

            # Prepare user data for response
            user_data = {
                'name_project': user.name_project,
                'name_lead': user.name_lead,
                'phone': user.phone,
                'email': user.email,
                'no_people': user.no_people,
                'applydate': user.applydate,
                'unique_id': user.unique_id,
                'qr_code': qr_code_data_uri,
                'combined_image': combined_image_data_uri
            }

            # Insert user data into MongoDB
            mongo_collection.insert_one(user_data)

            # Serialize user data
            serializer = UserSerializer(user)

            # Return response
            return Response({
                'user': serializer.data,
                'qr_code': qr_code_data_uri,
                'combined_image': combined_image_data_uri
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({"error": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_additional_info(request):
    if request.method == 'POST':
        data = request.data
        course_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'address_line_1': data.get('address_line_1'),
            'address_line_2': data.get('address_line_2'),
            'city': data.get('city'),
            'state': data.get('state'),
            'zip_code': data.get('zip_code'),
            'educational_level': data.get('educational_level'),
            'additional_info': data.get('additional_info')
        }
        mongo_collection2.insert_one(course_data)
        return Response({'message': 'Data added successfully'}, status=status.HTTP_201_CREATED)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
