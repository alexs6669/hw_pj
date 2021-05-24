from rest_framework.generics import *
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from pjapp.models import Project, TODO
from .serializers import *


class ProjectListView(ListAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


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
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer


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

