from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import *
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from authapp.models import User
from .serializers import UserModelSerializer, UserModelSerializerV2
from rest_framework.permissions import IsAuthenticated, AllowAny


# class UserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 3


class UserListViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerV2
        return UserModelSerializer


class UserListView(ListAPIView):
    # renderer_classes = [JSONRenderer]
    # pagination_class = UserLimitOffsetPagination
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
