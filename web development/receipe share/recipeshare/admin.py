from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(RecipeShareUser)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Rating)