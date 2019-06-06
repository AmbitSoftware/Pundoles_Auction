import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ArtistService {
  constructor(private http: HttpClient) { }
  url = 'http://192.168.97.179/CMSIntegration/';
  httpOptions = { headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Authorization':'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    } ) };
  getartists() {
    return this.http.get(`${this.url}/api/Artist/GetArtists`, this.httpOptions);
        }
  createArtist(Data) {
      return this.http.post(this.url + '/api/Artist/CreateArtist/',
      Data, this.httpOptions);
  }

  updateArtist(Data) {
    return this.http.post(this.url + '/api/Artist/UpdateArtist/',
    Data, this.httpOptions);
}
}