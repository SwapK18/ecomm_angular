import { Component, OnInit } from '@angular/core';
import { ApplyCssJsService } from '../__services/_cssJs/apply-css-js.service';
import { CommonService } from '../__services/_common/common.service';
import { catchError, retry, tap, throwError } from 'rxjs';
import { StorageService } from '../__services/_token/storage.service';
import { AuthService } from '../__services/_auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allPageSettings: any;
  allSocialDetails: Array<any> = [];
  contact_mobile: any;
  contact_mail: any;
  isLoggedIn: any;

  constructor(private setCssJs: ApplyCssJsService, private commServ: CommonService, private storageServ: StorageService, private authServ: AuthService) {
  }

  ngOnInit(): void {

    // set and apply stylesheets to user panel
    this.setCssJs.applyUserStyles([
      "bootstrapmin.css",
      "fontawesomemin.css",
      "owlcarouselmin.css",
      "owlthemedefaultmin.css",
      "jquerybxslidermin.css",
      "magnificpopup.css",
      "rating.css",
      "spacing.css",
      "bootstraptouchslider.css",
      "animatemin.css",
      "treemenu.css",
      "select2min.css",
      "main.css",
      "responsive.css"
    ]);

    // set and apply js to user panel
    this.setCssJs.loadUserScript([
      "../../../assets/js/jquery-2.2.4.min.js",
      "../../../assets/js/bootstrap.min.js",
      "https://js.stripe.com/v2/",
      "../../../assets/js/megamenu.js",
      "../../../assets/js/owl.carousel.min.js",
      "../../../assets/js/owl.animate.js",
      "../../../assets/js/jquery.bxslider.min.js",
      "../../../assets/js/jquery.magnific-popup.min.js",
      "../../../assets/js/rating.js",
      "../../../assets/js/jquery.touchSwipe.min.js",
      "../../../assets/js/bootstrap-touch-slider.js",
      "../../../assets/js/select2.full.min.js",
      "../../../assets/js/custom.js",
      "../../../assets/js/range.slider.js"
    ]);


    // get social details 
    this.commServ.getSocialDetails().subscribe(
      (data: any): void => {
        this.allSocialDetails = data;
      },
      (error: Error): void => {
        console.log(error);
        throwError(error);
      });

    // get contact information
    this.commServ.getPageSettings().subscribe(
      (retrn: any): void => {
        this.allPageSettings = retrn.data[0];

        this.contact_mail = this.allPageSettings.contact_email;
        this.contact_mobile = this.allPageSettings.contact_phone;
      },
      (error: Error): void => {
        throwError(error);
      }
    );

    this.isLoggedIn = this.storageServ.isLoggedIn();
  }

  private handleError(error: any): any {
    return throwError(error);
  }

  logout() {
    this.authServ.logout();
    sessionStorage.clear();
    window.location.reload();
  }
}
