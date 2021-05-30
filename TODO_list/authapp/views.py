from rest_framework.generics import *
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer
from authapp.models import User
from .serializers import UserModelSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


# class UserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 3


class UserListView(ListAPIView):
    # renderer_classes = [JSONRenderer]
    # pagination_class = UserLimitOffsetPagination
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [AllowAny]


class UserDetailView(RetrieveAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserUpdateView(UpdateAPIView):
    # renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
