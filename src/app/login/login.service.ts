import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Models/Login';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://192.168.97.179/CMSIntegration/';
  constructor(private http: HttpClient) { }

  loginUser(data: any): Observable<Login> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}) };
    return this.http.post<Login>(this.url + 'token',
    data, httpOptions);
  }

}
