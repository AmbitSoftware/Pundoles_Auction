import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable()
export class UserService {
  test = null;
  constructor(private http: HttpClient) { }
  url = 'http://192.168.97.179/CMSIntegration/';
  httpOptions = { headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    } ) };
  getusers() {
    return this.http.get(`${this.url}/api/User/GetUsers`, this.httpOptions);
        }

        // getDetails(userId: number): Observable<User> {
        //   return this.http.get<User>(this.url + '/api/User/ViewUser/?user_id=' + userId);
        //   this.test ="";
        // }

        updateUser(ObjUser: User): Observable<User> {
          return this.http.post<User>(this.url + 'api/User/UpdateUser/',
          ObjUser, this.httpOptions);
        }
        createUser(data): Observable<User> {
          return this.http.post<User>(this.url + 'api/User/CreateUser',
          data, this.httpOptions);
        }

        getUserById(userId: number): Observable<User> {
          return this.http.get<User>(this.url + 'api/User/ViewUser/?user_id=' + userId,this.httpOptions);
        }

        
}