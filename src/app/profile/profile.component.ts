import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';

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
        this.userService.message = error.error.message;
        setTimeout(() => {
          this.userService.message = null;
        }, 3000);
      },
    });
  }

  constructor(private api: ApiService, private userService: UserService) {}
}
