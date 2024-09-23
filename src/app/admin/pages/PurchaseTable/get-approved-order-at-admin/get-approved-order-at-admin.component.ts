import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../../core/Models/PurchaseOrder';
import { PurchaseTableMngService } from '../../../services/purchase-table-mng.service';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { CommonModule, DatePipe } from '@angular/common';
import { PurchaseMngService } from '../../../services/purchase-mng.service';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery globally

@Component({
  selector: 'app-get-approved-order-at-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './get-approved-order-at-admin.component.html',
  styleUrls: ['./get-approved-order-at-admin.component.css']
})
export class GetApprovedOrderAtAdminComponent implements AfterViewInit, OnInit {
  tableListApiResult: ApiResult<PurchaseOrder> = { dataList: [], result: false, message: 'Connection Not Available.' };
  vendorSendApiResult: ApiResult<Object> = { dataList: [], result: false, message: 'Connection Not Available.' };
  hasData: boolean = false;

  constructor(
    private purchaseTableService: PurchaseTableMngService,
    private purchaseService: PurchaseMngService
  ) {}

  ngOnInit(): void {
    this.loadApprovedTable();
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  itemSendToVendor(purchaseOrderNo?: string): void {
    if (purchaseOrderNo) {
      this.purchaseService.ItemsSendToVendor(purchaseOrderNo).subscribe({
        next: (response: ApiResult<Object>) => {
          this.vendorSendApiResult = response;
          if (this.vendorSendApiResult.result) {
            console.log('Successfully sent to vendor');
            // Reload the table data after a successful operation
            this.loadApprovedTable();
          } else {
            console.log('Failed to send to vendor');
          }
        },
        error: (err) => {
          console.error('Error sending item to vendor', err);
        }
      });
    } else {
      console.log('Purchase order number is undefined');
    }
  }

  loadApprovedTable(): void {
    this.purchaseTableService.GetApprovedOrderAtAdmin().subscribe({
      next: (response: ApiResult<PurchaseOrder>) => {
        this.tableListApiResult = response;
        this.hasData = !!this.tableListApiResult.dataList?.length;
        this.initializeDataTable(); // Initialize DataTable after data is loaded
      },
      error: (err) => {
        console.error('Error fetching table data', err);
        this.tableListApiResult = { dataList: [], result: false, message: 'Error fetching table data' };
        this.hasData = false;
      }
    });
  }

  initializeDataTable(): void {
    if (typeof $ !== 'undefined') {
      $(document).ready(() => {
        if (this.hasData) {
          const table = $('#ApprovedTable').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf', 'print'],
            destroy: true // Ensure DataTable is reinitialized correctly
          });
          table.buttons().container()
            .appendTo('#ApprovedTable_wrapper .col-md-6:eq(0)');
        }
      });
    }
  }
}
