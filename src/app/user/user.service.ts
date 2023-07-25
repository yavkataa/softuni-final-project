import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  constructor(private http: HttpClient) {     
  }

  ngOnInit(): void {
  }    
}
