# Generated by Django 3.2.3 on 2021-05-19 15:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pjapp', '0002_alter_todo_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='Пользователи'),
        ),
    ]
