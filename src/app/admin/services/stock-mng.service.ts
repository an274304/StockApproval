import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PurchaseOrder } from '../../core/Models/PurchaseOrder';
import { ApiResult } from '../../core/DTOs/ApiResult';
import { ApiUrl } from '../../core/Constant/ApiUrl';
import { Observable } from 'rxjs';
import { PurchaseOrderWitItems } from '../../core/DTOs/PurchaseOrderWitItems';
import { UpdateNewStockItem } from '../../core/DTOs/UpdateNewStockItem';
import { StockItemMaster } from '../../core/Models/StockItemMaster';

@Injectable({
  providedIn: 'root'
})
export class StockMngService {
  http = inject(HttpClient);
  constructor() { }
  GetNewStockAtAdmin(): Observable<ApiResult<PurchaseOrder>> {
    return this.http.get<ApiResult<PurchaseOrder>>(`${ApiUrl.baseApiUrl}${ApiUrl.stock.Get_New_Stock_At_Admin}`);
  }

  GetNewStockItemsAtAdmin(purchaseOrderNo : string): Observable<ApiResult<PurchaseOrderWitItems>> {
    return this.http.get<ApiResult<PurchaseOrderWitItems>>(`${ApiUrl.baseApiUrl}${ApiUrl.stock.Get_New_Stock_Items_At_Admin}${purchaseOrderNo}`);
  }

  UpdateNewStockItem(newStockItems: UpdateNewStockItem[]): Observable<ApiResult<object>> {
    return this.http.put<ApiResult<object>>(`${ApiUrl.baseApiUrl}${ApiUrl.stock.Update_New_Stock_Item}`, newStockItems);
  }

  loadUpdatedStockMasterItems(purchaseOrderNo: string): Observable<ApiResult<StockItemMaster>> {
    return this.http.get<ApiResult<StockItemMaster>>(`${ApiUrl.baseApiUrl}${ApiUrl.stock.Load_Updated_Stock_Master_Items}${purchaseOrderNo}`);
  }
}
