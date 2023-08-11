import { Component, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm | undefined;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  submitHandler(): void {
    if (!this.registerForm) return;

    const form = this.registerForm;

    if (form.invalid) {
      return;
    }

    if (form.value.password !== form.value.rePassword) {
      this.userService.showMessage("The passwords don't match!");
      return;
    }

    const value: {
      email: string;
      username: string;
      password: string;
      rePassword: string;
    } = form.value;

    this.api
      .registerUser(value.email, value.password, value.username)
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            this.api.clearSessionData();
            this.userService.isLoggedIn = true;

            this.api.dataSave('accessToken', response.accessToken);
            this.api.dataSave('userEmail', response.email);
            this.api.dataSave('userId', response._id);
            this.api.dataSave('username', response.username);

            console.log('Registered successfully!');
            this.router.navigate(['/']);
            this.userService.showMessage('Registered successfully!');
          }
        },
        error: (error) => {
          this.userService.showMessage(error.error.message);
        },
      });
  }
}
