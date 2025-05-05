import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/auth';

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/login`, data, {headers:headers,withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`,{withCredentials: true});
  }
}
