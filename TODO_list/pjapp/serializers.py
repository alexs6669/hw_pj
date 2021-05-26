from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, SlugRelatedField
from pjapp.models import Project, TODO
from authapp.models import User


class ProjectModelSerializer(ModelSerializer):
    users = SlugRelatedField(many=True, read_only=True, slug_field='username')

    class Meta:
        model = Project
        fields = ('name', 'repo_link', 'users',)


class TODOModelSerializer(ModelSerializer):
    user = SlugRelatedField(read_only=True, slug_field='username')
    project = SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = TODO
        fields = ('project', 'title', 'text', 'user', 'created', 'updated', 'is_active',)
