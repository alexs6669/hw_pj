from rest_framework.generics import *
from rest_framework.renderers import JSONRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 1
#
#
# class NoteLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 2


class ProjectFilterByName(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class NoteFilterByProject(filters.FilterSet):
    project = filters.CharFilter(field_name='project_id')

    class Meta:
        model = TODO
        fields = ['project']


class ProjectListViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilterByName
    permission_classes = [IsAuthenticated]

    # pagination_class = ProjectLimitOffsetPagination


class NoteListViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    filterset_class = NoteFilterByProject
    permission_classes = [IsAuthenticated]

    # pagination_class = NoteLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        note = self.get_object()
        serializer = TODOModelSerializer(note)
        if note.is_active:
            note.is_active = False
        else:
            note.is_active = True
        note.save()

        return Response(serializer.data)
