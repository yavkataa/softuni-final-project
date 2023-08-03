import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Poem } from './types/poem';
import { Observable } from 'rxjs';
import {
  API_STORE_URL,
  API_URL,
  LOGIN_STATUS_URL,
  LOGIN_URL,
  REGISTER_URL,
} from './app-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPoems(): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${API_URL}/poems`);
  }

  getUserPoems(id: string | null): Observable<Poem[]> {
    return this.http.get<Poem[]>(
      `${API_URL}/poems?where=_ownerId%3D%22${id}%22`
    );
  }

  getPoem(id: string): Observable<Poem> {
    return this.http.get<Poem>(`${API_URL}/poems/${id}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${LOGIN_URL}`, { email: email, password: password });
  }
  dataSave(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  clearSessionData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('');
  }

  getProfileInfo(): Observable<any> {
    const headers = new HttpHeaders().set(
      'X-Authorization',
      '' + localStorage.getItem('accessToken')
    );
    return this.http.get(`${LOGIN_STATUS_URL}`, { headers: headers });
  }

  storePoem(inputData: {}): Observable<any> {
    let requestData: any = inputData;
    requestData['_ownerId'] = localStorage.getItem('userId');
    requestData['username'] = localStorage.getItem('username');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Authorization', '' + localStorage.getItem('accessToken'));

    return this.http.post(`${API_URL}/poems`, requestData, {
      headers: headers,
    });
  }

  registerUser(
    email: string,
    password: string,
    username: string
  ): Observable<any> {
    return this.http.post(`${REGISTER_URL}`, {
      email: email,
      password: password,
      username: username,
    });
  }

  deletePoem(id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Authorization', '' + localStorage.getItem('accessToken'));

    return this.http.delete(`${API_URL}/poems/${id}`, {
      headers: headers,
    });
  }

  updatePoem(id: string, inputData: {}): Observable<any> {
    let requestData: any = inputData;
    requestData['_ownerId'] = localStorage.getItem('userId');
    requestData['username'] = localStorage.getItem('username');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Authorization', '' + localStorage.getItem('accessToken'));

    return this.http.put(`${API_STORE_URL}/poems/${id}`, requestData, {
      headers: headers,
    });
  }
}
