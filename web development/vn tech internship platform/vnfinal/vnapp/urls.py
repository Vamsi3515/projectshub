from django.urls import path
from . import views
from .views import HomePageView

app_name = 'vnapp'

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('register', views.create_user, name='create_user'),
    path('additional-info', views.add_additional_info, name='add_additional_info'),
]