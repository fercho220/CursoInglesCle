# Generated by Django 3.2.9 on 2023-08-30 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingles', '0030_auto_20230327_1550'),
    ]

    operations = [
        migrations.AddField(
            model_name='pago',
            name='descripcion',
            field=models.TextField(default=' '),
        ),
        migrations.AlterField(
            model_name='pago',
            name='monto',
            field=models.CharField(db_column='Monto', max_length=25, null=True),
        ),
    ]
