import { Component, OnInit } from '@angular/core';
import { CommonService } from '../__services/_common/common.service';
import { catchError, retry } from 'rxjs';

@Component({
	selector: 'app-featured',
	templateUrl: './featured.component.html',
	styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
	feat_product: any;
	settings: any;
	prods: any;
	errMsg: any | '' | undefined;

	constructor(private servCommon: CommonService) { }

	ngOnInit(): void {
		this.servCommon.getFeaturedProducts().subscribe(
			(data: any) => {
				this.feat_product = data.data;
				console.log(this.feat_product);
				
			}, (error: any) => {
				this.errMsg = error;
				throw 'Error in retriving data' + error;
			});


		this.servCommon.getPageSettings().subscribe(
			(data: any) => {
				this.settings = data.data;
			}, (err: any) => {
				this.errMsg = err;
				throw 'Error in retriving data' + err;
			});
	}
}
