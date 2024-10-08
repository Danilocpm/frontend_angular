from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FavoriteBookViewSet, FavoriteBooksListView
from .views import HelloWorldView
from .views import ReviewViewSet


router = DefaultRouter()
router.register(r'favorites', FavoriteBookViewSet, FavoriteBooksListView)
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('api/', include(router.urls)),  # Include the router URLs under the 'api/' path
]