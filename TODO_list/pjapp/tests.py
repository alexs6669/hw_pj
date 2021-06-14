from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from authapp.models import User
from pjapp.models import Project


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
