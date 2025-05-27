import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      localStorage.removeItem('authToken'); // Ensure this matches the key used for storing the token
      this.router.navigate(['/']); // Navigate to the login page (root)
      console.log('User logged out.');
    } else {
      console.log('Logout cancelled.');
    }
  }
}