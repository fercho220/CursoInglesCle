from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from ingles.models import Aula, Carrera, Docente, Estado, Materia, Periodo, Estudiante, Pago, Grupo, Det_Grupo,Modalidad

"""class DetalleAdmni(resources.ModelResource):
    class Meta:
        model = Det_Grupo"""

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
    list_display=('foliopago','idmateria','idestudiante','idperiodo','fechapago','fechasist','idestado','monto','usuario')
admin.site.register(Pago, Pagov)

class Grupov(admin.ModelAdmin):
    list_display=('idperiodo','idgrupo','idmateria','iddocente','idaula','idmodalidad','horario')
admin.site.register(Grupo, Grupov)

class Det_Grupov(admin.ModelAdmin):
    list_display=('idperiodo','idgrupo','idestudiante','foliopago','calif')
    #search_fields = ['idgrupo', 'idperiodo']
    list_filter = ['idgrupo', 'idperiodo']
admin.site.register(Det_Grupo, Det_Grupov)
