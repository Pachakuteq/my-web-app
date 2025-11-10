from django.http import HttpResponse
from django.shortcuts import render
from django.core.mail import send_mail
from resume.models import *
from resume.forms import *
from django.shortcuts import redirect
from django.contrib import messages
from django.template import loader

def home(request):
    homes = Home.objects.all()
    return render(request, 'resume/home.html', {'homes': homes})

def about(request):
    return render(request, 'resume/about.html')

def resume(request):
    experiences = Experience.objects.all()
    experiences = experiences.prefetch_related('highlights')
    projects = Project.objects.all()
    projects = projects.prefetch_related('points', 'technologies')
    return render(request, 'resume/resume.html', {'experiences': experiences, 'projects': projects})

def contact(request):
    if request.method == 'POST':
        # create an instance of our form, and fill it with the POST data
        form = ContactUsForm(request.POST)

        if form.is_valid():
            send_mail(
            subject=f'Message from {form.cleaned_data["name"] or "anonymous"} via Resume Contact Us form',
            message=form.cleaned_data['message'],
            from_email=form.cleaned_data['email'],
            recipient_list=['admin@merchex.xyz'],
        )
        messages.success(request, 'Email sent successfully!')
        return redirect('contact')  # Redirect to the same page to show the success message
    else:  # this must be a GET request, so create an empty form
        form = ContactUsForm()
    return render(request, 'resume/contact.html', {'form': form})



