import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../__services/_common/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, catchError, retry } from 'rxjs';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css'],
})
export class TopNavigationComponent implements OnInit {
  data: any;
  topNav: any;
  menuHtml: any;
  sanitizedHtml: any;
  categoryMulti: any = {
    categories: {},
    parent_cats: {},
  };

  constructor(
    private servCommon: CommonService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.servCommon.getTopNavigation().subscribe(
      (retrn: any): void => {
        this.data = retrn.data;

        for (var i = 0; i < this.data.length; i++) {
          this.categoryMulti.categories[this.data[i].category_id] =
            this.data[i];
          if (
            !this.categoryMulti.parent_cats[this.data[i].parent_category_id]
          ) {
            this.categoryMulti.parent_cats[this.data[i].parent_category_id] =
              [];
          }
          this.categoryMulti.parent_cats[this.data[i].parent_category_id].push(
            this.data[i].category_id
          );
        }

        this.menuHtml = this.listCategoryTree(null, this.categoryMulti);

        this.sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(
          this.menuHtml
        );
      },
      (err: any) => {
        throw 'Error when requesting data : ' + err;
      }
    );
  }

  // previous ORIGNAL
  /* listCategoryTree(parent: any, category: any) {

    const css_class = parent === 0 ? 'parent' : 'child';
    let html = '';
    let arr;
    let categoryLink: string = '';

    if (category.parent_cats[parent]) {
      html += '<ul>\n';

      arr = category.parent_cats[parent];
      for (let i = 0; i < arr.length; i++) {
        // caatId = "/products" + category.categories[arr[i]].category_id;

        // const categ = category.categories[arr[i]].category_id;
        categoryLink = '/products/' + category.categories[arr[i]].category_id;

        if (!category.parent_cats[arr[i]]) {
          html += "<li id='1'>\n";

          html +=
            '<a [routerLink]=' +
            categoryLink +
            '>' +
            category.categories[arr[i]].category_name +
            '</a>';

          html += '</li>\n';
        } else {
          html += "<li id='1'>\n";
          html +=
            '<a [routerLink]=' +
            categoryLink +
            ' >' +
            category.categories[arr[i]].category_name +
            '</a>\n';

          html += this.listCategoryTree(arr[i], category);
          html += '</li>\n';
        }
      }
      html += '</ul>\n';
    }
    
    return html;
  } */

  listCategoryTree(parent: any, category: any) {
    const css_class = parent === 0 ? 'parent' : 'child';
    let html = '';
    let arr;
    let categoryLink: string = '';

    if (category.parent_cats[parent]) {
      html += '<ul>\n';

      arr = category.parent_cats[parent];
      for (let i = 0; i < arr.length; i++) {
        categoryLink = '/products/' + category.categories[arr[i]].category_id;

        if (!category.parent_cats[arr[i]]) {
          html += "<li id='"+ category.categories[arr[i]].category_id +"'>\n";
          html +=
            '<a href="' +
            categoryLink +
            '">' +
            category.categories[arr[i]].category_name +
            '</a>';
          html += '</li>\n';
        } else {
          // html += "<li id='1'>\n";
          html += "<li id='"+ category.categories[arr[i]].category_id +"'>\n";

          html +=
            '<a href="' +
            categoryLink +
            '">' +
            category.categories[arr[i]].category_name +
            '</a>\n';
          html += this.listCategoryTree(arr[i], category);
          html += '</li>\n';
        }
      }
      html += '</ul>\n';
    }

    return html;
  }
}
