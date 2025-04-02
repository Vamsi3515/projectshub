from django.db import models
from django.contrib.auth.models import AbstractUser
from math import ceil
from django.utils import timezone

class RecipeShareUser(AbstractUser):
    followers = models.ManyToManyField('self', related_name="following", symmetrical=False, blank=True, default=0)
    favorite = models.ManyToManyField('Post', related_name="favorites", blank=True)

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(RecipeShareUser, on_delete=models.CASCADE, related_name="posts")
    recipe_name = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(RecipeShareUser, related_name="liked_posts", blank=True)
    likes_count = models.IntegerField(default=0)
    views_count = models.IntegerField(default=0)

    def serialize(self):
        return {
            'id' : self.id,
            'author' : self.author,
            'recipe_name' : self.recipe_name.capitalize(),
            'description' : self.description,
            'image_url' : self.image_url,
            'timestamp' : self.timestamp,
            'views_count' : self.views_count,
            'comments': [comment.serialize() for comment in self.comments.all().order_by("-timestamp")], 
            'likes': [user.username for user in self.likes.all()],
            'likes_count': self.likes_count,
        }
    
class Comment(models.Model):
    user = models.ForeignKey(RecipeShareUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(max_length=1000)
    timestamp = models.DateTimeField(default=timezone.now)

    def serialize(self):
        return {
            'user': self.user.username,
            'post' : self.post,
            'content': self.content,
            'timestamp' : self.timestamp
        }
    
class Rating(models.Model):
    user = models.ForeignKey(RecipeShareUser, on_delete=models.CASCADE, related_name="user_rated")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="ratings")
    value = models.IntegerField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)

    def serialize(self):
        return {
            'user': self.user.username,
            'post': self.post,
            'rating' : self.value,
            'timestamp' : self.timestamp
        }