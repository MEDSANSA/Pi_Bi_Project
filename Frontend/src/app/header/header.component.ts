import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Logout error:', err)
    });
  }

  ngAfterViewInit(): void {
    
  }

}
