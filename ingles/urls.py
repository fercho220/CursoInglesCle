from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *
from . import  views
from os import name

app_name='ingles'
urlpatterns = [
#""" PRUEBAS_HILDA """
    path('estadisticas/<int:pk>', Estadisticas.as_view(),name='estadisticas'),
    path('estadisticas_Global/<str:pk>', EstadisticasGlobales.as_view(),name='estadisticas_Global'),
    # path('grafica_pdf/<int:pk>', Grafic_pdf.as_view(), name = 'grafica_pdf'),
 
#""" END_PRUEBAS_HILDA """

#   PRUEBAS EMMA
    path('docentes/',ListadoDocente.as_view(), name = 'listar_docentes'),
#   END PRUEBAS EMMA


    path('',login_required(views.home),name='index'),
    path('adm/',adminP.as_view(),name='adm'),
    path('index2/',login_required(views.home2),name='index2'),
    path('registro/',views.Registro,name='registro'),
    
    path('perfil/', PerfilListadoEstudiante.as_view() , name = 'listar_perfil'),
    path('perfilF/', PerfilListadoFacilitador.as_view() , name = 'listar_perfilF'),
    path('editar_estudiante2/<int:pk>', PerfilActualizarEstudiante.as_view() , name = 'editar_estudiante2'),
    path('editar_facilitador/<int:pk>', PerfilActualizarFacilitador.as_view() , name = 'editar_facilitador'),

    
    #""" URL ESTUDIANTE """
    #path('',login_required(Inicio.as_view()) , name='index'),#path('',views.Home, name = 'index'),
    path('crear_estudiante/', CrearEstudiante.as_view() , name = 'crear_estudiante'),
    path('listar_estudiante/',ListadoEstudiante.as_view(), name = 'listar_estudiante'),

    path('listar_alumnos/',ListadoAlumno.as_view(), name = 'listar_alumnos'),
    path('listar_historial/<str:id>', login_required(listarHistorial), name = 'listar_historial'),

    path('editar_estudiante/<int:pk>',ActualizarEstudiante.as_view() , name = 'editar_estudiante'),
    path('eliminar_estudiante/<int:pk>', EliminarEstudiante.as_view() , name = 'eliminar_estudiante'),

    #""" URL GRUPOS """
    path('crear_grupos/', CrearGrupo.as_view() , name = 'crear_grupos'),
    path('listar_grupos/', ListadoGrupo.as_view(), name = 'listar_grupos'),
    path('listar_gruposF/', ListadoGrupoF.as_view(), name = 'listar_gruposF'),
    path('calificar_grupos/', CalificarGrupo.as_view(), name = 'calificar_grupos'),
    path('editar_grupos/<int:pk>', ActualizarGrupo.as_view() , name = 'editar_grupos'),
    path('eliminar_grupos/<int:pk>', EliminarGrupo.as_view() , name = 'eliminar_grupos'),

    #""" URL DETALLE_GRUPOS """
    path('editar_gruposdetalles/<int:pk>', ActualizarGrupoDetalle.as_view() , name = 'editar_gruposdetalles'),
    path('listar_gruposdetalles/<int:id>', login_required(listaDetalle), name = 'listar_gruposdetalles'),
    path('calificar/<int:id>', login_required(calificar), name = 'calificar'),
    path('calificar_admin/', CalificarAdmin.as_view(), name = 'calificar_admin'),


    
    path('crear_gruposdetalles/', CrearGrupoDetalle.as_view() , name = 'crear_gruposdetalles'),
    path('crear_gruposdetallesA/', CrearGrupoDetalleAdm.as_view() , name = 'crear_gruposdetallesadm'),
    path('eliminar_gruposdetalles/<int:pk>', EliminarGrupoDetalle.as_view() , name = 'eliminar_gruposdetalles'),
    path('pdf_gruposdetalles/<int:pk>', Pdf.as_view(), name = 'pdf_gruposdetalles'),
    path('pdf/<int:pk>', sale.as_view(), name = 'sale'),
    path('pdf-f/<int:pk>', saleF.as_view(), name = 'saleF'),
    path('pdf-p/<int:pk>', saleP.as_view(), name='saleP'),
    path('excel/<int:pk>', Excel.as_view(), name = 'Excel'),
    
    #""" URL DOCENTE """
    path('crear_docente/', CrearDocente.as_view() , name = 'crear_docente'),
    path('listar_docente/',ListadoDocente.as_view(), name = 'listar_docente'),
    path('listar_gr_docente/<int:id>', login_required(listadoGrupoDocente), name = 'listar_gr_docente'),
    path('editar_docente/<int:pk>', ActualizarDocente.as_view() , name = 'editar_docente'),
    path('eliminar_docente/<int:pk>', EliminarDocente.as_view() , name = 'eliminar_docente'),
    path('eliminar_docentes/<int:pk>', EliminarDocentes.as_view() , name = 'eliminar_docentes'),

    #""" URL PAGOS """
    path('crear_pago/', CrearPago.as_view() , name = 'crear_pago'),
    path('crear_pago2/', CrearPago2.as_view() , name = 'crear_pago2'),

    path('listar_pago/', ListadoPago.as_view(), name = 'listar_pago'),
    path('listar_pagoE/', ListadoPagoE.as_view(), name = 'listar_pagoE'),
    path('editar_pago/<int:pk>', ActualizarPago.as_view() , name = 'editar_pago'),
    path('editar_pago2/<int:pk>', ActualizarPago2.as_view() , name = 'editar_pago2'),
    path('editar_pago3/<int:pk>', ActualizarPago3.as_view() , name = 'editar_pago3'),
    path('fetch_messages/', fetch_messages, name='fetch_messages'),
    path('fetch_comments_status/', views.fetch_comments_status, name='fetch_comments_status'),
    
    path('editar_pagoIPhone/<int:pk>', ActualizarPagoPhone.as_view() , name = 'editar_pagoIPhone'),

    path('eliminar_pago/<int:pk>',EliminarPago.as_view(), name = 'eliminar_pago'),
    path('ajax/load-cities/', login_required(load_cities), name='ajax_load_cities'), # AJAX
    path('listar_financiero/<str:pk>',ListadoFinanciero.as_view(), name = 'listar_financiero'),

    #""" URL PERIODO """z
    path('crear_periodo/', CrearPeriodo.as_view() , name = 'crear_periodo'),
    path('listar_periodo/', ListadoPeriodo.as_view(), name = 'listar_periodo'),
    path('editar_periodo<int:pk>', ActualizarPeriodo.as_view() , name = 'editar_periodo'),
    path('eliminar_periodo/<int:pk>',EliminarPeriodo.as_view(), name = 'eliminar_periodo'),


    #LOGS#
    path('activity_logs/', activity_logs, name='activity_logs'),
    
]   