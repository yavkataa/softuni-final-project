import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  accessToken: string | null = null;
  userId: string | null = null;
  userEmail: string | null = null;
  isLoggedIn: boolean = false;
  message: string | null = null;

  constructor(private api: ApiService) {     
  }  
}
