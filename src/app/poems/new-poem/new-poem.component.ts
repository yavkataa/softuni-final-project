import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.css'],
})
export class NewPoemComponent implements OnInit {
  @ViewChild('newPoemForm') newPoemForm: NgForm | undefined;

  submitHandler(): void {
    if (!this.newPoemForm) return;

    const form = this.newPoemForm;

    if (form.invalid) {
      return;
    }

    if (!localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = false;
      this.api.clearSessionData();
      this.userService.showMessage('Login session expired!');
      this.userService.username = null;
      this.router.navigate(['/']);
    }

    let submitData: { title: string; summary: string; content: string } =
      form.value;

    this.api.storePoem(submitData).subscribe({
      next: (response) => {
        this.router.navigate([`/poems/${response._id}`]);
        this.userService.showMessage('Posted successfully!');
      },
      error: (error) => {
        this.userService.showMessage(error.error.message);
      },
    });
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.userService.isLoggedIn = false;
      this.router.navigate(['/']);
    }
  }
}
