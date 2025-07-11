# Generated by Django 3.2.9 on 2022-02-09 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingles', '0011_auto_20220208_1021'),
    ]

    operations = [
        migrations.AddField(
            model_name='periodo',
            name='estado',
            field=models.BooleanField(default=True, verbose_name='Estado'),
        ),
        migrations.AlterField(
            model_name='pago',
            name='usuario',
            field=models.CharField(blank=True, db_column='Usuario', editable=False, max_length=25, null=True),
        ),
    ]
