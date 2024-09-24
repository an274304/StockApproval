import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseItem } from '../../../../core/Models/PurchaseItem';
import { FormGroup, FormsModule } from '@angular/forms';
import { PurchaseOrderWitItems } from '../../../../core/DTOs/PurchaseOrderWitItems';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { PurchaseMngService } from '../../../services/purchase-mng.service';

@Component({
  selector: 'app-view-received-items-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-received-items-form.component.html',
  styleUrl: './view-received-items-form.component.css'
})
export class ViewReceivedItemsFormComponent implements OnInit {
  purchaseOrderNo_FromQuery: string | null = null;
  @ViewChild('billInputFile') billInputFile: ElementRef<HTMLInputElement> | undefined;

  // Properties bound to form inputs
  catId: number = 0;
  catName: string = '';
  proId: number = 0;
  proName: string = '';
  venId: number = 0;
  venName: string = '';
  itemName: string = '';
  itemRemark: string = '';
  itemRate: number = 0;
  itemQty: number = 0;
  amount: number = 0;

  currency: string = '';
  purchaseOrderNo: string = '';
  purchaseOrderRemark: string = '';
  purchaseOrderVendorBillPath: string = '';
  purchaseOrderDt: string = '';
  purchaseDeliveryDt: string = '';

  // Variable to hold the total amount
  totalAmount: number = 0;

  // Array to hold the mapped PurchaseItem objects
  purchaseItems: PurchaseItem[] = [];

  // Array to hold the table data
  tableItems: Array<{
    id: number;
    catId: number;
    catName: string;
    proId: number;
    proName: string;
    venId: number;
    venName: string;
    itemName: string;
    itemRemark: string;
    itemRate: number;
    itemQty: number;
    total: number
  }> = [];

  formDataApiResult: ApiResult<PurchaseOrderWitItems> = { data: undefined, result: false, message: 'Connection Not Available.' };

  constructor(private route: ActivatedRoute, private router: Router, private purchaseService: PurchaseMngService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.purchaseOrderNo_FromQuery = params.get('purchaseOrderNo');
    });

    if (this.purchaseOrderNo_FromQuery) {
      this.GetReceivedItemsForUpdate(this.purchaseOrderNo_FromQuery);
    } else {
      alert('Purchase Order Number is null');
    }
  }

  GetReceivedItemsForUpdate(purchaseOrderNo: string) {
    this.purchaseService.GetReceivedItemsForUpdate(purchaseOrderNo).subscribe({
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
          this.purchaseOrderVendorBillPath = this.formDataApiResult.data?.purchaseOrder?.vendorBillPath ?? '';

           // Call to update total amount
              this.updateTotalAmount();
        }
        else {
          alert('Fail To Save');
        }

      },
      error: (err) => {
        console.error('Error fetching Users', err);
      }
    });
  }

  BillSendTOAcctsAndStock(){
    const formData = new FormData();

    if (this.billInputFile?.nativeElement) {
      const file = this.billInputFile.nativeElement.files?.[0];
      if (file) {
        formData.append('purchaseOrderNo', this.purchaseOrderNo);
        formData.append('file', file, file.name);

        this.purchaseService.BillSendTOAcctsAndStock(formData).subscribe({
          next: (response: ApiResult<object>) => {
            if (response.result) {
              this.router.navigate(['/admin/waiting']);
            }
            else {
              alert('Fail To Save');
            }
    
          },
          error: (err) => {
            console.error('Error fetching Users', err);
          }
        });


      } else {
        alert('No file selected.');
      }
    }
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


   formatDate = (dateString : Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
}
