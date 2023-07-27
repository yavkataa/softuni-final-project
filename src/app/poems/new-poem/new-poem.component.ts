import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.css'],
})
export class NewPoemComponent {
  @ViewChild('newPoemForm') newPoemForm: NgForm | undefined;

  submitHandler(): void {
    if (!this.newPoemForm) return;

    const form = this.newPoemForm;

    if (form.invalid) {
      return;
    }

    let submitData: { title: string; summary: string; content: string } =
      form.value;

    this.api.storePoem(submitData).subscribe({
      next: (response) => {
        this.router.navigate([`/poems/${response._id}`]);
        this.userService.message = 'Posted successfully!';
        setTimeout(() => {
          this.userService.message = null;
        }, 3000);
      },
      error: (error) => {
        this.userService.message = error.error.message;
        setTimeout(() => {
          this.userService.message = null;
        }, 3000);
      },
    });
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private userService: UserService
  ) {}
}
