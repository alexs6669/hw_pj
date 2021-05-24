"""TODO_list URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from authapp.views import *
from pjapp.views import *
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register('projects', ProjectModelViewSet)
# router.register('todo', TODOModelViewSet)
# router.register('users', UserModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),

    path('users/list', UserListView.as_view()),
    path('users/<int:pk>/', UserDetailView.as_view()),
    path('users/<int:pk>/update/', UserUpdateView.as_view()),

    path('projects/list/', ProjectListView.as_view()),
    path('projects/create/', ProjectCreateView.as_view()),
    path('projects/<int:pk>/', ProjectDetailView.as_view()),
    path('projects/<int:pk>/update/', ProjectUpdateView.as_view()),
    path('projects/<int:pk>/delete/', ProjectDeleteView.as_view()),

    path('notes/list/', NoteListView.as_view()),
    path('notes/create/', NoteCreateView.as_view()),
    path('notes/<int:pk>/', NoteDetailView.as_view()),
    path('notes/<int:pk>/update/', NoteUpdateView.as_view()),
    path('notes/<int:pk>/delete/', NoteDeleteView.as_view()),

    path('api-auth/', include('rest_framework.urls')),
]
