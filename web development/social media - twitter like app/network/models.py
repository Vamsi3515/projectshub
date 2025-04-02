from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    following = models.ManyToManyField('self', related_name="followers", symmetrical=False, blank=True)
    pass

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_name")
    content = models.TextField(max_length=10000)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="liked_post", blank=True)


    def serialize(self, current_user=None):
        return {
            'id': self.id,
            'username': self.username.username.capitalize(),
            'content': self.content,
            'timestamp': self.timestamp.strftime('%B %d, %Y, %I:%M %p.').capitalize().replace('am','a.m').replace('pm','p.m'),
            'likes': self.likes.count(),
            'isLiked': current_user in self.likes.all() if current_user else False
        }