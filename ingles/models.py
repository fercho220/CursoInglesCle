import re
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Aula(models.Model):
    idaula = models.AutoField(db_column='IdAula', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=25, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        verbose_name = 'Aula'
        verbose_name_plural = 'Aulas'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class Estado(models.Model):
    idestado = models.AutoField(db_column='IdEstado', primary_key=True)  # Field name made lowercase.
    estado = models.CharField(db_column='Estado', max_length=25, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        verbose_name = 'Estado'
        verbose_name_plural = 'Estados'

    def __str__(self):
        return self.estado

class Carrera(models.Model):
    idcarrera = models.AutoField(db_column='IdCarrera', primary_key=True)  # Field name made lowercase.
    nombrecarrera = models.CharField(db_column='NombreCarrera', max_length=25, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        verbose_name = 'Carrera'
        verbose_name_plural = 'Carreras'

    def __str__(self):
        return self.nombrecarrera

class Docente(models.Model):
    iddocente = models.AutoField(db_column='IdDocente', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre',  verbose_name = 'NOMBRE',max_length=25, blank=True, null=True)  # Field name made lowercase.
    apellidop = models.CharField(db_column='ApellidoP',  verbose_name = 'APELLIDO PATERNO',max_length=25, blank=True, null=True)  # Field name made lowercase.
    apellidom = models.CharField(db_column='ApellidoM',  verbose_name = 'APELLIDO MATERNO',max_length=25, blank=True, null=True) 
    rfc = models.CharField(db_column='RFC', verbose_name = 'RFC', max_length=25, blank=True, null=True)
    ced = models.CharField(db_column='Cedula', verbose_name = 'CEDULA', max_length=25, blank=True, null=True)
    email = models.EmailField(db_column='Correo Electrónico',  verbose_name = 'EMAIL',max_length=254, unique = True, blank=True, null=True)
    fecha_creacion = models.DateField(db_column='Fecha de creación', auto_now = True, auto_now_add = False) 
    usuario = models.OneToOneField(User, on_delete=models.CASCADE,  verbose_name = 'USUARIO',blank=True, null=True)
    estado = models.BooleanField(default = True, verbose_name = 'Estado')
    
    class Meta:
        verbose_name = 'Facilitador'
        verbose_name_plural = 'Facilitadores'
        ordering = ['apellidop']

    def __str__(self):
        full_name = "%s %s %s" % (self.apellidop or '', self.apellidom or '', self.nombre or '')
        return full_name.strip()

class Materia(models.Model):
    idmateria = models.AutoField(db_column='IdMateria', primary_key=True)  # Field name made lowercase.
    nombremateria = models.CharField(db_column='NombreMateria', max_length=25, blank=True, null=True)  # Field name made lowercase.
    # nivel = models.IntegerField(db_column='Nivel', blank=True, null=True)  # Field name made lowercase.
    
    class Meta:
        verbose_name = 'Cuso'
        verbose_name_plural = 'Cursos'

    def __str__(self):
        return "%s " % (self.nombremateria)

class Modalidad(models.Model):
    idmodalidad = models.AutoField(db_column='IdModalidad', primary_key=True)
    modalidad = models.CharField(db_column='Modalidad', max_length=25, blank=True, null=True)

    class Meta:
        verbose_name = 'Modalidad'
        verbose_name_plural = 'Modalidades'
    
    def __str__(self):
        return "%s" % (self.modalidad)

class Periodo(models.Model):
    idperiodo = models.AutoField(db_column='IdPeriodo', primary_key=True)  # Field name made lowercase.
    periodo = models.CharField(db_column='Periodo', max_length=25, blank=True, null=True)  # Field name made lowercase.
    estado = models.BooleanField(default = True, verbose_name = 'Estado')

    class Meta:
        verbose_name = 'Periodo'
        verbose_name_plural = 'Periodos'
        ordering = ['-idperiodo']

    def __str__(self):
        return " %s" % ( self.periodo)

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    #return 'Estudiante/user_{0}/{1}'.format(instance.usuario, filename)
    return 'Estudiante/user_{0}/{1}'.format( re.sub(r"[^a-zA-Z0-9.]","", str(instance.usuario)), re.sub(r"[^a-zA-Z0-9.]","",str(filename)))
    # return 'Alumnos/user_{0}_{1}/{2}'.format( re.su

class Estudiante(models.Model):
    genero_choices = [('M', 'Masculino'), ('F', 'Femenino'),]

    idestudiante = models.AutoField(db_column='IdEstudiante', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=25, verbose_name = 'NOMBRE',blank=True, null=True)  # Field name made lowercase.
    apellidop = models.CharField(db_column='ApellidoP', max_length=25, blank=True,verbose_name = 'APELLIDO PATERNO', null=True)  # Field name made lowercase.
    apellidom = models.CharField(db_column='ApellidoM', max_length=25, blank=True,verbose_name = 'APELLIDO MATERNO', null=True, default= " ")  # Field name made lowercase.
    nocontrol = models.CharField(db_column='NoControl', max_length=150, verbose_name = 'NO. DE CONTROL',blank=True, null=True)  # Field name made lowercase.
    idcarrera = models.ForeignKey(Carrera, on_delete=models.CASCADE,verbose_name = 'CARRERA', db_column='IdCarrera', blank=False, null=False)  # Field name made lowercase.
    email = models.EmailField(db_column='Correo Electrónico',verbose_name = 'EMAIL', max_length=254, unique = True, blank=True, null=True)
    
    genero = models.CharField(max_length=15,verbose_name = 'GENERO', blank=False, null=False, choices=genero_choices)
    fecha_creacion = models.DateField(db_column='Fecha de creación', auto_now = True, auto_now_add = False) 
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name = 'USUARIO', blank=True, null=True)
    estado = models.BooleanField(default = True, verbose_name = 'Estado')
    cursando = models.BooleanField(default = False, verbose_name = 'Cursando')

    class Meta:
        verbose_name = 'Estudiante'
        verbose_name_plural = 'Estudiantes'

    def __str__(self):
        full_name = "%s %s %s" % (self.apellidop or '', self.apellidom or '', self.nombre or '')
        return full_name.strip()


class Grupo(models.Model):
    GRUPO = [
        ('A', 'A'), ('B', 'B'),('C', 'C'),('D', 'D'),
        ('E', 'E'),('F', 'F'),('G', 'G'),('H', 'H'),
        ('I', 'I'),('J', 'J'),('K', 'K'),('L', 'L'),
    ]
    idgrupo = models.AutoField(db_column='IdGrupo', primary_key=True)  # Field name made lowercase.
    idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo',verbose_name = 'PERIODO')  # Field name made lowercase.
    idmateria = models.ForeignKey(Materia, on_delete=models.CASCADE, db_column='IdMateria',verbose_name = 'MATERIA', blank=True, null=True)  # Field name made lowercase.
    iddocente = models.ForeignKey(Docente, on_delete=models.CASCADE, db_column='IdDocente',verbose_name = 'FACILITADOR', blank=True, null=True)  # Field name made lowercase.
    capacidad = models.IntegerField(db_column='Capacidad',verbose_name = 'CAPACIDAD',default = 25, blank=True, null=True)
    idaula = models.ForeignKey(Aula, on_delete=models.CASCADE, db_column='IdAula',verbose_name = 'AULA', blank=True, null=True)  # Field name made lowercase.
    idmodalidad = models.ForeignKey(Modalidad, on_delete=models.CASCADE, db_column='IdModalidad',verbose_name = 'MODALIDAD', blank=True, null=True)  # Field name made lowercase.
    grupo = models.CharField(db_column='Grupo',verbose_name = 'GRUPO', max_length=5, blank=True, null=True, choices=GRUPO, default ='A')  # Field name made lowercase.
    horario = models.CharField(db_column='Horario',verbose_name = 'HORARIO', max_length=25, blank=True, null=True)  # Field name made lowercase.
    estado = models.BooleanField(default = True, verbose_name = 'Grupo Visible a Estudiates')
    estadoG = models.BooleanField(default = True, verbose_name = 'Grupo Visible en General')

    class Meta:
        verbose_name = 'Grupo'
        verbose_name_plural = 'Grupos'
        ordering = ['-idgrupo']

    def __str__(self):
        return " %s %s %s %s %s %s" % ( self.idperiodo,self.idmateria, self.iddocente, self.idaula, self.idmodalidad, self.horario)

class Pago(models.Model):
    foliopago = models.AutoField(db_column='FolioPago', primary_key=True)  # Field name made lowercase.
    idmateria = models.ForeignKey(Materia, on_delete=models.CASCADE, db_column='IdMateria', verbose_name = 'MATERIA', blank=True, null=True)  # Field name made lowercase.
    idestudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, db_column='IdEstudiante', verbose_name = 'ESTUDIANTE', blank=True, null=True)  # Field name made lowercase.
    idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo', verbose_name = 'PERIODO',blank=True, null=True)  # Field name made lowercase.
    idgrupo = models.ForeignKey(Grupo, on_delete=models.CASCADE, db_column='IdGrupo', verbose_name = 'GRUPO',blank=True, null=True)  # Field name made lowercase.
    fechapago = models.DateField(db_column='FechaPago',verbose_name = 'FECHA DEL PAGO', blank=True, null=True)  # Field name made lowercase.
    #fechasist = models.DateField(db_column='FechaSist', blank=True, null=True)  # Field name made lowercase.
    fechasist = models.DateTimeField(db_column='FechaSist', auto_now=True)
    idestado = models.ForeignKey(Estado, on_delete=models.CASCADE,db_column='idestado', verbose_name = 'ESTADO',default = 1, blank=True, null=True)  # Field name made lowercase.
    descripcion = models.TextField(default = ' ',blank=True, verbose_name = 'DESCRIPCIÓN')
    pagocurso = models.FileField(upload_to=user_directory_path, verbose_name = 'PAGO DEL CURSO',blank=True, null=True)
    # pagomaterial = models.FileField(upload_to=user_directory_path, blank=True, null=True)
    monto = models.CharField(db_column='Monto',verbose_name = 'MONTO', max_length=25, blank=True, null=True)  # Field name made lowercase.
    usuario =  models.CharField(blank=True, db_column='Usuario', verbose_name = 'NO. DE CONTROL', max_length=25, null=True)  # Field name made lowercase.
    # usuario =models.OneToOneField(User, on_delete=models.CASCADE, db_column='Usuario', default=19)
    estado = models.BooleanField(default = True, verbose_name = 'Estado')
    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'
        ordering = ['-foliopago']
    def __str__(self):
        return "%s %s %s" % (self.idmateria,self.idperiodo,self.idestudiante)


class Det_Grupo(models.Model): 
    idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo',verbose_name = 'PERIODO', blank=True, null=True)
    idgrupo = models.ForeignKey( Grupo, on_delete=models.CASCADE, db_column='IdGrupo',verbose_name = 'GRUPO', blank=True, null=True)
    idestudiante = models.ForeignKey(Estudiante , on_delete=models.CASCADE, db_column='IdEstudiante',verbose_name = 'ESTUDIANTE', blank=True, null=True)
    foliopago = models.ForeignKey(Pago, on_delete=models.CASCADE, db_column='FolioPago',verbose_name = 'PAGO DEL ESTUDIANTE', blank=True, null=True)
    calif = models.CharField(db_column='Calif',verbose_name = 'CALIFICACIÓN', max_length=25, blank=True, null=True)
    
    class Meta:
        verbose_name = 'Detalle_Grupo'
        verbose_name_plural = 'Detalles_Grupos'