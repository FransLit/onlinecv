from django.shortcuts import render

# Create your views here.
def home(request):
    context = {
        'three':'cv/three.min.js'
    }
    return render(request, 'cv/home.html', context)
