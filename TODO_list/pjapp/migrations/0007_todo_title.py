# Generated by Django 3.2.3 on 2021-05-26 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pjapp', '0006_alter_todo_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='title',
            field=models.CharField(default='Заметка <built-in function id>', max_length=64, verbose_name='Заголовок'),
        ),
    ]
