import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../core/Constant/ApiUrl';
import { CategoryMasterDTO } from '../../core/Models/CategoryMaster';
import { ApiResult } from '../../core/DTOs/ApiResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryMngService {

  constructor(private http : HttpClient) { }

  // getCategories(){
  //   debugger;
  //   return this.http.get<ApiResult<CategoryMasterDTO>>(`${ApiUrl.baseApiUrl}${ApiUrl.category.GET_ALL_CATEGORY}`);
  // }

  getCategories(): Observable<ApiResult<CategoryMasterDTO>> {
    return this.http.get<ApiResult<CategoryMasterDTO>>(`${ApiUrl.baseApiUrl}${ApiUrl.category.GET_ALL_CATEGORY}`);
  }
}
