import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  userId: string = '';
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.api.getProfileInfo().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.username = response.username;
        this.email = response.email;
        this.userId = response._id;
      },
      error: (error) => {
        this.isLoading = false;
        this.userService.showMessage(error.error.message);
        if ((error.status = '403')) {
          this.userService.isLoggedIn = false;
          this.userService.username = null;
          this.router.navigate(['/']);
        }
      },
    });
  }

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}
}
