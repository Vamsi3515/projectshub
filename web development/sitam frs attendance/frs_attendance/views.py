import binascii
from datetime import datetime
from http.client import responses
import traceback
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework import generics
from .models import Student, Attendance, Branch, User
from .serializers import StudentSerializer, AttendanceSerializer, BranchSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt 
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser, AllowAny
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import render, redirect
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth import logout
import cv2
import face_recognition_models
import face_recognition
import pickle
import base64
from django.http import JsonResponse
from .models import Student, Attendance
from datetime import date
import numpy as np
import base64
from io import BytesIO
from PIL import Image
import base64
import numpy as np
from django.http import JsonResponse
import json
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from .models import Student, Branch
from django.db.utils import IntegrityError
from django.http import HttpResponse
import pandas as pd
from django.http import JsonResponse
import base64
import numpy as np
from .models import Student, Attendance
from datetime import date
import logging

User = get_user_model()  

def login_view(request):
    if request.user.is_authenticated:
        return redirect('index')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'frs_attendance/login_signup.html', {
        'message' : messages.error
    })

def user_create_view(request):
    success = 0 
    errors = {}

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        profile_photo = request.FILES.get('profile_photo')

        if password != confirm_password:
            return render(request, 'frs_attendance/login_signup.html', {
                'message' : "Password and Confirm Password should match"
            })

        else:
            if User.objects.filter(username=username).exists():
                errors['username'] = "Username is already taken."
            if User.objects.filter(email=email).exists():
                errors['email'] = "Email is already taken."
            
            if not errors:
                try:
                    user = User.objects.create_user(
                        username=username,
                        email=email,
                        password=password
                    )
                    if profile_photo:
                        user.profile_photo = profile_photo 
                    user.save()
                    success = 1  
                    messages.success(request, 'User created successfully.')
                    return redirect('login')  
                except IntegrityError:
                    messages.error(request, 'An error occurred while creating the user.')
            else:

                for field, error in errors.items():
                    messages.error(request, f"{field}: {error}")
    
    return render(request, 'frs_attendance/login_signup.html', {
        'success': success,
        'errors': errors,
    })


def logout_view(request):
    logout(request)
    return redirect('login')


def correct_base64_padding(base64_string):
    missing_padding = len(base64_string) % 4
    if missing_padding:
        base64_string += '=' * (4 - missing_padding)
    return base64_string

@csrf_exempt
def add_student_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            name = data.get("name")
            roll_num = data.get("roll_num")
            branch_id = data.get("branch")
            email = data.get("email", None)
            face_data = data.get("face_data", None)

            if not name or not roll_num or not branch_id:
                return JsonResponse({"error": "Name, roll number, and branch are required."}, status=400)

            if Student.objects.filter(roll_num=roll_num).exists():
                return JsonResponse({"error": "Student with this roll number already exists!"}, status=400)
                
            if email and Student.objects.filter(email=email).exists():
                return JsonResponse({"error": "Student with this email already exists!"}, status=400)

            if email:
                try:
                    validate_email(email)
                except ValidationError:
                    return JsonResponse({"error": "Invalid email format."}, status=400)

            try:
                branch = Branch.objects.get(id=branch_id)
            except Branch.DoesNotExist:
                return JsonResponse({"error": "Invalid branch selected."}, status=400)

            if face_data:
                try:
                    face_data = correct_base64_padding(face_data)  

                    face_image_data = base64.b64decode(face_data)

                    image = face_recognition.load_image_file(BytesIO(face_image_data))

                    face_encodings = face_recognition.face_encodings(image)

                    if not face_encodings:
                        return JsonResponse({"error": "No face detected in the image."}, status=400)

                    face_encoding = face_encodings[0]

                    encoded_face_data = base64.b64encode(face_encoding).decode('utf-8')

                except Exception as e:
                    print("Error:", str(e))  
                    print("Stack trace:", traceback.format_exc())  
                    return JsonResponse({"error": f"Something went wrong! Details: {str(e)}"}, status=500)
            else:
                return JsonResponse({"error": "Face data is required."}, status=400)

            Student.objects.create(
                name=name,
                roll_num=roll_num,
                branch=branch,
                email=email,
                face_data=encoded_face_data,  
            )
            return JsonResponse({"message": "Student added successfully!"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)

        except Exception as e:
            print(f"An error occurred: {str(e)}")  
            return JsonResponse({"error": f"Something went wrong! Try again. Details: {str(e)}"}, status=500)

    branches = Branch.objects.all()
    return render(request, 'frs_attendance/add_student.html', {"branches": branches})

# User Registration (Create)
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# List Users (Admin)
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Branch CRUD Views
class BranchListCreate(generics.ListCreateAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class BranchDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

# Student CRUD Views

class StudentListCreate(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):

        if not request.data.get('name'):
            return Response(
                {"error": "The 'name' field is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        response = super().create(request, *args, **kwargs)

        return Response(
            {
                "message": "Student added successfully!",
                "data": response.data
            },
            status=response.status_code,
        )


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": f"Student {instance.name} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )

# Attendance CRUD Views
class AttendanceListCreate(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AttendanceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

@csrf_exempt
def add_branch(request):
    if request.method == 'POST':
        branch_name = request.POST.get('branch_name')
        batch_start_year = request.POST.get('batch') 
        strength = request.POST.get('strength')

        if not branch_name or not batch_start_year or not strength:
            return render(request, 'frs_attendance/add_branch.html', {
                'error': 'All fields are required!',
                'batch_years': range(2011, datetime.now().year + 1)
            })

        if Branch.objects.filter(name=branch_name, batch_start_year=batch_start_year).exists():
            return render(request, 'frs_attendance/add_branch.html', {
                'error': 'Branch with the same name and batch year already exists!',
                'batch_years': range(2011, datetime.now().year + 1)

            })

        try:
            branch = Branch.objects.create(
                name=branch_name,
                batch_start_year=batch_start_year,
                strength=int(strength)
            )
            messages.success(request, 'Branch added successfully')
            return redirect('add-branch')
        except Exception as e:
            print(f'An error occurred: {str(e)}')
            return render(request, 'frs_attendance/add_branch.html', {
                'error': 'Failed to add branch',
                'batch_years': range(2011, datetime.now().year + 1)
            })

    return render(request, 'frs_attendance/add_branch.html', {'batch_years': range(2011, datetime.now().year + 1)
})

def index(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'frs_attendance/index.html')

def collect_attendance(request):
    return render(request, 'frs_attendance/collect_attendance.html')

#Mark Attendance

ENCODINGS_FILE = "face_recognition/encodings.pickle"

# Load face encodings once to optimize performance
with open(ENCODINGS_FILE, "rb") as file:
    data = pickle.load(file)

logger = logging.getLogger(__name__)

@csrf_exempt
def capture_and_mark_attendance(request):
    if request.method == "POST":
        try:
            frame_data = request.POST.get("frame")
            if not frame_data:
                return JsonResponse({"error": "Frame data missing"}, status=400)

            if frame_data.startswith('data:image/jpeg;base64,'):
                frame_data = frame_data.split(',')[1]

            try:
                frame_bytes = base64.b64decode(frame_data, validate=True)
            except binascii.Error:
                return JsonResponse({"error": "Invalid base64 encoding in frame data."}, status=400)

            frame_array = np.frombuffer(frame_bytes, dtype=np.uint8)
            frame = cv2.imdecode(frame_array, cv2.IMREAD_COLOR)

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_locations = face_recognition.face_locations(rgb_frame)

            if not face_locations:
                return JsonResponse({"message": "No faces detected", "status": "Not Found"})

            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
            students = Student.objects.exclude(face_data__isnull=True).exclude(face_data__exact="")
            known_encodings, known_names = [], []

            for student in students:
                try:
                    student_encoding = np.frombuffer(base64.b64decode(student.face_data), dtype=np.float64)
                    if student_encoding.size == 128:
                        known_encodings.append(student_encoding)
                        known_names.append((student.name, student.roll_num))
                except Exception as e:
                    print(f"Error decoding face data for {student.name}: {e}")

            for face_encoding in face_encodings:
                distances = face_recognition.face_distance(known_encodings, face_encoding)
                best_match_index = np.argmin(distances)

                if distances[best_match_index] < 0.5:
                    matched_name, matched_roll = known_names[best_match_index]
                    student = Student.objects.get(roll_num=matched_roll)

                    attendance, created = Attendance.objects.get_or_create(
                        student=student,
                        date=date.today(),
                        defaults={"status": "Present"}
                    )
                    if not created:
                        attendance.status = "Present"
                        attendance.save()

                    return JsonResponse({"name": matched_name, "roll_num": matched_roll, "status": "Marked"})

            return JsonResponse({"message": "No matches found", "status": "Unknown"})

        except Exception as e:
            print("Error:", str(e))
            print("Stack trace:", traceback.format_exc())
            return JsonResponse({"error": f"Something went wrong! Details: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def process_frame(request):
    if request.method == "POST":
        try:
            frame_data = request.POST.get("frame")
            if not frame_data:
                return JsonResponse({"error": "No frame provided"}, status=400)

            if "," in frame_data:
                _, base64_data = frame_data.split(",", 1)
            else:
                base64_data = frame_data

            frame_bytes = base64.b64decode(base64_data)
            frame_array = np.frombuffer(frame_bytes, dtype=np.uint8)
            frame = cv2.imdecode(frame_array, cv2.IMREAD_COLOR)

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        except Exception as e:
            print(f"Error decoding frame data: {e}")
            return JsonResponse({"error": f"Image decoding failed: {e}"}, status=400)

        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        if not face_encodings:
            return JsonResponse({"name": "Unknown", "roll_num": "N/A", "message": "No faces detected"})

        students = Student.objects.exclude(face_data__isnull=True).exclude(face_data__exact="")
        known_encodings = []
        known_names = []

        for student in students:
            try:
                student_encoding = np.frombuffer(base64.b64decode(student.face_data), dtype=np.float64)
                if student_encoding.size == 128: 
                    known_encodings.append(student_encoding)
                    known_names.append((student.name, student.roll_num))
            except Exception as e:
                print(f"Error decoding face data for {student.roll_num}: {e}")
                continue

        for face_encoding in face_encodings:
            distances = face_recognition.face_distance(known_encodings, face_encoding)
            best_match_index = np.argmin(distances) if distances.size > 0 else None

            if best_match_index is not None and distances[best_match_index] < 0.6:
                matched_name, matched_roll = known_names[best_match_index]

                try:
                    student = Student.objects.get(roll_num=matched_roll)
                    attendance, created = Attendance.objects.get_or_create(
                        student=student,
                        date=date.today(),
                        defaults={"status": "Present"}
                    )
                    if not created:
                        attendance.status = "Present"
                        attendance.save()

                    return JsonResponse({"name": student.name, "roll_num": student.roll_num, "message": "Attendance marked"})
                except Student.DoesNotExist:
                    print(f"Student not found for roll number: {matched_roll}")
                    continue

        return JsonResponse({"name": "Unknown", "roll_num": "N/A", "message": "No matches found"})

    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def save_face_encoding_view(request):
    if request.method == "POST":
        try:
            student_id = request.POST.get("student_id")
            image_file = request.FILES.get("image_file")

            if not student_id:
                return JsonResponse({"error": "Student ID is required"}, status=400)
            if not image_file:
                return JsonResponse({"error": "Image file is required"}, status=400)

            try:
                student = Student.objects.get(id=student_id)
            except Student.DoesNotExist:
                return JsonResponse({"error": "Student not found"}, status=404)

            success = save_face_encoding(student, image_file)
            if success:
                return JsonResponse({"message": "Face encoding saved successfully"}, status=200)
            else:
                return JsonResponse({"error": "No face detected in the provided image"}, status=400)

        except Exception as e:
            print(f"Error saving face encoding: {e}")
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def save_face_encoding(student, image_file):
    try:
        image = Image.open(image_file)
        image_np = np.array(image)

        rgb_frame = image_np[:, :, ::-1]

        encodings = face_recognition.face_encodings(rgb_frame)

        if encodings:
            face_encoding = encodings[0]

            encoded_face_data = base64.b64encode(face_encoding.tobytes()).decode('utf-8')
            student.face_data = encoded_face_data
            student.save()

            return True
        else:
            print(f"No face detected for student: {student.roll_num}")
            return False

    except Exception as e:
        print(f"Error processing face encoding: {e}")
        return False
    
#Dashboard

def dashboard_view(request):
    return render(request, "frs_attendance/dashboard.html")

def download_presentees(request):
    date = request.GET.get('date')
    branch_name = request.GET.get('branch')
    batch_year = request.GET.get('batch')

    if not date or not branch_name or not batch_year:
        return HttpResponse("Invalid parameters.", status=400)

    try:
        branch = Branch.objects.get(name=branch_name, batch_start_year=batch_year)
    except Branch.DoesNotExist:
        return HttpResponse("Branch not found.", status=404)

    attendance_records = Attendance.objects.filter(
        date=date,
        student__branch=branch,
        status="Present"
    ).select_related('student')

    data = [
        {
            "Roll Number": record.student.roll_num,
            "Name": record.student.name,
            "Status": record.status
        }
        for record in attendance_records
    ]

    df = pd.DataFrame(data)

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="{date}_{branch_name}_{batch_year}_presentees.xlsx"'

    with pd.ExcelWriter(response, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Presentees')

    return response


def download_absentees(request):
    date = request.GET.get('date')
    branch_name = request.GET.get('branch')
    batch_year = request.GET.get('batch')

    if not date or not branch_name or not batch_year:
        return HttpResponse("Invalid parameters.", status=400)

    try:
        branch = Branch.objects.get(name=branch_name, batch_start_year=batch_year)
    except Branch.DoesNotExist:
        return HttpResponse("Branch not found.", status=404)

    all_students = branch.students.all()
    presentees = Attendance.objects.filter(
        date=date,
        student__branch=branch,
        status="Present"
    ).values_list('student_id', flat=True)

    absentees = all_students.exclude(id__in=presentees)

    data = [
        {
            "Roll Number": student.roll_num,
            "Name": student.name,
            "Status": "Absent"
        }
        for student in absentees
    ]

    df = pd.DataFrame(data)

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="{date}_{branch_name}_{batch_year}_absentees.xlsx"'

    with pd.ExcelWriter(response, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Absentees')

    return response

def get_batches(request):
    branch_name = request.GET.get('branch')
    if not branch_name:
        return JsonResponse({'error': 'Branch name is required.'}, status=400)

    batches = Branch.objects.filter(name=branch_name).values_list('batch_start_year', flat=True)
    if not batches:
        return JsonResponse({'error': 'No batches found for this branch.'}, status=404)

    return JsonResponse({'batches': list(batches)})

def get_attendance_data(request):
    date = request.GET.get('date')
    branch_name = request.GET.get('branch')
    batch_year = request.GET.get('batch_year')

    if not date or not branch_name or not batch_year:
        return JsonResponse({'error': 'Missing parameters: date, branch, or batch_year'}, status=400)

    try:
        branch = Branch.objects.get(name=branch_name, batch_start_year=batch_year)
        total_students = Student.objects.filter(branch=branch).count()
        presentees = Attendance.objects.filter(student__branch=branch, date=date, status='Present').count()
        absentees = total_students - presentees

        return JsonResponse({
            'present_count': presentees,
            'absent_count': absentees,
            'total_students': total_students,
        })

    except Branch.DoesNotExist:
        return JsonResponse({'error': 'Branch not found'}, status=404)