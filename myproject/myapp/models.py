from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers

class FavoriteBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book_id = models.CharField(max_length=255)
    tag = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.book_id}"

    class Meta:
        unique_together = ['user', 'book_id']

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Usuário que fez a review
    book_id = models.CharField(max_length=255)  # Identificador do livro
    rating = models.IntegerField()  # Avaliação (1 a 5)
    review = models.TextField()  # Comentário sobre o livro
    created_at = models.DateTimeField(auto_now_add=True)  # Data e hora da criação

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value
    
