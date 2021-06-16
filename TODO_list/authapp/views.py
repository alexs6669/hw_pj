from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from authapp.models import User
from .serializers import UserModelSerializer, UserModelSerializerV2
from rest_framework.permissions import IsAuthenticated


# class UserLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 3


class UserListViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # pagination_class = UserLimitOffsetPagination
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerV2
        return UserModelSerializer
