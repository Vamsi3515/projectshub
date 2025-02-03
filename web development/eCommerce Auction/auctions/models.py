from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id = models.AutoField(primary_key=True)


class AuctionsList(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=50)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lists")
    starting_bid = models.DecimalField(max_digits=10, decimal_places=2)
    current_bid = models.DecimalField(max_digits=10, decimal_places=2)    
    category = models.CharField(max_length=30, null=True, blank=True)
    image = models.URLField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_auction_closed = models.BooleanField(default=False)
    winner = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="won_auctions")

class Bid(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_bids")
    timestamp = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    auction = models.ForeignKey(AuctionsList, on_delete=models.CASCADE, related_name="auction_bids")

class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    timestamp = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(max_length=500)
    auction = models.ForeignKey(AuctionsList, on_delete=models.CASCADE, related_name="auction_comments")

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="watchlist_user")
    auction = models.ForeignKey(AuctionsList, on_delete=models.CASCADE, related_name="watchlist_auction")
    timestamp = models.DateTimeField(auto_now_add=True)