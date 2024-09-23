import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PurchaseTableMngService } from '../../../services/purchase-table-mng.service';
import { PurchaseOrder } from '../../../../core/Models/PurchaseOrder';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
declare var $: any; // Declare jQuery globally
// Import DataTables related types and functionalities if using Angular DataTables

@Component({
  selector: 'app-get-approval-pending-order-at-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './get-approval-pending-order-at-admin.component.html',
  styleUrls: ['./get-approval-pending-order-at-admin.component.css']
})
export class GetApprovalPendingOrderAtAdminComponent implements AfterViewInit, OnInit {
  tableListApiResult: ApiResult<PurchaseOrder> = { dataList: [], result: false, message: 'Connection Not Available.' };
  hasData: boolean = false;
  
  constructor(private purchaseTableService: PurchaseTableMngService) {}

  ngOnInit(): void {
    this.loadApprovalPendingTable();
  }

  private loadApprovalPendingTable(): void {
    this.purchaseTableService.GetApprovalPendingOrderAtAdmin().subscribe({
      next: (response: ApiResult<PurchaseOrder>) => {
        this.tableListApiResult = response;
        // Explicitly ensure hasData is a boolean
        this.hasData = !!this.tableListApiResult.dataList?.length; 
        this.initializeDataTable(); // Initialize DataTable after data is loaded
      },
      error: (err) => {
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
          var table = $('#ApprovalPendingTable').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf', 'print'],
            "destroy": true // Ensure DataTable is reinitialized correctly
          });
          table.buttons().container()
            .appendTo('#ApprovalPendingTable_wrapper .col-md-6:eq(0)');
        }
      });
    }
  }
}
