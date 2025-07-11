from dataclasses import field
import imp
from pyexpat import model
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from sqlparse import filters 

# from ingles.validators import *
# from django.core.exceptions import ValidationError
from .models import Det_Grupo, Docente, Estudiante, Grupo, Pago, Periodo, Materia


from ingles.validators import *

class EstudianteForm(forms.ModelForm):
    class Meta:
        model = Estudiante
        fields = ['nombre', 'apellidop', 'apellidom', 'nocontrol', 'idcarrera', 'email','genero']
        labels = {
            'nombre': 'Nombre del Estudiante',
            'apellidop': 'Apellido Paterno ',
            'apellidom': 'Apellido Materno',
            'nocontrol': 'Número de Control',
            'idcarrera': 'Carrera',
            'email': 'Correo Electronico',
            'genero': 'Genero'
            # 'pagocurso' : 'Vaoucher Del Pago al Curso',
            # 'pagomaterial': 'Vaoucher Del Pago del Material',
        }
        widgets = {
            'nombre': forms.TextInput(attrs = {'class':'form-control','placeholder':'Ingrese el Nombre del Estudiante'}),
            'apellidop': forms.TextInput(attrs = {'class':'form-control','placeholder':'Ingrese el Apellido Paterno'}),
            'apellidom':forms.TextInput(attrs = {'class':'form-control','placeholder':'Ingrese el Apellido Materno'}),
            'nocontrol': forms.TextInput(attrs = {'class':'form-control','placeholder': 'Ingrese el Número de Control.'}),
            'idcarrera': forms.Select(attrs = {'class':'form-control',}),
            'email': forms.EmailInput(attrs = {'class':'form-control',}),
            'genero': forms.Select(attrs = {'class':'form-control',}),
        }

class FacilitadorForm(forms.ModelForm):
    class Meta:
        model = Docente
        fields = ['nombre', 'apellidop', 'apellidom', 'rfc', 'ced', 'email',]
        labels = {
            'nombre': 'Nombre del Estudiante',
            'apellidop': 'Apellido Paterno ',
            'apellidom': 'Apellido Materno',
            'rfc': 'RFC',
            'ced': 'Cédula Profesional',
            'email': 'Correo Electronico',
            # 'pagocurso' : 'Vaoucher Del Pago al Curso',
            # 'pagomaterial': 'Vaoucher Del Pago del Material',
        }
        widgets = {
            'nombre': forms.TextInput(attrs = {'class':'form-control','placeholder':'Ingrese el Nombre del Estudiante'}),
            'apellidop': forms.TextInput(attrs = {'class':'form-control','placeholder':'Ingrese el Apellido Paterno'}),
            'apellidom':forms.TextInput(attrs = {'class':'form-control','placeholder':'Ingrese el Apellido Materno'}),
            'rfc': forms.TextInput(attrs = {'class':'form-control'}),
            'ced': forms.TextInput(attrs = {'class':'form-control',}),
            'email': forms.EmailInput(attrs = {'class':'form-control',}),
            'usuario': forms.Select(attrs = {'class':'form-control','disabled':True}),
        }

class GruposForm(forms.ModelForm):
    class Meta:
        model = Grupo
        fields = ['capacidad']
        labels = {
            'capacidad': 'Capacidad',
        }
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['capacidad'].widget.attrs['class'] = 'form-control'

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
            'idperiodo': forms.Select(attrs = {'class':'form-control',}),
            'idgrupo': forms.Select(attrs = {'class':'form-control',}),
            'idestudiante':forms.Select(attrs = {'class':'form-control',}),
            'foliopago': forms.Select(attrs = {'class':'form-control',}),
            'calif': forms.TextInput(attrs = {'class':'form-control','placeholder': 'Ingresa la Calificacion'})
        }

class GruposDetalleFormset(forms.ModelForm):
    class Meta:
        model = Det_Grupo
        fields = ['idestudiante','calif']
        labels = {'idestudiante': 'Estudiante','calif': 'Calificacion'}
        # idgrupo = forms.(queryset=Grupo.objects.filter()) 'disabled':'True'
        widgets = {
            'idestudiante':forms.Select(attrs = {'style': 'text-transform:uppercase;'}),
            'calif': forms.TextInput( attrs = {'placeholder': ' ', 'style': 'width:50px;'})
        }
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idestudiante'].disabled = True

class GruposDetalleAdmForm(forms.ModelForm):
    class Meta:
        model = Det_Grupo
        fields = ['idestudiante','foliopago']
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
    pagocurso = forms.FileField(validators=[valid_extension],error_messages = {'required':"Archivos permitidos: .jpg, .jpeg, .png, .pdf"}) 
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
            'pagocurso' : 'Vaoucher Agregar Nombre Completo, Número de control y Concepto del pago',
        }
        widgets = { 
            'idmateria': forms.Select(
                attrs = {
                    'class':'form-control',
                }
            ),
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
            'monto': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Cantidad'
                }
            ),
            'fechapago': DateInput(),
        }
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['idgrupo'].queryset = Grupo.objects.none()
        self.fields['idperiodo'].queryset = Periodo.objects.filter(estado=True)

        if 'idmateria' in self.data:
            try:
                idmateria = int(self.data.get('idmateria'))
                self.fields['idgrupo'].queryset = Grupo.objects.filter(idmateria = idmateria)
            except (ValueError, TypeError):
                pass
        elif self.instance.pk:
            self.fields['idgrupo'].queryset = self.intance.idmateria.idgrupo_set  

class PagoFormM(forms.ModelForm):
    class Meta:
        model = Pago
        fields = ['pagocurso', 'monto']
        labels = {
            'monto': 'Monto',
            'pagocurso' : 'Vaoucher Agregar Nombre Completo, Número de control y Concepto del pago',
        }
        widgets = { 
            'idmateria': forms.Select(
                attrs = {
                    'class':'form-control',
                }
            ),
            'idperiodo': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder': 'Ingrese el periodo'
                }
            ),
            'monto': forms.TextInput(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Cantidad'
                }
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['pagocurso'].widget.attrs['name'] = 'otro'

    # class DocumentForm(forms.ModelForm):
    # docfile = forms.FileField(label='Select a file', help_text='max. 42 megabytes')
    # class Meta:
    # model = Document
class PagoFormF(forms.ModelForm):
    class Meta:
        model = Pago
        fields = ['idestado','descripcion']
        labels = {
            'idestado': 'Estado',
            'descripcion': 'Descripción',
            'pagocurso' : 'Departamento de Recursos Financieros | Está en verificar pago',
        }
        widgets = {
            'idestado': forms.Select(
                attrs = {
                    'class':'form-control',
                    'placeholder':'Estado'
                }
            ),
            'descripcion': forms.Textarea(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Escriba una descripción',
                    'rows': 5
                }
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    # class DocumentForm(forms.ModelForm):
    # docfile = forms.FileField(label='Select a file', help_text='max. 42 megabytes')
    # class Meta:
    # model = Document

class CustomUserCreationForm(UserCreationForm):
    class Meta :
        model = User
        fields = ['username', "first_name", "last_name","email", "password1", "password2"]
        # fields2 = ['idcarrera','apellidom']
        labels = {
            'username': 'Número de Control',
            'last_name': 'Apellido Paterno',
            'email': 'Correo Institucional',
            'idcarrera': 'Carrera',
            'apellidom': 'Apellido Materno',
        }
        widgets = {
            'username':forms.TextInput(attrs = {'class':'form-control','type':'text',}),
            'first_name':forms.TextInput(attrs = {'class':'form-control','type':'text','required': True}),
            'last_name':forms.TextInput(attrs = {'class':'form-control','type':'text', 'required': True}),
            'email':forms.EmailInput(attrs = {'class':'form-control','type':'email','required': True}),
            'idcarrera': forms.Select(attrs = {'class':'form-control'}),
            'apellidom':forms.TextInput(attrs = {'class':'form-control',}),
            }
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['autocomplete'] = 'off'
        self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['email'].widget.attrs['type'] = 'email'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['type'] = 'password'
        self.fields['password1'].widget.attrs['autocomplete'] = 'off'
        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['type'] = 'password'
        self.fields['password2'].widget.attrs['autocomplete'] = 'off'

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

class CarreraForm(forms.ModelForm):
    class Meta:
        model = Estudiante
        fields = ['idcarrera','apellidom','genero']
        labels = {
            'idcarrera': 'Carrera',
            'apellidom': 'Apellido Materno',
        }
        widgets = {
            'idcarrera': forms.Select(attrs = {'class':'form-control',}),
            'apellidom':forms.TextInput(attrs = {'class':'form-control','autocomplete':'off', 'type':'text', 'required': True}),
            'genero': forms.Select(attrs = {'class':'form-control',}),

        }
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['apellidom'].widget.attrs['autocomplete'] = 'off'