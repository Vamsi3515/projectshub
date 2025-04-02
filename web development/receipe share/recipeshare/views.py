from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from .models import *
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.db import IntegrityError

# Create your views here.
def index(request):
    posts = Post.objects.all().order_by("-timestamp")
    post_list = [post.serialize() for post in posts]
    return render(request, "recipeshare/index.html", {
        'posts' : post_list
    })

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "recipeshare/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "recipeshare/login.html")
    
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "recipeshare/register.html", {
                "message": "Passwords must match."
            })
        try:
            user = RecipeShareUser.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "recipeshare/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "recipeshare/register.html")
    
def user_status(request):
    return JsonResponse({'is_authenticated': request.user.is_authenticated})

def create_post(request):
    if request.method == 'POST':
        recipe_name = request.POST["recipe_name"]
        description = request.POST["description"]
        image_url   = request.POST["image_url"]
        post = Post(author=request.user, recipe_name=recipe_name, description=description, image_url=image_url)
        post.save()
        message = "Recipe posted successfully"
        return render(request, "recipeshare/createpost.html", {
            'message' : message
        })
    return render(request, "recipeshare/createpost.html")


def view_post(request, id):
    post = get_object_or_404(Post, id=id)
    serialized_post = post.serialize()
    is_already_commented = False
    is_favorite = False
    is_liked = False
    if request.user.is_authenticated and Comment.objects.filter(user=request.user, post=post).exists():
        is_already_commented = True
        current_user_comment = Comment.objects.filter(user=request.user, post=post).latest('timestamp')
        current_user_comment = current_user_comment.serialize()

    checked_stars = []
    unchecked_stars = []

    try:
        user_comment = Comment.objects.filter(post=post).latest('timestamp')
        user_comment = user_comment.serialize()
    except Comment.DoesNotExist:
        user_comment = None
    
    try:
        user_rating = Rating.objects.filter(post=post).latest('timestamp')
        for _ in range(user_rating.value):
            checked_stars.append('star')
        for _ in range(5 - len(checked_stars)):
            unchecked_stars.append('star')
    except Rating.DoesNotExist:
        user_rating = None

    if request.user.is_authenticated and post in request.user.favorite.all():
        is_favorite = True

    if request.user.is_authenticated and request.user in post.likes.all():
        is_liked = True

    post.views_count += 1
    post.save()

    
    return render(request, "recipeshare/viewpost.html", {
        'post': serialized_post,
        'user_comment': user_comment,
        'user_rating': user_rating.value if user_rating else None,
        'checked_stars' : checked_stars,
        'unchecked_stars' : unchecked_stars,
        'is_already_commented' : is_already_commented,
        'current_user_comment' : current_user_comment if is_already_commented else False,
        'is_favorite' : is_favorite,
        'is_liked' : is_liked,
    })


def add_comment(request, id):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        user = request.user
        post = get_object_or_404(Post, id=id)
        content = request.POST.get("comment")
        value = int(request.POST.get("rating"))
        
        if Comment.objects.filter(user=user, post=post).exists():
            return JsonResponse({"error": "You have already commented on this post."}, status=400)
                
        comment = Comment(user=user, post=post, content=content)
        rating = Rating(user=user, post=post, value=value)
        comment.save()
        rating.save()
        response_data = {
            'user': comment.user.username,
            'content': comment.content,
            'rating': rating.value,
            'timestamp': comment.timestamp,
            'message': 'Comment and rating added successfully.'
        }
        return JsonResponse(response_data, status=200)
    
    return JsonResponse({"error": "POST request required."}, status=400)

def edit_comment(request, id):
    if request.method == 'POST':
        user = request.user
        post = get_object_or_404(Post, id=id)
        comment = get_object_or_404(Comment, user=user, post=post)
        rating = get_object_or_404(Rating, user=user, post=post)
        comment.content = request.POST.get("comment")
        rating.value = int(request.POST.get("rating"))
        comment.save()
        rating.save()
        
        response_data = {
            'user': comment.user.username,
            'content': comment.content,
            'rating': rating.value,
            'timestamp': comment.timestamp,
            'message': 'Comment and rating updated successfully.'
        }
        return JsonResponse(response_data, status=200)
    
    return JsonResponse({"error": "POST request required."}, status=400)

def getAllPosts(request):
    posts = list(Post.objects.all().values())
    return JsonResponse({"posts": posts})

def is_commented(request, id):
    if request.user.is_authenticated:
        post = get_object_or_404(Post, id=id)
        is_already_commented = False
        if Comment.objects.filter(user=request.user, post=post).exists():
            is_already_commented = True
    return JsonResponse({"is_already_commented": is_already_commented})

def addToFavorite(request, postid):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        user = request.user
        post = get_object_or_404(Post, id=postid)
        if post in user.favorite.all():
            user.favorite.remove(post)
            return JsonResponse({"success" : "Removed from favorites successfully"})
        
        user.favorite.add(post)
        return JsonResponse({"success" : "Added to favorites successfully"})
    return JsonResponse({"Error": "Post method required"})

def like_post(request, postid):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        post = get_object_or_404(Post, id=postid)
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            if post.likes_count > 0:
                post.likes_count -= 1
            post.save()
            return JsonResponse({"success" : "unliked post successfully"})
        post.likes.add(request.user)
        post.likes_count += 1
        post.save()
        return JsonResponse({"success" : "liked post successfully"})
    return JsonResponse({"Error": "Post method required"})

def profile(request, author):
    profile_author = get_object_or_404(RecipeShareUser, username=author)
    posts = Post.objects.filter(author=profile_author)
    posts_count = posts.count()
    followers = profile_author.followers.count()
    is_following = False
    if request.user.is_authenticated:
        user = get_object_or_404(RecipeShareUser, username=request.user)
        if user.following.filter(username=author).exists():
            is_following = True
    return render(request, "recipeshare/profile.html", {
        'author' : author,
        'followers' : followers,
        'posts_count' : posts_count,
        'posts' : posts,
        'is_following' : is_following
    })

def follow_author(request, author):
    if not request.user.is_authenticated:
        return redirect('login')

    if request.method == 'POST':
        profile_author = get_object_or_404(RecipeShareUser, username=author)
        if request.user in profile_author.followers.all():
            profile_author.followers.remove(request.user)
            return JsonResponse({"success" : "Unfollowed author successfully"})

        profile_author.followers.add(request.user)
        return JsonResponse({"success" : "Followed author successfully"})
    return JsonResponse({"error" : "Post method required"})

def favorites(request):
    if not request.user.is_authenticated:
        return redirect('login')
    user = get_object_or_404(RecipeShareUser, username=request.user)
    posts = user.favorite.all()
    return render(request, "recipeshare/favorites.html", {
        "posts" : posts
    })

def my_posts(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    author = get_object_or_404(RecipeShareUser, username=request.user)
    posts = Post.objects.filter(author=author)
    return render(request, "recipeshare/myposts.html", {
        "posts" : posts
    })

def edit_post(request, id):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        post = get_object_or_404(Post, id=id, author=request.user)
        try:
            post.recipe_name = request.POST.get("recipe_name", post.recipe_name)
            post.description = request.POST.get("description", post.description)
            post.image_url = request.POST.get("image_url", post.image_url)
            post.save()
            return JsonResponse({"success": "Post updated successfully"}, status=200)
        except:
            return JsonResponse({"error": "something went wrong"})
    return JsonResponse({"error" : "Post method required"})

def search_post(request):
    if request.method == 'GET':
        search_query = request.GET.get("q", "").strip()
        search_words = search_query.lower().split()
        queryset = Post.objects.all()
        for word in search_words:
            queryset = queryset.filter(recipe_name__icontains=word)
        posts = queryset.order_by('-timestamp')
        return render(request, "recipeshare/searchresult.html", {
            "posts": posts,
            "query": search_query
        })