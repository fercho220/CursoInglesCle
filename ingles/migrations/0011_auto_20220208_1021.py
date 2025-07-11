# Generated by Django 3.2.9 on 2022-02-08 16:21

from django.db import migrations, models
import django.db.models.deletion
import ingles.models


class Migration(migrations.Migration):

    dependencies = [
        ('ingles', '0010_auto_20220125_1334'),
    ]

    operations = [
        migrations.CreateModel(
            name='Modalidad',
            fields=[
                ('idmodalidad', models.AutoField(db_column='IdModalidad', primary_key=True, serialize=False)),
                ('modalidad', models.CharField(blank=True, db_column='Modalidad', max_length=25, null=True)),
            ],
            options={
                'verbose_name': 'Modalidad',
                'verbose_name_plural': 'Modalidades',
            },
        ),
        migrations.AlterField(
            model_name='estudiante',
            name='pagocurso',
            field=models.FileField(blank=True, null=True, upload_to=ingles.models.user_directory_path),
        ),
        migrations.AlterField(
            model_name='estudiante',
            name='pagomaterial',
            field=models.FileField(blank=True, null=True, upload_to=ingles.models.user_directory_path),
        ),
        migrations.AddField(
            model_name='grupo',
            name='idmodalidad',
            field=models.ForeignKey(blank=True, db_column='IdModalidad', null=True, on_delete=django.db.models.deletion.CASCADE, to='ingles.modalidad'),
        ),
    ]
