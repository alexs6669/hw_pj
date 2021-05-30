from rest_framework.generics import *
from rest_framework.renderers import JSONRenderer
from authapp.models import User
from .serializers import UserModelSerializer


class UserListView(ListAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserDetailView(RetrieveAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserUpdateView(UpdateAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
