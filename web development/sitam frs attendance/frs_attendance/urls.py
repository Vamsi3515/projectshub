from django.urls import path
from . import views
from .views import *
from django.urls import path
from .views import capture_and_mark_attendance, save_face_encoding_view

urlpatterns = [
    # User URLs
    path('users/', UserList.as_view(), name='user-list'),
    path('users/create/', views.user_create_view, name='user-create'),
    path('login/', login_view, name='login'),
    path('logout/', views.logout_view, name='log_out'),

    #Template Pages
    path('', views.index, name='index'),
    path('add-student/', add_student_view, name='add-student'),

    path('students/<int:pk>/', views.StudentDetail.as_view(), name='student-detail'),

    # Attendance URLs
    path('attendances/', views.AttendanceListCreate.as_view(), name='attendance-list-create'),
    path('attendances/<int:pk>/', views.AttendanceDetail.as_view(), name='attendance-detail'),

    #Branch URL
    path('add-branch/', add_branch, name='add-branch'),

    path('collect-attendance/', collect_attendance, name='collect-attendance'),
    path('process-frame/', process_frame, name='process-frame'),

    path('api/capture-attendance/', capture_and_mark_attendance, name='capture-attendance'),
    path('api/save-face-encoding/', save_face_encoding_view, name='save-face-encoding'),

    path('dashboard/', dashboard_view, name='dashboard_view'),
    path('dashboard/download/presentees/', views.download_presentees, name='download_presentees'),
    path('dashboard/download/absentees/', views.download_absentees, name='download_absentees'),    
    path('get_batches/', views.get_batches, name='get_batches'),
    path('get-attendance-data/', views.get_attendance_data, name='get-attendance-data'),
]