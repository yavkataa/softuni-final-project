import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Poem } from "./types/poem"
import { Observable } from 'rxjs';
import { API_URL } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  poems: Poem[] = [];

  constructor(private http: HttpClient) { }

  getPoems(): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${API_URL}/poems`);
  }

  getPoem(id: string): Observable<Poem> {
    return this.http.get<Poem>(`${API_URL}/poems/${id}`);
  }
}
