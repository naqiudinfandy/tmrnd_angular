import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomepageComponent, DetailComponent, LoginComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assessment';
}
