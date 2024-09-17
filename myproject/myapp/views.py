from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import FavoriteBook
from .serializers import FavoriteBookSerializer
from rest_framework import viewsets, status
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class HelloWorldView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return Response(data={"message": "Hello, world!"}, status=200)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['rating']

    @action(detail=False, methods=['get'])
    def list_by_rating(self, request):
        """List reviews ordered by rating."""
        order = request.query_params.get('order', 'asc')
        if order == 'desc':
            reviews = Review.objects.all().order_by('-rating')
        else:
            reviews = Review.objects.all().order_by('rating')
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def edit_review(self, request, pk=None):
        """Edit a review if the user is the owner and the book_id matches."""
        review = get_object_or_404(Review, pk=pk, user=request.user)

        # Ensure the book_id matches if provided
        book_id = request.data.get('book_id', None)
        if book_id and review.book_id != book_id:
            return Response(
                {"detail": "Book ID does not match the review."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_review(self, request, pk=None):
        """Delete a review if the user is the owner."""
        review = get_object_or_404(Review, pk=pk, user=request.user)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
    
    @action(detail=True, methods=['delete'], url_path='delete-favorite')
    def delete_favorite_book(self, request, pk=None):
        # Obtém o usuário da sessão
        user = request.user

        # Tenta obter o objeto FavoriteBook correspondente
        favorite_book = get_object_or_404(FavoriteBook, user=user, book_id=pk)

        # Deleta o objeto
        favorite_book.delete()

        # Retorna uma resposta de sucesso
        return Response(status=status.HTTP_204_NO_CONTENT)

class FavoriteBooksListView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filtra os livros favoritos pelo usuário autenticado
        favorite_books = FavoriteBook.objects.filter(user=request.user)
        serializer = FavoriteBookSerializer(favorite_books, many=True)
        return Response(serializer.data)
