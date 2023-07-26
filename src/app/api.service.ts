import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Poem } from "./types/poem"
import { Observable } from 'rxjs';
import { API_STORE_URL, API_URL, LOGIN_STATUS_URL, LOGIN_URL } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPoems(): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${API_URL}/poems`);
  }

  getPoem(id: string): Observable<Poem> {
    return this.http.get<Poem>(`${API_URL}/poems/${id}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${LOGIN_URL}`, {email: email, password: password});
  }

  getUserDetails(token: string) {
    return this.http.get(`${LOGIN_STATUS_URL}`);
  }

  dataSave(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  clearSessionData(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
  }

  storePoem(inputData: {}): Observable<any> {
    let requestData: any = inputData; 
    requestData['_ownerId'] = sessionStorage.getItem('userId');
    console.log(requestData);

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('X-Authorization', '' + sessionStorage.getItem('accessToken'));

      console.log(headers);
    return this.http.post(`${API_URL}/poems`, requestData, {'headers': headers});
  }
}
