import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(public userService: UserService, private router: Router, private api: ApiService) {}

  logout():void {
    this.userService.accessToken = null;
        this.userService.userEmail = null;
        this.userService.userId = null;
        this.userService.isLoggedIn = false;
        this.api.clearSessionData();
        console.log('Logout successful!');
        this.router.navigate(['/']);
        this.userService.message='Logged out successfully!';
        setTimeout(() => {
          this.userService.message = null;
        }, 3000)
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
