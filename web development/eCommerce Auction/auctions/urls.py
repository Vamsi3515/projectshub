from django.urls import path

from . import views

urlpatterns = [
    path("", views.activelist_view, name="activelist"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('activelist/new', views.create_list, name="newlist"),
    path('listings/<int:id>', views.listing_page, name="listing_page"),
    path('listings/<int:id>/bid', views.bidding, name="bidding"),
    path('listings/<int:id>/comments', views.comments, name="comments"),
    path('listings/watchlist', views.watchlist, name="watchlist"),
    path('listings/<int:id>/addtowatchlist', views.addtowatchlist, name="addtowatchlist"),
    path('listings/<int:id>/watchlist/remove/item', views.remove_from_watchlist_listings_page, name="remove_from_watchlist_listings_page"),
    path('listings/<int:id>/watchlist/remove', views.remove_from_watchlist, name="remove_from_watchlist"),
    path('listings/category', views.category, name='category'),
    path('listings/category/filter/<str:category>', views.category_filter, name="category_filter"),
    path('listings/<int:id>/close', views.close_auction, name="close_auction")
]