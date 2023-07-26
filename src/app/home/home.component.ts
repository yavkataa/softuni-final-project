import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = true;
    }
  }
}
