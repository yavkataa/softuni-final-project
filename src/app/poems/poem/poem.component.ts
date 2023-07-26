import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Poem } from 'src/app/types/poem';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.css']
})
export class PoemComponent implements OnInit {
  poem: Poem | undefined;
  isLoading = false;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchPoem();    
    };

  fetchPoem() {
    const id = this.activatedRoute.snapshot.params['id'];    
    this.apiService.getPoem(id).subscribe((poem) => {
      this.poem = poem;
      this.isLoading = false;
    })
  }
}
