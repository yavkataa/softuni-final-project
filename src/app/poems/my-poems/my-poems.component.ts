import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Poem } from 'src/app/types/poem';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-my-poems',
  templateUrl: './my-poems.component.html',
  styleUrls: ['./my-poems.component.css']
})
export class MyPoemsComponent implements OnInit {

  poemsList: Poem[] = [];
  isLoading: boolean = false;

  constructor(private api: ApiService, private userService: UserService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('userId');
    this.fetchMyPoems(user);
  }

  fetchMyPoems(userId: string | null): Poem[] | null {
    if (userId!=null) {
    const user = localStorage.getItem('userId');
    this.isLoading = true;
    this.api.getUserPoems(user).subscribe(
      (response) => {
        this.poemsList = response;
        this.isLoading = false;
      },
       (error) => {        
        this.isLoading = false;
        this.userService.message = error.error.message;
        setTimeout(() => {
          this.userService.message = null;
        }, 3000)
       }
    );
    } else {
      return null;
    }

    return null;

  }
}
