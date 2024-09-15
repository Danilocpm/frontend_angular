import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        localStorage.setItem('access_token', response.access);
        console.log('Logged in successfully');

                // Redirecionar para a rota de busca
                this.router.navigate(['/busca']);
      },
      error: error => {
        console.error('Login failed', error);
      }
    });
  }
}  