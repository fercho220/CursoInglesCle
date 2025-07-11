
from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView,  PasswordResetCompleteView
#from ingles.views import Inicio
from usuario.views import *
from django.views.static import serve
from django.conf import settings
from django.conf.urls import *
from ingles.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('home/',Inicio.as_view, name='index'),
    path('',include('ingles.urls', 'curso')),
    #path('accounts/login/',LoginView.as_view(template_name='login.html'), name="login"),
    path('accounts/login1/',Login.as_view(), name="login1"),
    path('accounts/login/',Login2.as_view(), name="login"),
    path('logout/',login_required(logoutUsuario) , name="logout"),
    path('logoutF/',login_required(logoutUsuarioF) , name="logoutF"),


    #Cambio de Contraseña2
    path('reset/password_reset/', PasswordResetView.as_view(template_name='registration/password_reset_form.html',email_template_name='registration/password_reset_email.html'), name='password_reset'),
    path('password_reset_done/', PasswordResetDoneView.as_view(template_name='registration/password_reset_done.html'), name='password_reset_done'),
    path('reset/(<uidb64>/<token>', PasswordResetConfirmView.as_view(template_name='registration/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done', PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'), name='password_reset_complete'),

]

handler404 = Error404View.as_view()

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT, 
    })
]