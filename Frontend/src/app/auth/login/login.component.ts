import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        this.message = res.message;
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userRole', res.role);
          this.router.navigate(['/home']);
      },
      error: (err) => this.message = err.error.detail
    });
  }
}
