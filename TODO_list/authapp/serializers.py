from rest_framework.serializers import HyperlinkedModelSerializer
from authapp.models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', )
