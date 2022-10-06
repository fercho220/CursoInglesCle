from dataclasses import field
import imp
from pyexpat import model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from sqlparse import filters 

from .models import Det_Grupo, Docente, Estudiante, Grupo, Pago, Periodo

class EstudianteForm(forms.ModelForm):
    class Meta:
        model = Estudiante
        fields = ['nombre', 'apellidop', 'apellidom', 'nocontrol', 'idcarrera', 'email']
        labels = {
            'nombre': 'Nombre del Estudiante',
            'apellidop': 'Apellido Paterno ',
            'apellidom': 'Apellido Materno',
            'nocontrol': 'Número de Control',
            'idcarrera': 'Carrera',
            'email': 'Correo Electronico',
            # 'pagocurso' : 'Vaoucher Del Pago al Curso',
            # 'pagomaterial': 'Vaoucher Del Pago del Material',
        }
        widgets = {
            'nombre': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Nombre del Estudiante'
                }
            ),
            'apellidop': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Apellido Paterno'
                }
            ),
            'apellidom':forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Apellido Materno'
                }
            ),
            'nocontrol': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese el Número de Control.'
                }
            ),
            'idcarrera': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingresa tu Carrera'
                }
            )
        }

class GruposForm(forms.ModelForm):
    class Meta:
        model = Grupo
        fields = ['idperiodo', 'idmateria', 'iddocente', 'idaula', 'idmodalidad', 'horario']
        labels = {
            'idperiodo': 'Periodo',
            'idmateria': 'Materia ',
            'iddocente': 'Docente',
            'idaula': 'Aula',
            'idmodalidad': 'Modalidad',
            'horario': 'Horario',
        }
        widgets = {
            'idperiodo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Periodo'
                }
            ),
            'idmateria': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese la Materia'
                }
            ),
            'iddocente':forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Docente'
                }
            ),
            'idaula': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese el Aula'
                }
            ),
            'idmodalidad': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese la modalidad'
                }
            ),
            'horario': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingresa el Horario'
                }
            )
        }

class GruposDetalleForm(forms.ModelForm):
    class Meta:
        model = Det_Grupo
        fields = []
        labels = {
            'idperiodo': 'Periodo',
            'idgrupo': 'Grupo ',
            'idestudiante': 'Estudiante',
            'foliopago': 'Folio',
            'calif': 'Calificacion',
        }
        # idgrupo = forms.(queryset=Grupo.objects.filter())
        widgets = {
            'idperiodo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Periodo',

                }
            ),
            'idgrupo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Grupo'
                }
            ),
            'idestudiante':forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Estudiante'
                }
            ),
            'foliopago': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese el Folio del Alumno'
                }
            ),
            'calif': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingresa la Calificacion'
                }
            )
        }

class GruposDetalleAdmForm(forms.ModelForm):
    class Meta:
        model = Det_Grupo
        fields = ['idperiodo','idgrupo','idestudiante','foliopago','calif']
        labels = {
            'idperiodo': 'Periodo',
            'idgrupo': 'Grupo ',
            'idestudiante': 'Estudiante',
            'foliopago': 'Folio',
            'calif': 'Calificacion',
        }
        # idgrupo = forms.(queryset=Grupo.objects.filter())
        widgets = {
            'idperiodo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Periodo',

                }
            ),
            'idgrupo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Grupo'
                }
            ),
            'idestudiante':forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Estudiante'
                }
            ),
            'foliopago': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese el Folio del Alumno'
                }
            ),
            'calif': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingresa la Calificacion'
                }
            )
        }

class DocenteForm(forms.ModelForm):
    class Meta:
        model = Docente
        fields = ['nombre', 'apellidop', 'apellidom']
        labels = {
            'nombre': 'Nombre del Docente',
            'apellidop': 'Apellido Paterno ',
            'apellidom': 'Apellido Materno',
        }
        widgets = {
            'nombre': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Nombre del Docente'
                }
            ),
            'apellidop': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Apellido Paterno'
                }
            ),
            'apellidom':forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Apellido Materno'
                }
            )
        }

class DateInput(forms.DateInput):
    input_type = 'date'

class PagoForm(forms.ModelForm):
    class Meta:
        model = Pago
        fields = ['idperiodo', 'idmateria','idgrupo', 'fechapago', 'pagocurso', 'monto']
        labels = {
            'foliopago': 'Folio del Estudiante',
            'idperiodo': 'Periodo',
            'idmateria': 'Curso del Estudiante ',
            'idgrupo': 'Grupo',
            # 'idestudiante': 'Estudiante',
            'fechapago': 'Fecha Del Pago',
            'monto': 'Monto',
            'pagocurso' : 'Vaoucher Del Pago al Curso',
        }
        widgets = { 
            'idmateria': forms.Select(
                attrs = {
                    'class':'form-control',
                }
            ),
            # 'idestudiante':forms.Select(
            #     attrs = {
            #         'class':'form-control',
            #         'placeholder':'Ingrese el alumno',
            #         'readonly':'readonly'
            #     }
            # ),
            'idperiodo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese el periodo'
                }
            ),
            'idgrupo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Grupo'
                }
            ),
            'fechapago': DateInput(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idgrupo'].queryset = Grupo.objects.none()

        if 'idmateria' in self.data:
            try:
                idmateria = int(self.data.get('idmateria'))
                self.fields['idgrupo'].queryset = Grupo.objects.filter(idmateria = idmateria)
            except (ValueError, TypeError):
                pass
        elif self.instance.pk:
            self.fields['idgrupo'].queryset = self.intance.idmateria.idgrupo_set
                
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     if self.instance.pk and self.instance.idestudiante:
    #         self.fields['idestudiante'].widget.attrs.update({'disabled': true})
class CustomUserCreationForm(UserCreationForm):
    class Meta :
        model = User
        fields = ['username', "first_name", "last_name", "email", "password1", "password2"]
        labels = {
            'last_name': 'Apelido Paterno'
        }

class PeriodoForm(forms.ModelForm):
    class Meta:
        model = Periodo
        fields = ['idperiodo', 'periodo']
        labels = {
            'idperiodo': 'Año del Periodo',
            'periodo': 'Nombre Periodo',
        }
        widgets = {
            'idperiodo': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el año'
                }
            ),
            'periodo': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Ingrese el Periodo'
                }
            )
        }
