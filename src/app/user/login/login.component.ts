import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../__services/_auth/auth.service';
import { StorageService } from '../__services/_token/storage.service';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showCloseButton: true,
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data: any) => {
        console.log(data);

        // save the user
        this.storageService.saveUser(data.email);
        
        // save the access token
        this.storageService.saveToken(data.accessToken);

        // save the refresh token
        this.storageService.saveRefreshToken(data.refreshToken);

        // flag loggeinFailed to false and loggedin to true
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        // alert message and go back to previous page
        this.alertConfirmation('info', 'Login Success', 'center-end');
        this.goBack();
      },
      (error: any) => {
        this.errorMessage = error;
        this.isLoginFailed = true;
        throw "Error: " + error;
      });
  }
  goBack(): void {
    window.history.go(-1);
  }

  alertConfirmation(p_typ: any, p_msg: any, p_pos: any = null) {
    Swal.fire({
      position: p_pos,
      icon: p_typ,
      title: "Login message",
      text: p_msg,
      toast: true,
      timer: 6000,
      showConfirmButton: false,
      background: "#fbfbfb",
      showCloseButton: true
    });
  }
}
