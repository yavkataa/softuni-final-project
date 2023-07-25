import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Poem } from '../types/poem';

@Component({
  selector: 'app-poems',
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css']
})
export class PoemsComponent implements OnInit {
  isLoading: boolean = false;
  poems: Poem[] = [];
  
  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getPoems().subscribe((data) => {
      this.poems = data;
      this.isLoading = false;
    });
    
  }
}
