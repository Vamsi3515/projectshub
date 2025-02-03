from django.contrib import admin
from .models import *

# Register your models here.
class AuctionList(admin.ModelAdmin):
    list_display = ("id","title","description","starting_bid","current_bid", "category", "image", "timestamp")

admin.site.register(User)
admin.site.register(AuctionsList, AuctionList)
admin.site.register(Bid)
admin.site.register(Comments)
admin.site.register(Watchlist)