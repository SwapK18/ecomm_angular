import { Component, OnInit, numberAttribute } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { AuthService } from "../../__services/_auth/auth.service";
import { CommonService } from "../../__services/_common/common.service";

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
  selector: "app-prod-detail",
  templateUrl: "./prod-detail.component.html",
  styleUrls: ["./prod-detail.component.css"],
})
export class ProdDetailComponent implements OnInit {
  prdId!: any;
  arrProducts: any[] = [];
  objVar: any = {};
  objCat: any = {};
  objPrd: any = {};
  lclObjPrd: any = {};
  objPrdVar: any = [];
  finalCombination: string = "";
  addToCart!: FormGroup;
  // objVariations:{[any:any]};

  constructor(
    private authServ: AuthService,
    private fb: FormBuilder,
    private commServ: CommonService,
    private actRte: ActivatedRoute,
    private hhtpc: HttpClient,
    private rtr: Router,
  ) {
    // this.createForm();
  }
  ngOnInit(): void {
    this.prdId = this.actRte.snapshot.params["prdId"];

    
    this.commServ.getProductsByProdId(this.prdId).subscribe(
      (ret: any): void => {
        this.arrProducts = ret.data;

        this.objPrd = {
          product_id: this.arrProducts[0].prod_id,
          product_name: this.arrProducts[0].prod_name,
          product_description: this.arrProducts[0].prod_description,
          product_is_featured: this.arrProducts[0].prod_is_featured,
          product_is_active: this.arrProducts[0].prod_is_active,
          product_return_policy: this.arrProducts[0].prod_return_policy,
          variations: [],
          categories: [],
          skus: [],
          regular_price: [],
          spcl_offr_discount_factor: [],
          spcl_offr_max_quantity: [],
          spcl_offr_min_quantity: [],
          spcl_offr_price: [],
          stock: [],
          p_image: [],
          featured_image: this.arrProducts[0].image,
        };

        for (var i = 0; i < this.arrProducts.length; i++) {
          const elPrd = this.arrProducts[i];

          // for variations

          for (let j = 0; j < elPrd.varaggcomb.length; j++) {
            const elVariations = elPrd.varaggcomb[j];
            let lclNameIdComb: { [key: string]: any } = {};

            if (!this.objVar.hasOwnProperty(elVariations.parent)) {
              this.objVar[elVariations.parent] = [];
            }

            const varChildSet = new Set(
              this.objVar[elVariations.parent].map(
                (item: any) => item.var_name,
              ),
            );

            if (!varChildSet.has(elVariations.child)) {
              lclNameIdComb["var_id"] = elVariations.child_v_id;
              lclNameIdComb["var_name"] = elVariations.child;

              this.objVar[elVariations.parent].push(lclNameIdComb);
            }

            this.objPrd["variations"].push(this.objVar);
          }

          // for categories
          for (var k = 0; k < elPrd.cataggcomb.length; k++) {
            const elCats = elPrd.cataggcomb[k];
            if (!this.objCat.hasOwnProperty(elCats.cat_parent)) {
              this.objCat[elCats.cat_parent] = [];
            }
            if (!this.objCat[elCats.cat_parent].includes(elCats.cat_child)) {
              this.objCat[elCats.cat_parent].push(elCats.cat_child);
            }
            this.objPrd["categories"].push(this.objCat);
          }
        }
      },
      (err: Error): any => {
        throw "Error encountered " + err;
      },
    );
  }
  getObjectKeys(pObj: any): string[] {
    return Object.keys(pObj);
  }

  getObjectValues(obj: any, key: string): any[] {
    return obj[key];
  }

  onSave(pKey: any, pValue: any, pProdId: any): void {
    let combinations: any = [];
    let lenKeys: any;
    this.lclObjPrd[pKey] = pValue;

    var sortedObj: any = {};
    Object.keys(this.lclObjPrd)
      .sort()
      .forEach((key) => {
        sortedObj[key] = this.lclObjPrd[key];
      });

    this.finalCombination = this.formatVarKeyStrng(sortedObj);

    this.commServ
      .getProductsByVariants(pProdId, this.finalCombination)
      .subscribe(
        (data: any): any => {
          this.objPrdVar = data.data;
        },
        (err: Error): any => {
          throw "Something went wrong " + err;
        },
      );
  }
  formatVarKeyStrng(pObj: object): string {
    const values = Object.values(pObj);
    return values.length > 1 ? values.join("-") : values[0];
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
      showCloseButton: true,
    });
  }
}
