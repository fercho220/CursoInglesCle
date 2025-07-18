# Generated by Django 3.2.9 on 2023-03-27 21:50

from django.db import migrations, models
import django.db.models.deletion
import ingles.models


class Migration(migrations.Migration):

    dependencies = [
        ('ingles', '0029_auto_20230315_1009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='det_grupo',
            name='calif',
            field=models.CharField(blank=True, db_column='Calif', max_length=25, null=True, verbose_name='CALIFICACIÓN'),
        ),
        migrations.AlterField(
            model_name='det_grupo',
            name='foliopago',
            field=models.ForeignKey(blank=True, db_column='FolioPago', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.pago', verbose_name='PAGO DEL ESTUDIANTE'),
        ),
        migrations.AlterField(
            model_name='det_grupo',
            name='idestudiante',
            field=models.ForeignKey(blank=True, db_column='IdEstudiante', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.estudiante', verbose_name='ESTUDIANTE'),
        ),
        migrations.AlterField(
            model_name='det_grupo',
            name='idgrupo',
            field=models.ForeignKey(blank=True, db_column='IdGrupo', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.grupo', verbose_name='GRUPO'),
        ),
        migrations.AlterField(
            model_name='det_grupo',
            name='idperiodo',
            field=models.ForeignKey(blank=True, db_column='IdPeriodo', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.periodo', verbose_name='PERIODO'),
        ),
        migrations.AlterField(
            model_name='estudiante',
            name='genero',
            field=models.CharField(blank=True, choices=[('M', 'Masculino'), ('F', 'Femenino')], max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='capacidad',
            field=models.IntegerField(blank=True, db_column='Capacidad', default=25, null=True, verbose_name='CAPACIDAD'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='estado',
            field=models.BooleanField(default=True, verbose_name='Grupo Visible a Estudiates'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='estadoG',
            field=models.BooleanField(default=True, verbose_name='Grupo Visible en General'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='grupo',
            field=models.CharField(blank=True, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E'), ('F', 'F'), ('G', 'G'), ('H', 'H'), ('I', 'I'), ('J', 'J'), ('K', 'K'), ('L', 'L')], db_column='Grupo', default='A', max_length=5, null=True, verbose_name='GRUPO'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='horario',
            field=models.CharField(blank=True, db_column='Horario', max_length=25, null=True, verbose_name='HORARIO'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='idaula',
            field=models.ForeignKey(blank=True, db_column='IdAula', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.aula', verbose_name='AULA'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='iddocente',
            field=models.ForeignKey(blank=True, db_column='IdDocente', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.docente', verbose_name='FACILITADOR'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='idmateria',
            field=models.ForeignKey(blank=True, db_column='IdMateria', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.materia', verbose_name='MATERIA'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='idmodalidad',
            field=models.ForeignKey(blank=True, db_column='IdModalidad', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.modalidad', verbose_name='MODALIDAD'),
        ),
        migrations.AlterField(
            model_name='grupo',
            name='idperiodo',
            field=models.ForeignKey(db_column='IdPeriodo', on_delete=django.db.models.deletion.CASCADE, to='ingles.periodo', verbose_name='PERIODO'),
        ),
        migrations.AlterField(
            model_name='pago',
            name='pagocurso',
            field=models.FileField(null=True, upload_to=ingles.models.user_directory_path),
        ),
    ]
