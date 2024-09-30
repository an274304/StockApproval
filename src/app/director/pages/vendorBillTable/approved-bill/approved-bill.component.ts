import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PurchaseOrder } from '../../../../core/Models/PurchaseOrder';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { VendorBillTableService } from '../../../services/vendor-bill-table.service';
declare var $: any;

@Component({
  selector: 'app-approved-bill',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './approved-bill.component.html',
  styleUrl: './approved-bill.component.css'
})
export class ApprovedBillComponent {
  tableListApiResult: ApiResult<PurchaseOrder> = { dataList: [], result: false, message: 'Connection Not Available.' };
  hasData: boolean = false;
  
  constructor(private vendorBillTableService: VendorBillTableService) {}

  ngOnInit(): void {
    this.loadApprovedBillTable();
  }

  private loadApprovedBillTable(): void {
    this.vendorBillTableService.GetApprovedBillAtDirector().subscribe({
      next: (response: ApiResult<PurchaseOrder>) => {
        this.tableListApiResult = response;
        // Explicitly ensure hasData is a boolean
        this.hasData = !!this.tableListApiResult.dataList?.length; 
        this.initializeDataTable(); // Initialize DataTable after data is loaded
      },
      error: (err: any) => {
        console.error('Error fetching table data', err);
        this.tableListApiResult = { dataList: [], result: false, message: 'Error fetching table data' };
        this.hasData = false; // Ensure hasData is set to false on error
      }
    });
  }
  

  ngAfterViewInit(): void {
    // Initialize DataTable after the view has been fully initialized
    this.initializeDataTable();
  }

  private initializeDataTable(): void {
    if (typeof $ !== 'undefined') {
      $(document).ready(() => {
        if (this.hasData) {
          var table = $('#ApprovedBillTable').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf', 'print'],
            "destroy": true // Ensure DataTable is reinitialized correctly
          });
          table.buttons().container()
            .appendTo('#ApprovedBillTable_wrapper .col-md-6:eq(0)');
        }
      });
    }
  }
}
