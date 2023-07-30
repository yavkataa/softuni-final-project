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

  constructor(private api: ApiService, private userService: UserService, private router: Router) {
      
  }
  
  submitHandler(): void {
    if (!this.registerForm) return;

    const form = this.registerForm;

    if (form.invalid) {
      return;
    }
    
    

    const value: { email: string; username: string, password: string, rePassword: string } = form.value;
    console.log(value.email);
    console.log(value.username);
    console.log(value.password);
    console.log(value.rePassword);

    this.api.registerUser(value.email, value.password, value.username).subscribe({
      next: (response )=> {
        if (response.accessToken) {
          this.api.clearSessionData();
          this.userService.isLoggedIn = true;

          this.api.dataSave('accessToken', response.accessToken);
          this.api.dataSave('userEmail', response.email);
          this.api.dataSave('userId', response._id);
          this.api.dataSave('username', response.username);

          console.log('Registered successfully!');
          this.router.navigate(['/']);
          this.userService.message = 'Registered successfully!';
          setTimeout(() => {
            this.userService.message = null;
          }, 3000);
        }
      }, 
      error: (error) => {
        this.userService.message = error.error.message;
        setTimeout(() => {
          this.userService.message = null;
        }, 3000)
      }
      })
    }
  }

