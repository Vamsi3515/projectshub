from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import User, Post
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
from django.views.decorators.http import require_GET
from django.core.paginator import Paginator


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@require_GET
def getPost(request):
    posts = Post.objects.all().order_by("-timestamp")
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    post_list = [post.serialize(current_user=request.user) for post in page_obj]
    user_data = {
        'username': request.user.username
    }
    response_data = {
        'posts': post_list,
        'user': user_data,
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
        'page_number': page_obj.number,
        'num_pages': paginator.num_pages
    }
    return JsonResponse(response_data, safe=False)


@csrf_exempt
def newPost(request):
    if not request.user.is_authenticated:
       return redirect('login')
    if request.method == 'POST':
        data = json.loads(request.body)
        username = request.user
        content = data.get('content', '')
        if content != '':
            post = Post(username=username, content=content)
            post.save()
        return JsonResponse({"message": "Post created successfully"}, status=201)
    return JsonResponse({"error": "POST request required."}, status=400)

def checkAuthentication(request):
    authenticated = request.user.is_authenticated
    return JsonResponse({'authenticated' : authenticated})

@login_required
@csrf_exempt
def toggle_like(request, id):
    if request.method == 'POST':
        post = Post.objects.get(id=id)
        users_liked = post.likes.all()
        isLiked = False
        if request.user in users_liked:
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
            isLiked = True
        return JsonResponse({
            'post_likes' : post.likes.count(),
            'isLiked' : isLiked
        })
    return JsonResponse({"error": "POST request required."}, status=400)

@login_required
def profilePage(request, username):
    if not request.user.is_authenticated:
        return redirect('login')
    user = User.objects.get(username=username.lower())
    current_user = request.user
    user_following = user.following.count()
    user_followers = user.followers.count()
    current_user_following = current_user.following.count()
    current_user_followers = current_user.followers.count()
    return render(request, "network/profile.html", {
        "profile_user": user,
        "profile_user_following": user_following,
        "profile_user_followers": user_followers,
        "current_user": current_user,
        "current_user_following": current_user_following,
        "current_user_followers": current_user_followers
    })

@login_required
@csrf_exempt
def followUser(request, username):
    user_to_follow = get_object_or_404(User, username=username)
    followings = request.user.following.all()
    if user_to_follow != request.user:
        if user_to_follow in followings:
            request.user.following.remove(user_to_follow)
            message = "Unfollowed Successfully!"
        else:
            request.user.following.add(user_to_follow)
            message = "Followed Successfully!"
    else:
        message = "You cannot follow yourself."

    current_user_following_count = request.user.following.all().count()
    current_user_followers_count = request.user.followers.all().count()
    profile_user_following_count = user_to_follow.following.all().count()
    profile_user_followers_count = user_to_follow.followers.all().count()
    return JsonResponse({
        'message': message,
        'current_user_followers_count' : current_user_followers_count,
        'current_user_following_count' : current_user_following_count,
        'profile_user_followers_count' : profile_user_followers_count,
        'profile_user_following_count' : profile_user_following_count,
    })

@login_required
def toggle_follow_btn(request, username):
    user = get_object_or_404(User, username=username)
    followings = request.user.following.all()
    isFollowing = False
    if user in followings:
        isFollowing = True
    return JsonResponse({'isFollowing' : isFollowing})

def getAllPosts(request):
    posts = Post.objects.all().order_by('-timestamp')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    post_list = [post.serialize(current_user=request.user) for post in page_obj]

    response_data = {
        'posts': post_list,
        'user': request.user.username,
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
        'page_number': page_obj.number,
        'num_pages': paginator.num_pages
    }
    return JsonResponse(response_data, safe=False)

def allposts_page(request):
    return render(request, "network/allposts.html")

def get_user_posts(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(username=user).order_by("-timestamp")
    
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    post_list = [post.serialize(current_user=request.user) for post in page_obj]
    response_data = {
        'posts': post_list,
        'user': request.user.username,
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
        'page_number': page_obj.number,
        'num_pages': paginator.num_pages
    }
    return JsonResponse(response_data, safe=False)

@login_required
def get_following_posts(request):
    user = request.user
    followings = user.following.all()
    posts = Post.objects.filter(username__in=followings).order_by("-timestamp")

    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    post_list = [post.serialize(current_user=request.user) for post in page_obj]
    
    response_data = {
        'posts': post_list,
        'user': request.user.username,
        'has_previous': page_obj.has_previous(),
        'has_next': page_obj.has_next(),
        'page_number': page_obj.number,
        'num_pages': paginator.num_pages
    }
    return JsonResponse(response_data, safe=False)

@login_required
def load_following_page(request):
    return render(request, "network/following_page.html")

def edit_post(request, post_id):
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return redirect('login')
        post = Post.objects.get(id=post_id)
        data = json.loads(request.body)
        new_content = data.get('content', '')
        post.content = new_content
        post.save()
        return JsonResponse({'success': 'Post updated successfully.'})
    return JsonResponse({'Error' :'Post method required'})