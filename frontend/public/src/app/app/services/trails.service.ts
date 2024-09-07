import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../model/user';
import { Token } from '../../model/token';

type TrailResponse = {
  status: number;
  message: string;
}

type Trail = {
  country: string,
  state: string,
  city: string,
  distance: string,
  name: string,
  difficulty: string,
  imageUrl: string
}

@Injectable({
  providedIn: 'root'
})


export class TrailsService {

  _baseUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  getAllTrails(offset: number, count: number, search: string): Observable<Trail[]> {
    return this._httpClient.get<Trail[]>(`${this._baseUrl}/trails?offset=${offset}&count=${count}&search=${search}`);
  }

  getTrail(id: string): Observable<Trail> {
    return this._httpClient.get<Trail>(`${this._baseUrl}/trails/${id}`);
  }

  getSubTrail(id: string, subDocId: string): Observable<any> {
    return this._httpClient.get<Trail>(`${this._baseUrl}/trails/${id}/trail/${subDocId}`);
  }

  deleteTrail(id: string, subDocId: string): Observable<Trail[]> {
    return this._httpClient.delete<Trail[]>(`${this._baseUrl}/trails/${id}/trail/${subDocId}`);
  }

  editTrail(data: Trail): Observable<Trail> {
    return this._httpClient.put<Trail>(`${this._baseUrl}/trails/`, data);
  }


  updateTrail(id: string, subDocId: string, data: Trail): Observable<Trail> {
    return this._httpClient.put<Trail>(`${this._baseUrl}/trails/${id}/trail/${subDocId}`, data);
  }

  getTrailsCount(): Observable<number> {
    return this._httpClient.get<number>(`${this._baseUrl}/trails/total`);
  }

  getFilterTrails(search: string): Observable<Trail[]> {
    return this._httpClient.get<Trail[]>(`${this._baseUrl}/trails?search=` + search);
  }


  addTrail(data: TrailResponse): Observable<TrailResponse> {
    return this._httpClient.post<TrailResponse>(`${this._baseUrl}/trails`, data);
  }

  register(data: User): Observable<User> {
    return this._httpClient.post<User>(`${this._baseUrl}/users/register`, data.jsonify());
  }

  login(data: User): Observable<Token> {
    return this._httpClient.post<Token>(`${this._baseUrl}/users/login`, data.jsonify());
  }
}
