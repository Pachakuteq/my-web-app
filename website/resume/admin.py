from django.contrib import admin
from .models import *

class homeAdmin(admin.ModelAdmin):
    list_display = ('name', 'summary')

admin.site.register(Home, homeAdmin)
