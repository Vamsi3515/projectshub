import base64
from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import numpy as np

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)

    groups = models.ManyToManyField(
        'auth.Group', related_name='custom_user_set', blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='custom_user_permissions', blank=True
    )

    def __str__(self):
        return self.username


def get_current_year():
    return date.today().year

class Branch(models.Model):
    name = models.CharField(max_length=100)
    strength = models.PositiveIntegerField()
    batch_start_year = models.PositiveIntegerField(default=get_current_year)

    class Meta:
        unique_together = ('name', 'batch_start_year')

    def __str__(self):
        return f"{self.name} (Batch starting {self.batch_start_year})"


class Student(models.Model):
    roll_num = models.CharField(max_length=20)
    name = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='students')
    date_registered = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    face_data = models.TextField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['roll_num', 'branch'], name='unique_roll_num_per_branch')
        ]
        indexes = [
            models.Index(fields=['roll_num']),
            models.Index(fields=['branch']),
        ]

    def __str__(self):
        branch_name = self.branch.name if self.branch else "No Branch"
        return f"{self.name} ({self.roll_num}) - {branch_name}"

    @staticmethod
    def decode_face_data(encoded_face_data):
        """
        Decode the stored face data from base64 to a numpy array.
        """
        try:
            return np.frombuffer(base64.b64decode(encoded_face_data), dtype=np.float64)
        except Exception as e:
            print(f"Error decoding face data: {e}")
            return None

    @staticmethod
    def encode_face_data(face_encoding):
        """
        Encode a face encoding (numpy array) into base64 for storage.
        """
        try:
            return base64.b64encode(face_encoding.tobytes()).decode('utf-8')
        except Exception as e:
            print(f"Error encoding face data: {e}")
            return None

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField(default=date.today)
    status = models.CharField(max_length=10, choices=[('Present', 'Present'), ('Absent', 'Absent')])

    class Meta:
        unique_together = ('student', 'date')

    def __str__(self):
        return f"{self.student.roll_num} - {self.date} - {self.status}"