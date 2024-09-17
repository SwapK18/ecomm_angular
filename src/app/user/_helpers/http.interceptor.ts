import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageService } from '../__services/_token/storage.service';
import { AuthService } from '../__services/_auth/auth.service';
import { EventBusService } from '../__services/_event/event-bus.service';
import { EventData } from '../__services/_event/event.class';

const TOKEN_KEY = 'auth-token';
const REF_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  public authReq?: any;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isLogIn: boolean | undefined;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let storedUser, storedAccKey;
    this.authReq = req;
    storedUser = this.storageService.getUser();
    storedAccKey = this.storageService.getStorageAccessKey();

    if (storedUser != null && storedAccKey != null) {
      this.authReq = req.clone({
        withCredentials: true,
        headers: req.headers.set('Authorization', `Bearer ${storedAccKey}`),
      });
    }

    return next.handle(this.authReq).pipe(
      catchError((error) => {

        console.log(this.authReq);

        if (
          error instanceof HttpErrorResponse &&
          (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 500)
        ) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap((pToken: any) => {
            console.log(pToken);
            
            this.isRefreshing = false;
            this.storageService.saveToken(pToken.newAccessToken);
            this.refreshTokenSubject.next(pToken.newAccessToken);

            // return next.handle(request);
            return next.handle(this.addTokenHeader(request, pToken.newAccessToken));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.authService.logout();
            this.isLogIn = this.storageService.isLoggedIn();

            window.sessionStorage.removeItem(TOKEN_KEY);
            window.sessionStorage.removeItem(USER_KEY);

            if (error.status == 403 || error.status == 401) {
              this.eventBusService.emit(new EventData('logout', null));
            }
            return throwError(error);
          })
        );
      }
    }

    return next.handle(request);
  }

  private addTokenHeader(pRequest: HttpRequest<any>, pToken: string) {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */
    return pRequest.clone({
      headers: pRequest.headers.set('Authorization', 'Bearer ' + pToken)
    });
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
