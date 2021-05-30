from django.contrib import admin
from authapp.models import User
from pjapp.models import Project, TODO

admin.site.register(User)
admin.site.register(Project)
admin.site.register(TODO)