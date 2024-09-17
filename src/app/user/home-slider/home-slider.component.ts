import { Component, OnInit } from '@angular/core';
import { CommonService } from '../__services/_common/common.service';
import { catchError, retry } from 'rxjs';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {
  slider: any;
  constructor(private servCommon: CommonService) { }
  ngOnInit(): void {
    /* this.servCommon.getHomeSlider().pipe(retry(3), catchError(err => {
      console.log('Error', err);
      throw 'Error in retriving data' + err;
    })).subscribe((ret) => {
      this.slider = ret;
    }); */

    this.servCommon.getHomeSlider().subscribe(
      (data) => {
        this.slider = data.data;
      },
      (error) => { console.log(error) },
      () => { console.log(`slider stream completed`); }
    );
  }
}
