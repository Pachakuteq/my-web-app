from django.contrib import admin
from .models import *

class homeAdmin(admin.ModelAdmin):
    list_display = ('name', 'summary')

admin.site.register(Home, homeAdmin)


class experienceAdmin(admin.ModelAdmin):
    list_display = ('job_title', 'company', 'start_date', 'end_date', 'order')

admin.site.register(Experience, experienceAdmin)

class experienceHighlightInline(admin.ModelAdmin):
    list_display = ('experience', 'text', 'order')

admin.site.register(ExperienceHighlight, experienceHighlightInline)


class projectAdmin(admin.ModelAdmin):
    list_display = ('title', 'emoji', 'order', 'image')

admin.site.register(Project, projectAdmin)

class projectPointInline(admin.ModelAdmin):
    list_display = ('project', 'text', 'order')

admin.site.register(ProjectPoint, projectPointInline)

class technologyAdmin(admin.ModelAdmin):
    list_display = ('project', 'name', 'order', 'icon_url')

admin.site.register(Technology, technologyAdmin)