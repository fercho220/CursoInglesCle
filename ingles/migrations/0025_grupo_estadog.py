# Generated by Django 3.2.9 on 2023-01-13 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingles', '0024_auto_20230113_1548'),
    ]

    operations = [
        migrations.AddField(
            model_name='grupo',
            name='estadoG',
            field=models.BooleanField(default=True, verbose_name='EstadoG'),
        ),
    ]
