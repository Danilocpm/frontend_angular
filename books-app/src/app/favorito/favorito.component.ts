import { Component } from '@angular/core';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
    favorites: any[] = [];

    constructor(private favoriteService: FavoriteService) {}

    addBookToFavorites(bookId: string) {
        this.favoriteService.addFavorite(bookId).subscribe(() => {
            this.loadFavorites();
        });
    }

    loadFavorites() {
        this.favoriteService.getFavorites().subscribe(data => {
            this.favorites = data;
        });
    }
}