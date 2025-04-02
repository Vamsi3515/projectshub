from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:title>", views.getPage, name="wiki_page"),
    path("search", views.search, name="search"),
    path("newpage", views.newPage, name="newpage"),
    path("wiki/<str:title>/edit", views.editPage, name="edit_page"),
    path("random", views.randomPage, name="random_page")
]