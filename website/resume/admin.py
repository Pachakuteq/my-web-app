from django.contrib import admin
from .models import *

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

class certificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'image_url', 'order')

admin.site.register(Certification, certificationAdmin)

class carouselSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')

admin.site.register(CarouselSection, carouselSectionAdmin)

class carouselItemInline(admin.ModelAdmin):
    list_display = ('section', 'title', 'description', 'order', 'image')

admin.site.register(CarouselItem, carouselItemInline)