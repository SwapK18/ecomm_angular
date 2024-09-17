import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REF_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveToken(pToken: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, pToken);
  }

  public saveRefreshToken(pRefToken: string): void {
    window.sessionStorage.removeItem(REF_TOKEN_KEY);
    window.sessionStorage.setItem(REF_TOKEN_KEY, pRefToken);
  }

  public saveUser(pEmail: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(pEmail));
  }

  public getStorageAccessKey(): any {
    let usr, accKey;
    usr = window.sessionStorage.getItem(USER_KEY);
    accKey = window.sessionStorage.getItem(TOKEN_KEY);
    if (usr && accKey) {
      return accKey;
    }

    return null;
  }

  public getStorageRefreshKey(): any {
    let usr, refKey;
    usr = window.sessionStorage.getItem(USER_KEY);
    refKey = window.sessionStorage.getItem(REF_TOKEN_KEY);
    if (usr && refKey) {
      return refKey;
    }

    return null;
  }

  public getUser(): any {
    let usr, accKey;
    usr = window.sessionStorage.getItem(USER_KEY);
    accKey = window.sessionStorage.getItem(TOKEN_KEY);
    if (usr && accKey) {
      return usr;
    }

    return null;
  }

  public isLoggedIn(): boolean {
    let usr = window.sessionStorage.getItem(TOKEN_KEY);
    if (usr) {
      return true;
    }
    return false;
  }
}
