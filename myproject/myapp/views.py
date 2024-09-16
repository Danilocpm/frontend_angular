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

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Associa o usuário autenticado à review

class FavoriteBookViewSet(viewsets.ModelViewSet):
    queryset = FavoriteBook.objects.all()
    serializer_class = FavoriteBookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
     return FavoriteBook.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Adiciona o usuário autenticado ao livro favorito
        serializer.save(user=self.request.user)

class FavoriteBooksListView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filtra os livros favoritos pelo usuário autenticado
        favorite_books = FavoriteBook.objects.filter(user=request.user)
        serializer = FavoriteBookSerializer(favorite_books, many=True)
        return Response(serializer.data)