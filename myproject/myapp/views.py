from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import FavoriteBook
from .serializers import FavoriteBookSerializer
from rest_framework import viewsets
from .models import Review
from .serializers import ReviewSerializer

class HelloWorldView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response(data={"message": "Hello, world!"}, status=200)

class FavoriteBookViewSet(viewsets.ModelViewSet):
    queryset = FavoriteBook.objects.all()
    serializer_class = FavoriteBookSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Associa o usuário autenticado à review