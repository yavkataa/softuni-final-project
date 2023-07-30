import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  message: string | null = null;
  username: string | null = null;

  constructor(private api: ApiService) {}
}
