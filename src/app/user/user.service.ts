import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  accessToken: string | null = null;
  userId: string | null = null;
  userEmail: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private api: ApiService) {     
  }

  ngOnInit(): void {    
  }

  
}
