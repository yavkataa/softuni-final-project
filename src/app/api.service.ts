import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Poem } from "./types/poem"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  poems: Poem[] = [];

  constructor(private http: HttpClient) { }

  getPoems(): Observable<Poem[]> {
    return this.http.get<Poem[]>('http://localhost:3030/data/poems');    
}}
