# Generated by Django 3.2.3 on 2021-05-26 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pjapp', '0009_alter_todo_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(default='Заметка', max_length=64, verbose_name='Заголовок'),
        ),
    ]
