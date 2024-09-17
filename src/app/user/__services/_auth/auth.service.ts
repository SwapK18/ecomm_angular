import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_token/storage.service';

const AUTH_API = 'http://localhost:9000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageServ: StorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'api/user/login', { email, password }, httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'api/user/register', { email, password }, httpOptions);
  }

  isLoggedIn(): boolean {
    let authToken = null, authUser = null;
    authToken = window.sessionStorage.getItem('auth-token');
    authUser = window.sessionStorage.getItem('auth-user');

    if (authToken || authUser) {
      return true;
    } else {
      return false;
    }
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'api/user/logout', {}, httpOptions);
  }

  /* refreshToken(): Observable<any> {
    let refToken = null;
    let userEmail = null;
  
    refToken = this.storageServ.getStorageRefreshKey();
    userEmail = this.storageServ.getUser();
  
    return this.http.get(AUTH_API+ 'api/refreshToken?email=' + userEmail, httpOptions);
  } */

  refreshToken(): Observable<any> {
    let refToken = this.storageServ.getStorageRefreshKey();
    let userEmail = this.storageServ.getUser();

    const params = new HttpParams().set('email', userEmail);

    return this.http.get(AUTH_API + 'api/refresh/' + userEmail, httpOptions);
  }

}

