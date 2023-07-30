import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Poem } from 'src/app/types/poem';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.css'],
})

export class PoemComponent implements OnInit {
  poem: Poem = { content: '',
    summary: '',
    title: '',
    _id: '',
    _ownerId: '',
    username: '',
  };
  isLoading = false;
  loggedInUser: string | null = '';

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchPoem();
    this.loggedInUser = localStorage.getItem('userId')
  }

  fetchPoem() {
    const id = this.activatedRoute.snapshot.params['id'];    

    this.apiService.getPoem(id).subscribe({
      next: (response) => {         
        this.poem = response;
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

  gotoEdit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.router.navigate([`/poems/edit-poem/${id}`]);
  }

  deletePoem():void {
    const id = this.activatedRoute.snapshot.params['id'];
    
    this.apiService.deletePoem(id).subscribe({
      next: (response) => {
        this.userService.message = 'Poem deleted successfully!';
        this.router.navigate(['poems/my-poems']);
        setTimeout(() => {
          this.userService.message = null;
        },3000)
      }, 
      error: (error) => {
        this.userService.message = error.error.message;
        setTimeout(() => {
          this.userService.message = null;
        },3000)
      }
    })
  }
}
