import { Component, OnInit } from '@angular/core';
import { VendorBillService } from '../../../services/vendor-bill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderWitItems } from '../../../../core/DTOs/PurchaseOrderWitItems';
import { ApiResult } from '../../../../core/DTOs/ApiResult';

@Component({
  selector: 'app-view-pending-bill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-pending-bill.component.html',
  styleUrl: './view-pending-bill.component.css'
})
export class ViewPendingBillComponent implements OnInit {
  purchaseOrderNo_FromQuery: string | null = null;
  formDataApiResult: ApiResult<PurchaseOrderWitItems> = { data: undefined, result: false, message: 'Connection Not Available.' };

  currency: string = '';
  purchaseOrderNo: string = '';
  purchaseOrderRemark: string = '';
  purchaseOrderDt: string = '';
  purchaseDeliveryDt: string = '';
  totalAmount: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private vendorBillService: VendorBillService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.purchaseOrderNo_FromQuery = params.get('purchaseOrderNo');
    });

    if (this.purchaseOrderNo_FromQuery) {
      this.GetPendingItemsForApproval(this.purchaseOrderNo_FromQuery);
    } else {
      alert('Purchase Order Number is null');
    }
  }

  GetPendingItemsForApproval(purchaseOrderNo: string) {
    this.vendorBillService.GetPendingItemsForApproval(purchaseOrderNo).subscribe({
      next: (response: ApiResult<PurchaseOrderWitItems>) => {
        if (response.result) {
          this.formDataApiResult = response ?? null;

          this.purchaseOrderNo = this.formDataApiResult.data?.purchaseOrder?.purchaseOrderNo ?? '';
          this.purchaseOrderDt = this.formDataApiResult.data?.purchaseOrder?.purchaseOrderDt
            ? this.formatDate(this.formDataApiResult.data.purchaseOrder.purchaseOrderDt)
            : '';

          this.purchaseDeliveryDt = this.formDataApiResult.data?.purchaseOrder?.purchaseExpDelDt
            ? this.formatDate(this.formDataApiResult.data.purchaseOrder.purchaseExpDelDt)
            : '';

          this.purchaseOrderRemark = this.formDataApiResult.data?.purchaseOrder?.purchaseRemark ?? '';
          this.currency = this.formDataApiResult.data?.purchaseOrder?.purchaseCurrency ?? '';

          // Call to update total amount
          this.updateTotalAmount();
        }
        else {
          alert('Fail To Approve');
        }

      },
      error: (err: any) => {
        console.error('Error fetching Order Details', err);
      }
    });
  }

  approveOrder() {
    if (this.purchaseOrderNo) {
      this.vendorBillService.ApprovePendingItemsForApproval(this.purchaseOrderNo).subscribe({
        next: (response: ApiResult<object>) => {
          if (response.result) {
            alert('successfully aprove');
            this.router.navigate(['']);
          }
          else {
            alert('Fail To Approve');
          }
        },
        error: (err: any) => {
          console.error('Error fetching Order Details', err);
        }
      });
    }
    else {
      alert('Purchase Order No. Not Available');
    }
  }

  rejectOrder() {
    if (this.purchaseOrderNo) {
      this.vendorBillService.RejectPendingItemsForApproval(this.purchaseOrderNo).subscribe({
        next: (response: ApiResult<object>) => {
          if (response.result) {
            alert('successfully rejected');
            this.router.navigate(['']);
          }
          else {
            alert('Fail To Reject');
          }
        },
        error: (err: any) => {
          console.error('Error fetching Order Details', err);
        }
      });
    }
    else {
      alert('Purchase Order No. Not Available');
    }
  }

  removeItem(purchaseItemId : number) {
      this.vendorBillService.RemovePendingItemsForApproval(purchaseItemId).subscribe({
        next: (response: ApiResult<object>) => {
          if (response.result) {
            alert('successfully removed');
            this.GetPendingItemsForApproval(this.purchaseOrderNo_FromQuery ?? '');
          }
          else {
            alert('Fail To removed');
          }
        },
        error: (err: any) => {
          console.error('Error fetching Order Details', err);
        }
      });

  }

  // Method to calculate the amount for an item
  calculateAmount(item: any): number {
    let itemTotal = (item?.itemRate ?? 0) * (item?.itemQty ?? 0);
    return itemTotal;
  }

  updateTotalAmount() {
    const purchaseItems = this.formDataApiResult?.data?.purchaseItems;

    if (purchaseItems && Array.isArray(purchaseItems)) {
      this.totalAmount = purchaseItems.reduce((sum, item) => sum + this.calculateAmount(item), 0);
    } else {
      this.totalAmount = 0; // Handle the case where purchaseItems is undefined or not an array
    }
  }

  formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
}
