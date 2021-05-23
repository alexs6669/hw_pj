from django.db import models
from authapp.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='Название проекта', max_length=32, unique=True)
    repo_link = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(User, verbose_name='Пользователи')


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='Название проекта')
    text = models.TextField(verbose_name='Текст заметки', max_length=512, blank=True)
    created = models.DateTimeField(verbose_name='Создана', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='Изменена', auto_now=True)
    user = models.ForeignKey(User, models.CASCADE, verbose_name='Пользователи')
    is_active = models.BooleanField(verbose_name='Активна', default=True)
