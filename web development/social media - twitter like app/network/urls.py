
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newpost", views.newPost, name="new_post"),
    path('getpost', views.getPost, name="get_post"),
    path('check_auth', views.checkAuthentication, name="check_authentication"),
    path('likepost/<int:id>', views.toggle_like, name="like_post"),
    path('user/<str:username>', views.profilePage, name='profile'),
    path('follow/<str:username>', views.followUser, name='follow_user'),
    path('isfollowing/<str:username>', views.toggle_follow_btn, name='is_following'),
    path('getpost/all', views.getAllPosts, name='get_all_posts'),
    path('allposts/page', views.allposts_page, name='allposts_page'),
    path('user/post/<str:username>', views.get_user_posts, name='get_user_posts'),
    path('posts/following', views.get_following_posts, name='get_following_posts'),
    path('followings/posts', views.load_following_page, name='load_following_page'),
    path('edit/post/<int:post_id>', views.edit_post, name='edit_post'),
]