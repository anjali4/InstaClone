# Generated by Django 3.2.5 on 2021-07-29 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0014_auto_20210729_1954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalpost',
            name='caption',
            field=models.TextField(blank=True, max_length=250),
        ),
        migrations.AlterField(
            model_name='post',
            name='caption',
            field=models.TextField(blank=True, max_length=250),
        ),
    ]
