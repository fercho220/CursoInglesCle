# Generated by Django 3.2.9 on 2021-12-03 02:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ingles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grupo',
            fields=[
                ('idgrupo', models.IntegerField(db_column='IdGrupo', primary_key=True, serialize=False)),
                ('horario', models.CharField(blank=True, db_column='Horario', max_length=25, null=True)),
                ('idaula', models.ForeignKey(blank=True, db_column='IdAula', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.aula')),
                ('iddocente', models.ForeignKey(blank=True, db_column='IdDocente', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.docente')),
                ('idmateria', models.ForeignKey(blank=True, db_column='IdMateria', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.materia')),
                ('idperiodo', models.ForeignKey(db_column='IdPeriodo', on_delete=django.db.models.deletion.CASCADE, to='ingles.periodo')),
            ],
        ),
        migrations.CreateModel(
            name='Det_Grupo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calif', models.IntegerField(blank=True, db_column='Calif', null=True)),
                ('foliopago', models.ForeignKey(blank=True, db_column='FolioPago', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.pago')),
                ('idestudiante', models.ForeignKey(db_column='IdEstudiante', on_delete=django.db.models.deletion.CASCADE, to='ingles.estudiante')),
                ('idgrupo', models.ForeignKey(db_column='IdGrupo', on_delete=django.db.models.deletion.CASCADE, to='ingles.grupo')),
                ('idperiodo', models.ForeignKey(db_column='IdPeriodo', on_delete=django.db.models.deletion.CASCADE, to='ingles.periodo')),
            ],
        ),
    ]
