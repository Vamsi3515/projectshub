from rest_framework import serializers
from .models import Student, Attendance, Branch, User
from django.contrib.auth import get_user_model
from rest_framework.response import Response

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile_photo']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already taken.")
        return value

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            profile_photo=validated_data.get('profile_photo', None)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


# Branch Serializer
class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'


# Student Serializer
class StudentSerializer(serializers.ModelSerializer):
    branch = BranchSerializer(read_only=True)
    branch_id = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.all(), source='branch', write_only=True
    )
    date_registered = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)  # Optional

    class Meta:
        model = Student
        fields = ['id', 'roll_num', 'name', 'branch', 'branch_id', 'date_registered', 'email', 'face_data']

    def validate(self, data):
        if 'email' in data and data['email'] == "":
            data['email'] = None

        if 'roll_num' in data and 'branch' in data:
            if Student.objects.filter(roll_num=data['roll_num'], branch=data['branch']).exists():
                raise serializers.ValidationError({
                    "roll_num": "This roll number already exists in the selected branch."
                })

        if 'face_data' in data:
            if len(data['face_data']) > 1_000_000:
                raise serializers.ValidationError({
                    "face_data": "Face data is too large."
                })

        return data
    

# Attendance Serializer
class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), source='student', write_only=True
    )

    class Meta:
        model = Attendance
        fields = ['id', 'student', 'student_id', 'date', 'status']