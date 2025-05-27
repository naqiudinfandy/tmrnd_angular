import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf, [ngClass]
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Validators added for basic validation
import { HttpClient, HttpClientModule } from '@angular/common/http'; // HttpClientModule added for standalone component setup
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule // Import HttpClientModule for standalone component that uses HttpClient
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required]  
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.http.post<any>(
      'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth',
      { username, password }
    ).subscribe({
      next: (res) => {

        if (res.success && username === 'dummyUser' && password === 'Test@123') {

          localStorage.setItem('authToken', res.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Username or password is incorrect.';
        }
      },
      error: (err) => { 
        console.error('Login API error:', err); 
        this.errorMessage = 'An error occurred during login. Please try again.';

        if (err.status === 401 || err.status === 400) {
           this.errorMessage = 'Invalid username or password.';
        }
      }
    });
  }
}