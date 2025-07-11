from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login, logout
from .forms import FormularioLogin
# Create your views here.

# incio de sesion del Facilitadores
class Login(FormView):
    template_name = 'home/loginF.html'
    form_class = FormularioLogin
    success_url = reverse_lazy('curso:index2')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login,self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        login(self.request,form.get_user())
        return super(Login,self).form_valid(form)


# incio de sesion del Estudiante     
class Login2(FormView):
    template_name = 'home/login.html'
    form_class = FormularioLogin
    success_url = reverse_lazy('curso:index')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login2,self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        login(self.request,form.get_user())
        return super(Login2,self).form_valid(form)

def logoutUsuario(request):
    logout(request)
    return HttpResponseRedirect('/accounts/login/')   

def logoutUsuarioF(request):
    logout(request)
    return HttpResponseRedirect('/accounts/login1/')    
