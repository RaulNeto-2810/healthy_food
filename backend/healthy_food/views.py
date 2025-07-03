from django.http import HttpResponse

def home(request):
    return HttpResponse("Healthy Food API está funcionando!")
