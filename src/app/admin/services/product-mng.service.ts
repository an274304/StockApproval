import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductMaster } from '../../core/Models/ProductMaster';
import { ApiResult } from '../../core/DTOs/ApiResult';
import { ApiUrl } from '../../core/Constant/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductMngService {
  http = inject(HttpClient);
  constructor() { }
  getProducts(): Observable<ApiResult<ProductMaster>> {
    return this.http.get<ApiResult<ProductMaster>>(`${ApiUrl.baseApiUrl}${ApiUrl.product.GET_ALL_PRODUCT}`);
  }

  saveProduct(product : FormData): Observable<ApiResult<ProductMaster>> {
    return this.http.post<ApiResult<ProductMaster>>(`${ApiUrl.baseApiUrl}${ApiUrl.product.SAVE_PRODUCT}`, product);
  }

  updateProduct(product : FormData): Observable<ApiResult<ProductMaster>> {
    return this.http.put<ApiResult<ProductMaster>>(`${ApiUrl.baseApiUrl}${ApiUrl.product.UPDATE_PRODUCT}`, product);
  }

  getProductById(productId : number): Observable<ApiResult<ProductMaster>> {
    return this.http.get<ApiResult<ProductMaster>>(`${ApiUrl.baseApiUrl}${ApiUrl.product.GET_PRODUCT_BY_ID}${productId}`);
  }
}
