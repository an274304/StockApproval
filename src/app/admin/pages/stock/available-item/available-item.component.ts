import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { StockMngService } from '../../../services/stock-mng.service';
import { Router } from '@angular/router';
import { ShowAvailableStockTable } from '../../../../core/DTOs/ShowAvailableStockTable';
declare var $: any;

@Component({
  selector: 'app-available-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './available-item.component.html',
  styleUrl: './available-item.component.css'
})
export class AvailableItemComponent implements AfterViewInit, OnInit {
  tableData: ApiResult<ShowAvailableStockTable> = { dataList: [], result: false, message: 'Connection Not Available.' };
  hasData: boolean = false;

  constructor(private stockMngService: StockMngService, private router:Router) {}

  ngOnInit(): void {
    this.loadPendingBillTable();
  }

  private loadPendingBillTable(): void {
    this.stockMngService.GetAvailableStockAtAdmin().subscribe({
      next: (response: ApiResult<ShowAvailableStockTable>) => {
        this.tableData = response;
        // Explicitly ensure hasData is a boolean
        this.hasData = !!this.tableData.dataList?.length; 
        this.initializeDataTable(); // Initialize DataTable after data is loaded
      },
      error: (err: any) => {
        console.error('Error fetching table data', err);
        this.tableData = { dataList: [], result: false, message: 'Error fetching table data' };
        this.hasData = false; // Ensure hasData is set to false on error
      }
    });
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  private initializeDataTable(): void {
    if (typeof $ !== 'undefined') {
      $(document).ready(() => {
        if (this.hasData) {
          var table = $('#AvailableStockTable').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf', 'print'],
            "destroy": true // Ensure DataTable is reinitialized correctly
          });
          table.buttons().container()
            .appendTo('#AvailableStockTable_wrapper .col-md-6:eq(0)');
        }
      });
    }
  }
}
