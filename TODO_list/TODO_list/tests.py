import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from authapp.views import UserListViewSet
from authapp.models import User
from pjapp.views import NoteListViewSet
from pjapp.models import TODO, Project


class TestUserListViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.list_view = UserListViewSet.as_view({'get': 'list'})
        self.create_view = UserListViewSet.as_view({'post': 'create'})
        self.request = self.factory.get('api/users/')
        self.admin = User.objects.create_superuser('admin', 'admin@admin.local', '123')
        self.user = mixer.blend(User)

    def test_get_list(self):
        response = self.list_view(self.request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_admin(self):
        force_authenticate(self.request, self.admin)
        response = self.list_view(self.request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        request = self.factory.post('api/users/', {'username': 'dev_3', 'first_name': 'Сергей', 'last_name': 'Сергеев',
                                                   'email': 'sergey@sergey.local'})
        response = self.create_view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        request = self.factory.post('api/users/', {'username': 'dev_3', 'first_name': 'Сергей', 'last_name': 'Сергеев',
                                                   'email': 'sergey@sergey.local'})
        force_authenticate(request, self.admin)
        response = self.create_view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        self.client.login(username='admin', password='123')
        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_edit_guest(self):
        response = self.client.put(f'/api/users/{self.user.id}/', {'username': 'test_edited'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestProjectViewSet(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser('admin', 'admin@admin.local', '123')
        self.user = mixer.blend(User, username='test_user')
        self.project = mixer.blend(Project)
        self.response = self.client.get('/api/notes/')

    def test_get_list(self):
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        self.client.login(username='admin', password='123')
        response = self.client.put(f'/api/projects/{self.project.id}/', {'name': 'test_pj'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
