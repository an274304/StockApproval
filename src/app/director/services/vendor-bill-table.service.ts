import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PurchaseOrder } from '../../core/Models/PurchaseOrder';
import { ApiResult } from '../../core/DTOs/ApiResult';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../core/Constant/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class VendorBillTableService {

  http = inject(HttpClient);
  
  constructor() { }

  GetPendingBillAtDirector(): Observable<ApiResult<PurchaseOrder>> {
    return this.http.get<ApiResult<PurchaseOrder>>(`${ApiUrl.baseApiUrl}${ApiUrl.vendorBillTable.Get_Pending_Bill_At_Director}`);
  }

  GetApprovedBillAtDirector(): Observable<ApiResult<PurchaseOrder>> {
    return this.http.get<ApiResult<PurchaseOrder>>(`${ApiUrl.baseApiUrl}${ApiUrl.vendorBillTable.Get_Approved_Bill_At_Director}`);
  }

  GetRejectedBillAtDirector(): Observable<ApiResult<PurchaseOrder>> {
    return this.http.get<ApiResult<PurchaseOrder>>(`${ApiUrl.baseApiUrl}${ApiUrl.vendorBillTable.Get_Rejected_Bill_At_Director}`);
  }
}
