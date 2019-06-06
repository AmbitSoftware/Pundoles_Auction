import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from './Table';
import { Observable } from 'rxjs';
import { Dropdown } from '../Models/Dropdown';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) { }
  //url = 'http://localhost:4000';
  //url = 'http://localhost:49610';
  //url = 'http://192.168.100.36';
  url = 'http://192.168.97.179/CMSIntegration/';
  httpOptions = { headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    } ) };
  getClient() {
    return this
            .http
            .get(`${this.url}/api/contact/GetContacts`);
            //.get(`${this.url}/api/contact//PullContactsFromWeb`);
        }
        createClient(client: Table): Observable<Table> {
          const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
          return this.http.post<Table>(this.url + '/api/contact/CreateContact/',
          client, httpOptions);
        }
        updateClient(client: Table): Observable<Table> {
          const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
          return this.http.post<Table>(this.url + '/api/Contact/UpdateContact/',
          client, httpOptions);
        }

        getClientById(clientId: number): Observable<Table> {
          return this.http.get<Table>(this.url + '/api/contact/ViewContact/?contact_id=' + clientId);
        }

        getAllDropdowns()  {  
          return this
            .http
            .get(`${this.url}/api/SyncMasters/GetDropdownMasterData`);
            //.get(`${this.url}/api/contact/PullDropdowns`);

        } 
        getusers() {
          return this.http.get(`${this.url}/api/User/GetUsers`, this.httpOptions);
              }

        
}