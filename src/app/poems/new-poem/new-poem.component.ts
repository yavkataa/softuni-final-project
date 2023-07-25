import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.css']
})
export class NewPoemComponent {
  @ViewChild('newPoemForm') newPoemForm: NgForm | undefined;

  submitHandler(): void {
    if (!this.newPoemForm) return;

    const form = this.newPoemForm;

    if (form.invalid) {
      return;
    };

    const value: {title: string, summary: string, content: string, author: string} = form.value;
    console.log(value.title);
    console.log(value.summary);
    console.log(value.content);
    console.log(value.author);
  }
}
