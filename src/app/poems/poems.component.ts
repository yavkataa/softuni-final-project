import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Poem } from '../types/poem';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css'],
})
export class PoemsComponent implements OnInit {
  isLoading: boolean = false;
  poems: Poem[] = [];

  constructor(private api: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getPoems().subscribe({
      next: (response) => {
        this.poems = response;
        this.isLoading = false;
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
