from rest_framework import serializers
from .models import FavoriteBook
from .models import Review

class FavoriteBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteBook
        fields = ['id', 'user', 'book_id']  # Include 'id' for reference
        read_only_fields = ['user']  # User is set automatically

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'book_id', 'rating', 'review']
        read_only_fields = ['user']