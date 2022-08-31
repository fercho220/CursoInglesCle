from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from .forms import DocenteForm, EstudianteForm, GruposForm, GruposDetalleForm, PagoForm,PeriodoForm, CustomUserCreationForm
from .models import *
from django.views.generic import View,TemplateView, ListView, UpdateView, CreateView, DeleteView
from django.urls import reverse, reverse_lazy
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate , login, logout
from usuario.mixins import SuperUsuarioMixin

# Create your views here.
def home(request):  
    if request.user.is_authenticated:
        estudiante = Estudiante.objects.get(usuario = request.user)
        return render(request, 'index.html', {'estudiante': estudiante} )
    return render(request, 'index.html')

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
class Inicio(LoginRequiredMixin,TemplateView):
    template_name = 'index.html'
    
    def home(request):  
        if request.user.is_authenticated:
            estudiante = Estudiante.objects.get(usuario = request.user)
            return render(request, 'index.html', {'estudiante': estudiante} )
        return render(request, 'index.html')

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
def Registro(request):
    data = {
        'form': CustomUserCreationForm()
    }
    if request.method=='POST':
        formulario = CustomUserCreationForm(data = request.POST)
        if formulario.is_valid():
            formulario.save()
            user = authenticate(request, username=formulario.cleaned_data["username"], password=formulario.cleaned_data["password1"])
            try: 
                alumno = Estudiante.objects.create(nombre=formulario.cleaned_data["first_name"],apellidop=formulario.cleaned_data["last_name"] ,email=formulario.cleaned_data["email"],usuario=user)
            except 	IntegrityError:
                user.delete()
                return render(request, 'ingles/registro.html',{'error_message':'Ya Existe El Correo Electronico'})
            login(request, user)
            return HttpResponseRedirect(reverse('ingles:index'))
        data['form'] = formulario
    return render(request, 'ingles/registro.html', data)
    
class PerfilListadoEstudiante(LoginRequiredMixin,View):
    model = Estudiante
    form_class = EstudianteForm 
    template_name = 'ingles/listar_perfil.html'
    def get_queryset(self):
        return self.model.objects.filter(usuario = self.request.user)
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['estudiantes']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())

class PerfilActualizarEstudiante(LoginRequiredMixin, UpdateView):
    model = Estudiante
    form_class = EstudianteForm
    template_name = 'ingles/perfil.html'
    success_url = reverse_lazy('curso:listar_perfil')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['estudiantes']=Estudiante.objects.filter(estado = True)
        return context
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
""" CRUD ESTUDIANTE """
class ListadoEstudiante(LoginRequiredMixin, SuperUsuarioMixin, View):
    model = Estudiante
    form_class = EstudianteForm 
    template_name = 'ingles/listar_estudiante.html'

    def get_queryset(self):
        return self.model.objects.filter(estado = True)
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['estudiantes']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())
    
class ActualizarEstudiante(LoginRequiredMixin, SuperUsuarioMixin, UpdateView):
    model = Estudiante
    form_class = EstudianteForm
    template_name = 'ingles/estudiante.html'
    success_url = reverse_lazy('curso:listar_estudiante')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['estudiantes']=Estudiante.objects.filter(estado = True)
        return context

class CrearEstudiante(LoginRequiredMixin, SuperUsuarioMixin, CreateView):
    model = Estudiante
    template_name = 'ingles/crear_estudiante.html'
    form_class = EstudianteForm
    success_url = reverse_lazy('curso:listar_estudiante')


class EliminarEstudiante(LoginRequiredMixin, SuperUsuarioMixin, DeleteView):
    model = Estudiante
    #success_url = reverse_lazy('curso:listar_estudiante')

    def post(self,request,pk, *args, **kwargs):
        object = Estudiante.objects.get(idestudiante = pk)
        object.estado = False
        object.save()
        return redirect('curso:listar_estudiante')
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    
""" CRUD GRUPO """
class ListadoGrupo(LoginRequiredMixin, SuperUsuarioMixin, View):
    model = Grupo
    form_class = GruposForm
    template_name = 'ingles/listar_grupos.html'

    def get_queryset(self):
        return self.model.objects.filter(estado = True)
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['grupos']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())

class ActualizarGrupo(LoginRequiredMixin, SuperUsuarioMixin, UpdateView):
    model = Grupo
    form_class = GruposForm
    template_name = 'ingles/grupo.html'
    success_url = reverse_lazy('curso:listar_grupos')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['grupos']=Estudiante.objects.filter(estado = True)
        return context

class CrearGrupo(LoginRequiredMixin, SuperUsuarioMixin, CreateView):
    model =Grupo
    template_name = 'ingles/crear_grupos.HTML'
    form_class = GruposForm
    success_url = reverse_lazy('curso:listar_grupos')

class EliminarGrupo(LoginRequiredMixin, SuperUsuarioMixin, DeleteView):
    model = Grupo
    #success_url = reverse_lazy('curso:listar_grupos')
    def post(self,request,pk, *args, **kwargs):
        object = Grupo.objects.get(idgrupo = pk)
        object.estado = False
        object.save()
        return redirect('curso:listar_grupos')
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

""" CRUD DET_GRUPO """

class ListadoGrupoDetalle(LoginRequiredMixin, SuperUsuarioMixin, ListView):
    model = Det_Grupo
    template_name = 'ingles/listar_gruposdetalle.html'
    context_object_name = 'gruposdetalles'

class ActualizarGrupoDetalle(LoginRequiredMixin, SuperUsuarioMixin, UpdateView):
    model = Det_Grupo
    template_name = 'ingles/grupodetalle.html'
    form_class = GruposDetalleForm
    success_url = reverse_lazy('curso:listar_grupos')

class CrearGrupoDetalle(LoginRequiredMixin, SuperUsuarioMixin, CreateView):
    model = Det_Grupo
    template_name = 'ingles/crear_gruposdetalle.html'
    form_class = GruposDetalleForm
    success_url = reverse_lazy('curso:listar_grupos')

class EliminarGrupoDetalle(LoginRequiredMixin, SuperUsuarioMixin, DeleteView):
    model = Det_Grupo
    success_url = reverse_lazy('curso:listar_grupos')

def listaDetalle(request, id):
    gruposdetalles = Det_Grupo.objects.filter(idgrupo = id)
    return render(request,'ingles/listar_gruposdetalle.html', {'gruposdetalles': gruposdetalles})

""" CRUD DOCENTES """
class ListadoDocente(LoginRequiredMixin, SuperUsuarioMixin, View):
    model = Docente
    form_class = DocenteForm
    template_name = 'ingles/listar_docente.html'

    def get_queryset(self):
        return self.model.objects.filter(estado = True).order_by('-iddocente')
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['docentes']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())
    
class ActualizarDocente(LoginRequiredMixin, SuperUsuarioMixin, UpdateView):
    model = Docente
    form_class = DocenteForm
    template_name = 'ingles/docente.html'
    success_url = reverse_lazy('curso:listar_docente')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['docentes']=Docente.objects.filter(estado = True)
        return context

class CrearDocente(LoginRequiredMixin, SuperUsuarioMixin, CreateView):
    model = Docente
    template_name = 'ingles/crear_docente.html'
    form_class = DocenteForm
    success_url = reverse_lazy('curso:listar_docente')

class EliminarDocente(LoginRequiredMixin, SuperUsuarioMixin, DeleteView):
    model = Docente
    #success_url = reverse_lazy('curso:listar_estudiante')

    def post(self,request,pk, *args, **kwargs):
        object = Docente.objects.get(iddocente = pk)
        object.estado = False
        object.save()
        return redirect('curso:listar_docente')
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

""" CRUD PAGO """
class ListadoPago(LoginRequiredMixin, SuperUsuarioMixin, View):
    model = Pago
    form_class = PagoForm
    template_name = 'ingles/listar_pagos.html'
    
    def get_queryset(self):
        return self.model.objects.filter(estado = True).order_by('-foliopago')
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['pagos']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())
    
class ListadoPagoE(LoginRequiredMixin, View):
    model = Pago
    form_class = PagoForm
    template_name = 'ingles/listar_pagos.html'
    
    def get_queryset(self):
        return self.model.objects.filter(usuario =self.request.user.username )
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['pagos']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())

class ActualizarPago(LoginRequiredMixin, SuperUsuarioMixin, UpdateView):
    model = Pago
    form_class = PagoForm
    template_name = 'ingles/pago.html'
    success_url = reverse_lazy('curso:listar_pago')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['pagos']=Pago.objects.filter(estado = True)
        return context

class CrearPago(LoginRequiredMixin, CreateView):
    model = Pago
    template_name = 'ingles/crear_pago.html'
    form_class = PagoForm
    success_url = reverse_lazy('curso:listar_pago')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['pagos']=Pago.objects.filter(estado = True)  
        return context

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.idestudiante = self.request.idestudiante
        self.object.usuario = self.request.user.username
        self.object.save()
        return super(CrearPago, self).form_valid(form)

class EliminarPago(LoginRequiredMixin, SuperUsuarioMixin, DeleteView):
    model = Pago
    #success_url = reverse_lazy('curso:listar_estudiante')

    def post(self,request,pk, *args, **kwargs):
        object = Pago.objects.get(foliopago = pk)
        object.estado = False
        object.save()
        return redirect('curso:listar_pago')
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

""" CRUD PERIODO """
class ListadoPeriodo(LoginRequiredMixin, SuperUsuarioMixin, View):
    model = Periodo
    form_class = PeriodoForm
    template_name = 'ingles/listar_periodo.html'

    def get_queryset(self):
        return self.model.objects.filter(estado = True)
    
    def get_context_data(self, **kwargs):
        contexto = {}
        contexto['periodos']=self.get_queryset()
        return contexto
    
    def get(self, request, *args, **kwargs):    
        return render(request, self.template_name, self.get_context_data())

class ActualizarPeriodo(LoginRequiredMixin, SuperUsuarioMixin, UpdateView):
    model = Periodo
    form_class = PeriodoForm
    template_name = 'ingles/periodo.html'
    success_url = reverse_lazy('curso:listar_periodo')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['periodos']=Periodo.objects.filter(estado = True)
        return context

class CrearPeriodo(LoginRequiredMixin, SuperUsuarioMixin, CreateView):
    model = Periodo
    template_name = 'ingles/crear_periodo.html'
    form_class = PeriodoForm
    success_url = reverse_lazy('curso:listar_periodo')

class EliminarPeriodo(LoginRequiredMixin, SuperUsuarioMixin, DeleteView):
    model = Periodo
    #success_url = reverse_lazy('curso:listar_estudiante')

    def post(self,request,pk, *args, **kwargs):
        object = Periodo.objects.get(idperiodo = pk)
        object.estado = False
        object.save()
        return redirect('curso:listar_periodo')
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""