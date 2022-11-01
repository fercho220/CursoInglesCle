#from django import forms
from django.contrib.auth.forms import AuthenticationForm
#rom apps.usuario.models import Usuario

class FormularioLogin(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(FormularioLogin, self).__init__(*args,**kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control'
        # self.fields['username'].widget.attrs['placeholder'] = 'Nombre de Usuario'
        self.fields['username'].widget.attrs['type'] = 'text'
        self.fields['username'].widget.attrs['autocomplete'] = 'off'
        self.fields['password'].widget.attrs['class'] = 'form-control'
        self.fields['password'].widget.attrs['type'] = 'password'
