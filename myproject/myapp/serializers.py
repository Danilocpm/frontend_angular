from rest_framework import serializers
from .models import FavoriteBook

class FavoriteBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteBook
        fields = ['id', 'user', 'book_id']  # Include 'id' for reference
        read_only_fields = ['user']  # User is set automatically