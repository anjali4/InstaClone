# Generated by Django 3.2.5 on 2021-07-20 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_auto_20210720_1339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postimage',
            name='image',
            field=models.ImageField(upload_to='user_photoes/'),
        ),
    ]
