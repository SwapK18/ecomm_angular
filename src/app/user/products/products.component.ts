import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { CommonService } from "../__services/_common/common.service";

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
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  filters!: any;
  arrOptions: [] = [];
  priceFilters: any[] = [];
  minPriceVal = Infinity;
  maxPriceVal = -Infinity;
  selectedOpts: string[] = [];
  filteredProds: any[] = [];
  // arrSlectedOpts: [{id:any, name:string}] = [];

  categoryId!: any;
  constructor(
    private commServ: CommonService,
    private actRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    let dataz: any;

    this.categoryId = this.actRoute.snapshot.params["catId"];
    if (this.categoryId != null) {
      this.commServ
        .getFilterOptionsByCatId(this.categoryId)
        .subscribe((recData: any): any => {
          dataz = recData.data;
          dataz = dataz[0]["getoptionsbycategoryid"];

          this.arrOptions = dataz.reduce(
            (
              acc: { [x: string]: { id: any; name: any }[] }[],
              { child_option, parent_option, child_option_id }: any,
            ) => {
              const existingParent = acc.find((item) => item[parent_option]);
              const newEntry = { id: child_option_id, name: child_option };

              if (existingParent) {
                existingParent[parent_option].push(newEntry);
              } else {
                acc.push({ [parent_option]: [newEntry] });
              }

              return acc;
            },
            [],
          );
        });
      // price range filter
      this.commServ
        .getPrcRangeFilterByCatId(this.categoryId)
        .subscribe((retrived: any): void => {
          this.priceFilters = retrived.data[0]["price_filter_by_catid"];

          // Iterate through the nested array
          const data = this.priceFilters;

          for (const subArray of this.priceFilters) {
            for (const num of subArray) {
              if (num < this.minPriceVal) this.minPriceVal = num;
              if (num > this.maxPriceVal) this.maxPriceVal = num;
            }
          }
        });

      this.filteredProds = this.getProductsByCatId(this.categoryId);

      this.commServ
        .getProductsByCatId(this.categoryId)
        .subscribe((retData: any): void => {
          this.filteredProds = retData.data;
        });
    } else {
      this.alertConfirmation(
        "error",
        "This category does not exist",
        "center-end",
      );
    }
    // this.commServ.getFilterOptionsByCatId();
  }

  alertConfirmation(p_typ: any, p_msg: any, p_pos: any = null) {
    Swal.fire({
      position: p_pos,
      icon: p_typ,
      title: "Error",
      text: p_msg,
      toast: true,
      timer: 6000,
      showConfirmButton: false,
      background: "#fbfbfb",
      showCloseButton: true,
    });
  }

  filterOpt(pEvent: any): void {
    const checkbox = pEvent.target as HTMLInputElement;
    let value: string = checkbox.value;

    if (checkbox.checked) {
      this.selectedOpts.push(checkbox.value);
    } else {
      const index = this.selectedOpts.indexOf(value);
      if (index > -1) {
        this.selectedOpts.splice(index, 1);
      }
    }

    if (this.selectedOpts.length > 0) {
      this.commServ
        .getProductsByOptName(this.selectedOpts)
        .subscribe((ret: any): void => {
          this.filteredProds = ret.data;
          console.log(this.filteredProds);
        });
    } else {
      this.commServ
        .getProductsByCatId(this.categoryId)
        .subscribe((retData: any): void => {
          this.filteredProds = retData.data;
        });
      console.log(this.filteredProds);
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  /*getProductsByCatId(pCatId: any): any {
    let returnData;
    this.commServ
      .getProductsByCatId(pCatId)
      .subscribe((retData: any): void => {
        returnData = retData.data;
        console.log(returnData);

      });

      if (returnData!=null) {
        return returnData;
      } else {
        return [];
      }
  }*/

  getProductsByCatId(pCatId: any): any {
    let returnData: [] = [];
    this.commServ.getProductsByCatId(pCatId).subscribe((retData: any): void => {
      returnData = retData.data;
    });
    return returnData;
  }
}
