from django.http import HttpResponse
from django.shortcuts import render
from .models import *

def home(request):
    homes = Home.objects.all()
    return render(request, 'resume/home.html', {'homes': homes})

def about(request):
    return render(request, 'resume/about.html')

def contact(request):
    return render(request, 'resume/contact.html')

def experience(request):
    return render(request, 'resume/resume.html')



