# Generated by Django 3.2.5 on 2021-07-20 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_post_like_people'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicalpost',
            name='caption',
        ),
        migrations.RemoveField(
            model_name='post',
            name='caption',
        ),
        migrations.AddField(
            model_name='historicalpost',
            name='post',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='post',
            name='post',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
