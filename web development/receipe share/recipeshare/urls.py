from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register_view, name="register"),
    path("auth/user_status", views.user_status, name="isAuthenticated"),
    path("user/newpost", views.create_post, name="createPost"),
    path("recipe/view/<int:id>", views.view_post, name="viewPost"),
    path("recipe/view/<int:id>/comment", views.add_comment, name="addComment"),
    path("recipe/view/<int:id>/comment/edit", views.edit_comment, name="editComment"),
    path("iscommented/<int:id>", views.is_commented, name="isCommented"),
    path("get/posts/all", views.getAllPosts, name="getAllPosts"),
    path("<int:postid>/addtofavorite", views.addToFavorite, name="addToFavorite"),
    path("<int:postid>/like", views.like_post, name="likePost"),
    path("profile/<str:author>", views.profile, name="profile"),
    path("profile/<str:author>/follow", views.follow_author, name="followAuthor"),
    path("user/favorites", views.favorites, name="favorites"),
    path("myposts", views.my_posts, name="myPosts"),
    path("user/newpost/<int:id>/edit", views.edit_post, name="editPost"),
    path("search", views.search_post, name="Search"),
]