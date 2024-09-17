import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:9000/';

// Setting request headers to JSON
const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json');

const httpOptions = {
  headers: headers,
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getSocialDetails(): Observable<any> {
    return this.http.get(AUTH_API + 'api/social', httpOptions);
  }

  getPageSettings(): Observable<any> {
    return this.http.get(AUTH_API + 'api/settings', httpOptions);
  }

  getTopNavigation(): Observable<any> {
    return this.http.get(AUTH_API + 'api/topnav', httpOptions);
  }

  getHomeSlider(): Observable<any> {
    return this.http.get(AUTH_API + 'api/homeslider', httpOptions);
  }

  getServices(): Observable<any> {
    return this.http.get(AUTH_API + 'api/homeservices', httpOptions);
  }

  getFeaturedProducts(): Observable<any> {
    return this.http.get(AUTH_API + 'api/featuredproducts', httpOptions);
  }

  getProductsByOptName(pOpts:any): Observable<any> {
    
    return this.http.get(
      AUTH_API + 'api/getProductsByOptName/' + pOpts,
      httpOptions
    );
  }

  getProds(): Observable<any> {
    return this.http.get(AUTH_API + 'api/prods', httpOptions);
  }

  getNewsletter(): Observable<any> {
    return this.http.get(AUTH_API + 'api/newsletter', httpOptions);
  }

  getProducts(pCatId: number): Observable<any> {
    return this.http.get(AUTH_API + 'api/products/' + pCatId, httpOptions);
  }

  getParentCategoryLevelById(pCatId: number): Observable<any> {
    return this.http.get(
      AUTH_API + 'api/getParentCategoryLevelById/' + pCatId,
      httpOptions
    );
  }
  getProductsByCatId(pCatId: number): Observable<any> {
    return this.http.get(
      AUTH_API + 'api/getProductsByCatId/' + pCatId,
      httpOptions
    );
  }

  getProductsByProdId(pProdId: number): Observable<any> {
    return this.http.get(
      AUTH_API + 'api/getProductsByProdId/' + pProdId,
      httpOptions
    );
  }

  getProductsByVariants(pProdId: any, pVariants: string): Observable<any> {
    return this.http.get(
      AUTH_API + 'api/productByVariants/' + pProdId + '/' + pVariants,
      httpOptions
    );
  }

  getFilterOptions(): Observable<any> {
    return this.http.get(AUTH_API + 'api/filterOptions', httpOptions);
  }

  getFilterOptionsByCatId(pCategoryId: any): Observable<any> {
    return this.http.get(
      AUTH_API + 'api/optFilterByCatId/' + pCategoryId,
      httpOptions
    );
  }

  getPrcRangeFilterByCatId(pCategoryId: any): Observable<any> {
    return this.http.get(
      AUTH_API + 'api/getPrcRangeFilterByCatId/' + pCategoryId,
      httpOptions
    );
  }

  getProductsByFilter(pFilters: any, pCategoryId: number): Observable<any> {
    let params: any;
    params = new HttpParams()
      .set('filters', pFilters)
      .set('catId', pCategoryId);

    return this.http.get(
      AUTH_API + `api/getProductsByFilter/${pFilters}/${pCategoryId}`
    );
  }

  addToCart(pPrdId: number, pPrdVariantId: any, pSelectedQty: number) {
    console.log(pPrdId);
    return this.http.post(AUTH_API + `api/addCart/`, {
      product_id: pPrdId,
      product_variants_id: pPrdVariantId,
      selected_qty: pSelectedQty,
    });
  }

  login(pUsrCredential: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/user/login',
      { email: pUsrCredential.email, password: pUsrCredential.password },
      httpOptions
    );
  }
}
