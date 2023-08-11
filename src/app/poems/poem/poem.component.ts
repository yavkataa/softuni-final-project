import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('editPoemForm') editPoemForm: NgForm | undefined;

  poem: Poem = {
    content: '',
    summary: '',
    title: '',
    _id: '',
    _ownerId: '',
    username: '',
  };

  isLoading = false;
  loggedInUser: string | null = '';
  editingPoem: boolean = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchPoem();
    this.loggedInUser = localStorage.getItem('userId');
    this.editingPoem = false;
  }

  fetchPoem(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.apiService.getPoem(id).subscribe({
      next: (response) => {
        this.poem = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);
      },
    });
  }

  deletePoem(): void {
    if (!localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = false;
      this.userService.showMessage('Login session expired!');
      this.userService.username = null;
      this.router.navigate(['/']);
    }

    const id = this.activatedRoute.snapshot.params['id'];

    this.apiService.deletePoem(id).subscribe({
      next: (response) => {
        this.userService.showMessage('Poem deleted successfully!');
        this.router.navigate(['poems/my-poems']);
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);
      },
    });
  }

  toggleEditing(): void {
    if (!localStorage.getItem('accessToken')) {
      this.userService.showMessage('Login session expired!');
      this.userService.isLoggedIn = false;
      this.userService.username = null;
      this.router.navigate(['/']);
    }

    if (!this.editingPoem) {
      this.editingPoem = true;
    } else if (this.editingPoem) {
      this.editingPoem = false;
    }

    setTimeout(() => {
      if (this.editingPoem) {
        this.editPoemForm?.controls['title'].setValue(this.poem.title);
        this.editPoemForm?.controls['summary'].setValue(this.poem.summary);
        this.editPoemForm?.controls['content'].setValue(this.poem.content);
      }
    }, 100);
  }

  saveChanges(): void {
    if (!this.editPoemForm) return;

    const form = this.editPoemForm;

    if (form.invalid) {
      return;
    }

    let submitData: { title: string; summary: string; content: string } =
      form.value;

    this.apiService.updatePoem(this.poem._id, submitData).subscribe({
      next: (response) => {
        this.userService.showMessage('Changes saved successfully!');
        this.router.navigate([`poems/my-poems/`]);
        this.toggleEditing();
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);
      },
    });
  }
}
