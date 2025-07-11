from django.contrib import admin
from django.contrib import messages
from .models import *
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
# from django.shortcuts import redirect, render
#from django_admin_listfilter_dropdown.filters import DropdownFilter, RelatedDropdownFilter, ChoiceDropdownFilter
# from django_filters import RelatedDropdownFilter

# Register your models here.
from ingles.models import Aula, Carrera, Docente, Estado, Materia, Periodo, Estudiante, Pago, Grupo, Det_Grupo,Modalidad

"""class DetalleAdmni(resources.ModelResource):
    class Meta:
        model = Det_Grupo"""

admin.site.site_header = 'Coordinación de Lenguas Extranjeras'
admin.site.index_title = 'Panel de Control'
admin.site.site_title = 'CLE | AppSeed'
admin.site.register(Permission)
admin.site.register(ContentType)

class Aulav(admin.ModelAdmin):
    list_display=('idaula','nombre')
admin.site.register(Aula, Aulav )

class Estadov(admin.ModelAdmin):
    list_display = ('idestado', 'estado')  # Define los campos a mostrar en la lista
    search_fields = ['estado']  # Agrega campos por los cuales se puede buscar

    def estado(self, obj):
        return obj.estado if obj.estado else "N/A"
    estado.short_description = 'Estado'
admin.site.register(Estado, Estadov )

class Carrerav(admin.ModelAdmin):
    list_display=('idcarrera','nombrecarrera')
admin.site.register(Carrera, Carrerav)

class Docentev(admin.ModelAdmin):
    list_display=('iddocente','nombre','apellidop','apellidom')
    search_fields = ['nombre','apellidop','apellidom']
    autocomplete_fields = ['usuario']

    def nombre(self, obj):
        return obj.nombre if obj.nombre else "N/A"

    def apellidop(self, obj):
        return obj.apellidop if obj.apellidop else "N/A"

    def apellidom(self, obj):
        return obj.apellidom if obj.apellidom else "N/A"

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
    search_fields = ['nombre','apellidop','apellidom','nocontrol']

    def nombre(self, obj):
        return obj.nombre if obj.nombre else "N/A"

    def apellidop(self, obj):
        return obj.apellidop if obj.apellidop else "N/A"

    def apellidom(self, obj):
        return obj.apellidom if obj.apellidom else "N/A"

    def nocontrol(self, obj):
        return obj.nocontrol if obj.nocontrol else "N/A"

admin.site.register(Estudiante, Estudiantev)

class Pagov(admin.ModelAdmin):
    list_display=('foliopago','idmateria','get_name','idestudiante','idperiodo','idestado')
    search_fields = ['idestudiante__nombre','idestudiante__nocontrol']
    list_filter = ['idestado','idmateria', 'idperiodo']
    autocomplete_fields = ['idestudiante', 'idgrupo']

    def get_name(self, obj):
        return obj.idestudiante.nocontrol if obj.idestudiante and obj.idestudiante.nocontrol else "N/A"
    get_name.admin_order_field = 'idestudiante__nocontrol' 
    get_name.short_description = 'No Control' 

    def foliopago(self, obj):
        return obj.foliopago if obj.foliopago else "N/A"

    def idestudiante(self, obj):
        return obj.idestudiante.idestudiante if obj.idestudiante else "N/A"
admin.site.register(Pago, Pagov)
# class Grupov(admin.ModelAdmin):
#     list_display=('idmateria','idperiodo','grupo','iddocente','idmodalidad','horario')
#     list_filter = ['idmateria', 'idperiodo', 'idmodalidad']

#     def rate_five_stars(modeladmin, request, queryset):
#         queryset.update(estadoG=False,estado=False)
#         messages.success(request, "Se Cancelo el Grupo")

#     admin.site.add_action(rate_five_stars, "Cancelar Grupo")
# admin.site.register(Grupo, Grupov)

class Grupov(admin.ModelAdmin):
    list_display=('idperiodo','nivel',"cant",'grupo','idaula','iddocente','idmodalidad','horario')
    list_filter = ['idmateria', 'idperiodo', 'idmodalidad']
    
    #list_filter = (('idmateria', RelatedDropdownFilter), ('idperiodo', RelatedDropdownFilter), ('idmodalidad', RelatedDropdownFilter))

    search_fields = ['iddocente__nombre','iddocente__apellidop', 'idperiodo__periodo','idmodalidad__modalidad','idmateria__nombremateria']
    list_per_page = 25
    
    def rate_five_stars(modeladmin, request, queryset):
        queryset.update(estadoG=False,estado=False)
        messages.success(request, "Se Cancelo el Grupo")

    admin.site.add_action(rate_five_stars, "Cancelar Grupo")

    def nivel(self, obj) -> str:
        return obj.idmateria
    nivel.admin_order_field = 'idmateria__nombremateria'

    def cant(self, obj) -> str:
        var = Det_Grupo.objects.filter(idgrupo = obj.idgrupo).count()
        return var
admin.site.register(Grupo, Grupov)

class Det_Grupov(admin.ModelAdmin):
    list_display=('idperiodo','idgrupo','idestudiante','calif')
    #search_fields = ['idgrupo', 'idperiodo']
    search_fields = ['idestudiante__nombre','idestudiante__nocontrol']
    list_filter = ['idperiodo','foliopago__idmateria','idgrupo__iddocente','idgrupo__idmodalidad','idgrupo__grupo']
    list_per_page = 25
    autocomplete_fields = ['idgrupo','idestudiante','foliopago']
    
admin.site.register(Det_Grupo, Det_Grupov)
