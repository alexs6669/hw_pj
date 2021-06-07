from rest_framework.serializers import ModelSerializer, SlugRelatedField
from pjapp.models import Project, TODO
from authapp.models import User


class ProjectModelSerializer(ModelSerializer):
    users = SlugRelatedField(many=True, queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = Project
        fields = ('id', 'name', 'repo_link', 'users',)


class TODOModelSerializer(ModelSerializer):
    user = SlugRelatedField(slug_field='username', queryset=User.objects.all())
    project = SlugRelatedField(slug_field='name', queryset=Project.objects.all())

    class Meta:
        model = TODO
        fields = ('id', 'project', 'title', 'text', 'user', 'created', 'updated', 'is_active',)
