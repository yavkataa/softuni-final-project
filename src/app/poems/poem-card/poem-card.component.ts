import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Poem } from 'src/app/types/poem';

@Component({
  selector: 'app-poem-card',
  templateUrl: './poem-card.component.html',
  styleUrls: ['./poem-card.component.css']
})
export class PoemCardComponent implements OnChanges {

  @Input() data: Poem = {
    title: '',
    summary: '',
    content: '',
    username: '',
    _id: '',
    _ownerId: ''
  };

  ngOnChanges(changes: SimpleChanges): void { 
  }
}
