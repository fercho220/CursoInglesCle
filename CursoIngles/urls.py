
from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.auth.decorators import login_required
#from ingles.views import Inicio
from usuario.views import Login, Login2, logoutUsuario
from django.views.static import serve
from django.conf import settings
from django.conf.urls import *
from ingles.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('home/',Inicio.as_view, name='index'),
    path('',include('ingles.urls', 'curso')),
    #path('accounts/login/',LoginView.as_view(template_name='login.html'), name="login"),
    path('accounts/login1/',Login.as_view(), name="login2"),
    path('accounts/login/',Login2.as_view(), name="login"),
    path('logout/',login_required(logoutUsuario) , name="logout"),
]

handler404 = Error404View.as_view()

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT, 
    })
]