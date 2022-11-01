from django.contrib import admin
from django.contrib import messages
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *

# Register your models here.
from ingles.models import Aula, Carrera, Docente, Estado, Materia, Periodo, Estudiante, Pago, Grupo, Det_Grupo,Modalidad

"""class DetalleAdmni(resources.ModelResource):
    class Meta:
        model = Det_Grupo"""

admin.site.site_header = 'Coordinación de Lenguas Extranjeras'
admin.site.index_title = 'Panel de Control'
admin.site.site_title = 'CLE | AppSeed'

class Aulav(admin.ModelAdmin):
    list_display=('idaula','nombre')
admin.site.register(Aula, Aulav )

class Estadov(admin.ModelAdmin):
    list_display=('idestado','estado')
admin.site.register(Estado, Estadov )

class Carrerav(admin.ModelAdmin):
    list_display=('idcarrera','nombrecarrera')
admin.site.register(Carrera, Carrerav)
class Docentev(admin.ModelAdmin):
    list_display=('iddocente','nombre','apellidop','apellidom')
admin.site.register(Docente, Docentev)

class Materiav(admin.ModelAdmin):
    list_display=('idmateria','nombremateria')
admin.site.register(Materia,Materiav)

class Modalidadv(admin.ModelAdmin):
    list_display=('idmodalidad','modalidad')
admin.site.register(Modalidad,Modalidadv)

class Periodov(admin.ModelAdmin):
    list_display=('idperiodo','periodo')
admin.site.register(Periodo, Periodov)

class Estudiantev(admin.ModelAdmin):
    list_display=('idestudiante','nombre','apellidop','apellidom','nocontrol','idcarrera')
admin.site.register(Estudiante, Estudiantev)

class Pagov(admin.ModelAdmin):
    list_display=('foliopago','idmateria','idestudiante','idperiodo','idestado')
    search_fields = ['idestudiante__nombre','idestudiante__nocontrol']
    list_filter = [ 'idestado','idmateria', 'idperiodo']

    def rate_five_stars(modeladmin, request, queryset):
        queryset.update(idestado=2)
        messages.success(request, "Se cambio a Aceptados")

    admin.site.add_action(rate_five_stars, "Cambiar a Aceptados")
admin.site.register(Pago, Pagov)

class Grupov(admin.ModelAdmin):
    list_display=('idperiodo','idgrupo','idmateria','iddocente','idaula','idmodalidad','horario')
    list_filter = ['idmateria', 'idperiodo', 'idmodalidad']
admin.site.register(Grupo, Grupov)

class Det_Grupov(admin.ModelAdmin):
    list_display=('idperiodo','idgrupo','idestudiante','foliopago','calif')
    #search_fields = ['idgrupo', 'idperiodo']
    list_filter = ['idperiodo', 'idgrupo']
admin.site.register(Det_Grupo, Det_Grupov)
