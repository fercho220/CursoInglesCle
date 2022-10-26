from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *
from . import  views
from os import name

app_name='ingles'
urlpatterns = [
    path('',login_required(views.home),name='index'),
    path('index2/',login_required(views.home2),name='index2'),
    path('registro/',views.Registro,name='registro'),
    
    path('perfil/', PerfilListadoEstudiante.as_view() , name = 'listar_perfil'),
    path('editar_estudiante2/<int:pk>', PerfilActualizarEstudiante.as_view() , name = 'editar_estudiante2'),
    #""" URL ESTUDIANTE """
    #path('',login_required(Inicio.as_view()) , name='index'),#path('',views.Home, name = 'index'),
    path('crear_estudiante/', CrearEstudiante.as_view() , name = 'crear_estudiante'),
    path('listar_estudiante/',ListadoEstudiante.as_view(), name = 'listar_estudiante'),
    path('editar_estudiante/<int:pk>',ActualizarEstudiante.as_view() , name = 'editar_estudiante'),
    path('eliminar_estudiante/<int:pk>', EliminarEstudiante.as_view() , name = 'eliminar_estudiante'),

    #""" URL GRUPOS """
    path('crear_grupos/', CrearGrupo.as_view() , name = 'crear_grupos'),
    path('listar_grupos/', ListadoGrupo.as_view(), name = 'listar_grupos'),
    path('editar_grupos/<int:pk>', ActualizarGrupo.as_view() , name = 'editar_grupos'),
    path('eliminar_grupos/<int:pk>', EliminarGrupo.as_view() , name = 'eliminar_grupos'),

    #""" URL DETALLE_GRUPOS """
    path('editar_gruposdetalles/<int:pk>', ActualizarGrupoDetalle.as_view() , name = 'editar_gruposdetalles'),
    path('listar_gruposdetalles/<int:id>', login_required(listaDetalle), name = 'listar_gruposdetalles'),
    path('crear_gruposdetalles/', CrearGrupoDetalle.as_view() , name = 'crear_gruposdetalles'),
    path('crear_gruposdetallesA/', CrearGrupoDetalleAdm.as_view() , name = 'crear_gruposdetallesadm'),
    path('eliminar_gruposdetalles/<int:pk>', EliminarGrupoDetalle.as_view() , name = 'eliminar_gruposdetalles'),
    
    #""" URL DOCENTE """
    path('crear_docente/', CrearDocente.as_view() , name = 'crear_docente'),
    path('listar_docente/',ListadoDocente.as_view(), name = 'listar_docente'),
    path('editar_docente<int:pk>', ActualizarDocente.as_view() , name = 'editar_docente'),
    path('eliminar_docente/<int:pk>', EliminarDocente.as_view() , name = 'eliminar_docente'),

    #""" URL PAGOS """
    path('crear_pago/', CrearPago.as_view() , name = 'crear_pago'),
    path('listar_pago/', ListadoPago.as_view(), name = 'listar_pago'),
    path('listar_pagoE/', ListadoPagoE.as_view(), name = 'listar_pagoE'),
    path('editar_pago<int:pk>', ActualizarPago.as_view() , name = 'editar_pago'),
    path('eliminar_pago/<int:pk>',EliminarPago.as_view(), name = 'eliminar_pago'),
    path('ajax/load-cities/', login_required(load_cities), name='ajax_load_cities'), # AJAX
    path('ajax/load-cities2/', login_required(load_cities2), name='ajax_load_cities2'), # AJAX

    #""" URL PERIODO """z
    path('crear_periodo/', CrearPeriodo.as_view() , name = 'crear_periodo'),
    path('listar_periodo/', ListadoPeriodo.as_view(), name = 'listar_periodo'),
    path('editar_periodo<int:pk>', ActualizarPeriodo.as_view() , name = 'editar_periodo'),
    path('eliminar_periodo/<int:pk>',EliminarPeriodo.as_view(), name = 'eliminar_periodo'),
]   