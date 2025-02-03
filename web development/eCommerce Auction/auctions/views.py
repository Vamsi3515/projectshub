from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError, transaction
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import *
from datetime import datetime
from django.contrib.auth.decorators import login_required
from decimal import Decimal
from django.utils import timezone
from django.contrib import messages



watchlist_exists = False

#active_list is made as default index page
# def index(request):
#     auction_list = AuctionsList.objects.all()
#     return render(request, "auctions/index.html", {
#            "auction_list" : auction_list
# })   

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("activelist"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("activelist"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("activelist"))
    else:
        return render(request, "auctions/register.html")


def create_list(request):
    if not request.user.is_authenticated:
        return redirect('login')
    image = None
    title = None
    description = None
    starting_bid = None
    current_bid = None
    category = None
    timestamp = None
    DEFAULT_IMAGE_URL = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
    if request.method == 'POST':
        image = request.POST["image"]
        title = request.POST["title"]
        description = request.POST["description"]
        starting_bid = request.POST["starting_bid"]
        category = request.POST["category"]
        timestamp = timezone.now()
        if not image:
            image = DEFAULT_IMAGE_URL
        if not category:
            category = None
        created_list = AuctionsList(
            title=title,
            description=description,
            user=request.user,
            starting_bid=starting_bid,
            current_bid=starting_bid,
            category=category,
            image=image,
            timestamp=timestamp
        )
        created_list.save()
    return render(request, "auctions/newlist.html")


def activelist_view(request):
    auction_list = AuctionsList.objects.all().order_by('-timestamp')
    return render(request, "auctions/activelists.html", {
           "auction_list" : auction_list
})

def listing_page(request, id):
    list_item = AuctionsList.objects.get(pk=id)
    bids = Bid.objects.filter(auction=list_item)
    bid_count = bids.count()
    comments = Comments.objects.filter(auction=list_item)
    user = request.user
    if request.user.is_authenticated:
        watchlist_exists = Watchlist.objects.filter(user=user, auction=list_item).exists()
    else:
        watchlist_exists = False
    if bid_count > 0:
        highest_bid = bids.order_by('-amount').first().amount
        min_bid = float(highest_bid) + 0.01
    else:
        min_bid = float(list_item.current_bid) + 0.01
    return render(request, 'auctions/listings.html', {
        "list_item": list_item,
        "bid_count": bid_count,
        "min_bid": min_bid,
        "comments": comments,
        "watchlist_exists": watchlist_exists,
        "user" : user
    })

def bidding(request, id):
    if not request.user.is_authenticated:
        return redirect('login')
    if request.method == 'POST':
        user = request.user
        timestamp = timezone.now()
        amount = Decimal(request.POST["bid_amount"])
        auction = AuctionsList.objects.get(pk=id)

        if amount > auction.current_bid:
            new_bid = Bid(user=user, timestamp=timestamp, amount=amount, auction=auction)
            auction.current_bid = amount
            new_bid.save()
            auction.save()
            messages.success(request, 'Bid placed successfully.')
        else:
            messages.error(request, 'Bid amount should be greater than current bid!')
        return redirect('listing_page', id=auction.id)
    return redirect('listing_page', id=id)

def comments(request, id):
    list_item = AuctionsList.objects.get(pk=id)
    comments = Comments.objects.filter(auction=list_item)
    if not request.user.is_authenticated:
        return redirect('login')
    if request.method == 'POST':
        user = request.user
        timestamp = timezone.now()
        comment_text = request.POST["comment_text"]
        auction = list_item

        comment = Comments(user=user, timestamp=timestamp, comment=comment_text, auction=auction)
        comment.save()
        return redirect('listing_page', id=auction.id)
    return redirect('listing_page', id=id)

def addtowatchlist(request, id):
    if not request.user.is_authenticated:
        return redirect('login')
    auction = AuctionsList.objects.get(pk=id)
    watchlist = Watchlist(user=request.user, auction=auction, timestamp=timezone.now())
    watchlist.save()
    return redirect('listing_page', id=id)

@login_required
def watchlist(request):
    watchlist = Watchlist.objects.filter(user=request.user)
    return render(request, 'auctions/watchlist.html', {
        "watchlist" : watchlist,
        "msg" : "No items added to watchlist..."
    })

@login_required
def remove_from_watchlist(request, id):
    auction = AuctionsList.objects.get(pk=id)
    watchlist_item = Watchlist.objects.filter(user=request.user, auction=auction)
    watchlist_item.delete()
    return redirect('watchlist')

def remove_from_watchlist_listings_page(request, id):
    auction = AuctionsList.objects.get(pk=id)
    watchlist_item = Watchlist.objects.filter(user=request.user, auction=auction)
    watchlist_item.delete()
    return redirect('listing_page', id=id)

def category(request):
    auction = AuctionsList.objects.values_list('category', flat=True).distinct()
    return render(request, 'auctions/category.html', {
        "categories" : auction
    })

def category_filter(request, category):
    auction_item = AuctionsList.objects.filter(category=category)
    return render(request, 'auctions/category_filter.html',{
        "auction_item" : auction_item,
        "category" : category
    })

@login_required
def close_auction(request, id):
    auction = AuctionsList.objects.get(pk=id)
    auction.is_auction_closed = True
    highest_bid = Bid.objects.filter(auction=auction).order_by('-amount').first()
    if highest_bid:
        auction.winner = highest_bid.user
    auction.save()
    return redirect('listing_page', id=id)
