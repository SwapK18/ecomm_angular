import { Component, OnInit } from '@angular/core';
import { CommonService } from '../__services/_common/common.service';
import { catchError, retry } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any;

  constructor(private servCommon: CommonService) { }
  ngOnInit(): void {

    this.servCommon.getServices().subscribe(
      (data: any) => {
        this.services = data.data;
      },
      (error: any) => {
        throw 'Error in retriving data' + error;
      }
    );
  }
}
