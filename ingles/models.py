from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Aula(models.Model):
    idaula = models.AutoField(db_column='IdAula', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=25, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        verbose_name = 'Aula'
        verbose_name_plural = 'Aulas'

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
    nombre = models.CharField(db_column='Nombre', max_length=25, blank=True, null=True)  # Field name made lowercase.
    apellidop = models.CharField(db_column='ApellidoP', max_length=25, blank=True, null=True)  # Field name made lowercase.
    apellidom = models.CharField(db_column='ApellidoM', max_length=25, blank=True, null=True) 
    estado = models.BooleanField(default = True, verbose_name = 'Estado')

    class Meta:
        verbose_name = 'Docente'
        verbose_name_plural = 'Docentes'

    def __str__(self):
        return "%s %s %s" % (self.nombre, self.apellidop, self.apellidom)

class Materia(models.Model):
    idmateria = models.AutoField(db_column='IdMateria', primary_key=True)  # Field name made lowercase.
    nombremateria = models.CharField(db_column='NombreMateria', max_length=25, blank=True, null=True)  # Field name made lowercase.
    # nivel = models.IntegerField(db_column='Nivel', blank=True, null=True)  # Field name made lowercase.
    
    class Meta:
        verbose_name = 'Materia'
        verbose_name_plural = 'Materias'

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

    def __str__(self):
        return " %s" % ( self.periodo)

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'Estudiante/user_{0}/{1}'.format(instance.usuario, filename)

class Estudiante(models.Model):
    idestudiante = models.AutoField(db_column='IdEstudiante', primary_key=True)  # Field name made lowercase.
    nombre = models.CharField(db_column='Nombre', max_length=25, blank=True, null=True)  # Field name made lowercase.
    apellidop = models.CharField(db_column='ApellidoP', max_length=25, blank=True, null=True)  # Field name made lowercase.
    apellidom = models.CharField(db_column='ApellidoM', max_length=25, blank=True, null=True)  # Field name made lowercase.
    nocontrol = models.IntegerField(db_column='NoControl', blank=True, null=True)  # Field name made lowercase.
    idcarrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, db_column='IdCarrera', blank=True, null=True)  # Field name made lowercase.
    email = models.EmailField(db_column='Correo Electrónico', max_length=254, unique = True, blank=True, null=True)
    fecha_creacion = models.DateField(db_column='Fecha de creación', auto_now = True, auto_now_add = False) 
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    estado = models.BooleanField(default = True, verbose_name = 'Estado')

    class Meta:
        verbose_name = 'Estudiante'
        verbose_name_plural = 'Estudiantes'

    def __str__(self):
        return "%s %s %s %s %s " % (self.nombre, self.apellidop, self.apellidom, self.nocontrol, self.idcarrera)

class Pago(models.Model):
    #idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo')  # Field name made lowercase.
    #idperiodo = models.ForeignKey(Periodo, models.DO_NOTHING, db_column='IdPeriodo', blank=True, null=True)  # Field name made lowercase.
    foliopago = models.AutoField(db_column='FolioPago', primary_key=True)  # Field name made lowercase.
    idmateria = models.ForeignKey(Materia, on_delete=models.CASCADE, db_column='IdMateria', blank=True, null=True)  # Field name made lowercase.
    idestudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, db_column='IdEstudiante', blank=True, null=True)  # Field name made lowercase.
    idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo', blank=True, null=True)  # Field name made lowercase.
    fechapago = models.DateField(db_column='FechaPago', blank=False, null=True)  # Field name made lowercase.
    #fechasist = models.DateField(db_column='FechaSist', blank=True, null=True)  # Field name made lowercase.
    fechasist = models.DateTimeField(db_column='FechaSist', auto_now_add=True)
    idestado = models.ForeignKey(Estado, on_delete=models.CASCADE,db_column='idestado',default = 1, blank=True, null=True)  # Field name made lowercase.
    pagocurso = models.FileField(upload_to=user_directory_path, blank=True, null=True)
    pagomaterial = models.FileField(upload_to=user_directory_path, blank=True, null=True)
    monto = models.DecimalField(db_column='Monto', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    usuario =  models.CharField(blank=True, db_column='Usuario', max_length=25, null=True)  # Field name made lowercase.
    # usuario =models.OneToOneField(User, on_delete=models.CASCADE, db_column='Usuario', default=19)
    estado = models.BooleanField(default = True, verbose_name = 'Estado')
    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'
    def __str__(self):
        return "%s " % (self.idestudiante)

class Grupo(models.Model):
    idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo')  # Field name made lowercase.
    idgrupo = models.AutoField(db_column='IdGrupo', primary_key=True)  # Field name made lowercase.
    idmateria = models.ForeignKey(Materia, on_delete=models.CASCADE, db_column='IdMateria', blank=True, null=True)  # Field name made lowercase.
    iddocente = models.ForeignKey(Docente, on_delete=models.CASCADE, db_column='IdDocente', blank=True, null=True)  # Field name made lowercase.
    idaula = models.ForeignKey(Aula, on_delete=models.CASCADE, db_column='IdAula', blank=True, null=True)  # Field name made lowercase.
    idmodalidad = models.ForeignKey(Modalidad, on_delete=models.CASCADE, db_column='IdModalidad', blank=True, null=True)  # Field name made lowercase.
    horario = models.CharField(db_column='Horario', max_length=25, blank=True, null=True)  # Field name made lowercase.
    estado = models.BooleanField(default = True, verbose_name = 'Estado')
    class Meta:
        verbose_name = 'Grupo'
        verbose_name_plural = 'Grupos'

    def __str__(self):
        return " %s %s %s %s %s" % ( self.idmateria, self.iddocente, self.idaula,self.idmodalidad, self.horario)


class Det_Grupo(models.Model): 
    #idperiodo = models.OneToOneField('Periodo', on_delete=models.CASCADE, db_column='IdPeriodo', primary_key=True)  # Field name made lowercase.
    idperiodo = models.ForeignKey(Periodo, on_delete=models.CASCADE, db_column='IdPeriodo', blank=True, null=True)
    idgrupo = models.ForeignKey('Grupo', on_delete=models.CASCADE, db_column='IdGrupo', blank=True, null=True)  # Field name made lowercase.
    #idestudiante = models.IntegerField(db_column='IdEstudiante')  # Field name made lowercase.
    idestudiante = models.ForeignKey('Estudiante', on_delete=models.CASCADE, db_column='IdEstudiante', blank=True, null=True    )  # Field name made lowercase.
    foliopago = models.ForeignKey('pago', on_delete=models.CASCADE, db_column='FolioPago', blank=True, null=True)  # Field name made lowercase.
    calif = models.IntegerField(db_column='Calif', blank=True, null=True)  # Field name made lowercase.
    

    class Meta:
        verbose_name = 'Detalle_Grupo'
        verbose_name_plural = 'Detalles_Grupos'
