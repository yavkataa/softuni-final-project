import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  submitHandler(): void {
    if (!this.loginForm) return;

    const form = this.loginForm;

    if (form.invalid) {
      return;
    }

    const value: { email: string; password: string } = form.value;

    this.api.login(value.email, value.password).subscribe({
      next: (response) => {
        if (response.accessToken) {
          this.api.clearSessionData();
          this.userService.isLoggedIn = true;

          this.api.dataSave('accessToken', response.accessToken);
          this.api.dataSave('userEmail', response.email);
          this.api.dataSave('userId', response._id);
          this.api.dataSave('username', response.username);

          console.log('Login successful!');
          this.router.navigate(['/']);
          this.userService.message = 'Logged in successfully!';
          setTimeout(() => {
            this.userService.message = null;
          }, 3000);
        }
      },
      error: (error) => {
        this.userService.message = error.error.message;
        setTimeout(() => {
          this.userService.message = null;
        }, 3000);
      },
    });
  }
}
