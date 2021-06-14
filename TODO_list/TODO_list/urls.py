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
from django.urls import path, include, re_path
from authapp.views import *
from pjapp.views import *
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title='TODO list',
        default_version='0.1',
        description='Документация к проекту',
        contact=openapi.Contact(email='admin@todo.local'),
        license=openapi.License(name='MIT License'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register('users', UserListViewSet, basename='Пользователи')
router.register('projects', ProjectListViewSet, basename='Проекты')
router.register('notes', NoteListViewSet, basename='Заметки')

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),

    path('users/list/', UserListView.as_view(), name='Список пользователей'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='Данные пользователя'),
    path('users/<int:pk>/update/', UserUpdateView.as_view(), name='Обновить данные пользователя'),

    path('projects/list/', ProjectListView.as_view(), name='Список проектов'),
    path('projects/create/', ProjectCreateView.as_view(), name='Создать проект'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='Данные проекта'),
    path('projects/<int:pk>/update/', ProjectUpdateView.as_view(), name='Обновить проект'),
    path('projects/<int:pk>/delete/', ProjectDeleteView.as_view(), name='Удалить проект'),

    path('notes/list/', NoteListView.as_view(), name='Список заметок'),
    path('notes/create/', NoteCreateView.as_view(), name='Создать заметку'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='Заметка'),
    path('notes/<int:pk>/update/', NoteUpdateView.as_view(), name='Обновить заметку'),
    path('notes/<int:pk>/delete/', NoteDeleteView.as_view(), name='Удалить заметку'),
]
