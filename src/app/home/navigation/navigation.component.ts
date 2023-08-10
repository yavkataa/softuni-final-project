import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    private api: ApiService
  ) {}  

  logout(): void {
    this.userService.isLoggedIn = false;
    this.userService.username = null;
    this.api.clearSessionData();
    console.log('Logout successful!');
    this.router.navigate(['/']);
    this.userService.showMessage('Logged out successfully!');
  }

  clearMessage(): void {
    this.userService.message = null;
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = true;
    }
  }  
}
