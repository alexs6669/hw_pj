from rest_framework.generics import *
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django_filters import rest_framework as filters
from rest_framework.viewsets import ModelViewSet
from pjapp.models import Project, TODO
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
    permission_classes = [IsAuthenticated]


class NoteListViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    # permission_classes = [IsAuthenticated]


class ProjectListView(ListAPIView):
    # renderer_classes = [JSONRenderer]
    # pagination_class = ProjectLimitOffsetPagination
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilterByName


class ProjectCreateView(CreateAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ProjectUpdateView(UpdateAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ProjectDetailView(RetrieveAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class ProjectDeleteView(DestroyAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class NoteListView(ListAPIView):
    # renderer_classes = [JSONRenderer]
    # pagination_class = NoteLimitOffsetPagination
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    filterset_class = NoteFilterByProject
    permission_classes = [AllowAny]


class NoteCreateView(CreateAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer


class NoteUpdateView(UpdateAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer


class NoteDetailView(RetrieveAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer


class NoteDeleteView(DestroyAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer

    def delete(self, request, *args, **kwargs):
        note = self.get_object()
        serializer = TODOModelSerializer(note)
        if note.is_active:
            note.is_active = False
        else:
            note.is_active = True
        note.save()

        return Response(serializer.data)
