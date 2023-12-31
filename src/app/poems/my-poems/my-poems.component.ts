import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Poem } from 'src/app/types/poem';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-poems',
  templateUrl: './my-poems.component.html',
  styleUrls: ['./my-poems.component.css'],
})
export class MyPoemsComponent implements OnInit {
  poemsList: Poem[] = [];
  isLoading: boolean = false;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = false;
      this.api.clearSessionData();
      this.userService.username = null;
      this.router.navigate(['/']);
    }
    const user = localStorage.getItem('userId');
    this.fetchMyPoems(user);
  }

  fetchMyPoems(userId: string | null): Poem[] | null {
    if (userId != null) {
      this.isLoading = true;
      this.api.getUserPoems(userId).subscribe({
        next: (response) => {
          this.poemsList = response;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.userService.showMessage(error.error.message);
        },
      });
    }
    return null;
  }
}
