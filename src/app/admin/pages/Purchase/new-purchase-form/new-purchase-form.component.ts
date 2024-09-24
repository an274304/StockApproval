import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderWitItems } from '../../../../core/DTOs/PurchaseOrderWitItems';
import { PurchaseOrder } from '../../../../core/Models/PurchaseOrder';
import { PurchaseItem } from '../../../../core/Models/PurchaseItem';
import { PurchaseMngService } from '../../../services/purchase-mng.service';
import { ApiResult } from '../../../../core/DTOs/ApiResult';

@Component({
  selector: 'app-new-purchase-form',
  standalone: true,
  imports : [FormsModule,CommonModule],
  templateUrl: './new-purchase-form.component.html',
  styleUrls: ['./new-purchase-form.component.css']
})
export class NewPurchaseFormComponent {
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
  purchaseOrderDt: string = new Date().toISOString().split('T')[0];
  purchaseDeliveryDt: string = new Date().toISOString().split('T')[0];
  // Array to hold the mapped PurchaseItem objects
  purchaseItems: PurchaseItem[] = [];

  private purchaseService = inject(PurchaseMngService);
  purchaseOrderSaveApi : PurchaseOrder | null =null;

  //#region Form submit
  onFormSubmit(){
    this.mapTableItemsToPurchaseItems();

    const newOrder = new PurchaseOrder({
      purchaseOrderDt : new Date(this.purchaseOrderDt),
      purchaseExpDelDt: new Date(this.purchaseDeliveryDt),
      purchaseCurrency: this.currency,
      purchaseRemark: this.purchaseOrderRemark,
      created : new Date(new Date().toISOString()),
      createdBy : 'valueFromSession'
    });

    // Initialize PurchaseOrderWitItems
    const orderWithItems = new PurchaseOrderWitItems({
      purchaseOrder: newOrder,
      purchaseItems: this.purchaseItems
    });


    this.purchaseService.purchaseOrder(orderWithItems).subscribe({
      next: (response: ApiResult<PurchaseOrder>) => {
        if(response.result){
          this.purchaseOrderSaveApi = response.data ?? null;
          this.purchaseOrderNo = this.purchaseOrderSaveApi?.purchaseOrderNo ?? '';
          alert('Save Successfully.. Check Your Order no.');
        }
        else{
          alert('Fail To Save');
        }
        
      },
      error: (err) => {
        console.error('Error fetching Users', err);
      }
    });


  }

  // Method to map tableItems to PurchaseItem
  mapTableItemsToPurchaseItems() {
    this.purchaseItems = this.tableItems.map(item => new PurchaseItem({
      catId:item.catId,
      catName:item.catName,
      proId:item.proId,
      proName: item.proName,
      venId:item.venId,
      venName: item.venName,
      itemName: item.itemName,
      itemRemark: item.itemRemark,
      itemRate: item.itemRate,
      itemQty: item.itemQty
    }));
  }

  //#endregion Form submit



  //#region - Table Logics

  // Array to hold the table data
  tableItems: Array<{ catId:number;
                      catName:string;
                      proId:number;
                      proName: string;
                      venId:number;
                      venName: string;
                      itemName: string;
                      itemRemark: string; 
                      itemRate: number; 
                      itemQty: number; 
                      total: number 
                    }> = [];
  
  // Variable to hold the total amount
  totalAmount: number = 0;

  // Method to add a new row
  addRow() {
    // Create a new item with the values from the form
    const newItem = {
        catId:this.catId,
        catName:this.catName,
        proId:this.proId,
        proName: this.proName,
        venId:this.venId,
        venName: this.venName,
        itemName: this.itemName,
        itemRemark: this.itemRemark,
        itemRate: this.itemRate,
        itemQty: this.itemQty, 
        total: this.amount
    };
    
    // Add the new item to the table
    this.tableItems.push(newItem);

    // Update the total amount
    this.updateTotal();

    // Clear form fields
    this.clearForm();
  }

  // Method to update the total amount
  updateTotal() {
    this.totalAmount = this.tableItems.reduce((sum, item) => sum + item.total, 0);
  }

  // Method to clear form fields
  clearForm() {
    this.catId = 0;
    this.proId = 0;
    this.venId = 0;
    this.itemRate = 0;
    this.itemQty = 0;
    this.amount = 0;
    this.itemRemark = '';
  }

 // Method to remove a row
 removeRow(index: number) {
  this.tableItems.splice(index, 1); // Remove the item at the specified index
  this.updateTotal(); // Update the total amount after removing the row
}

  calculateAmount(){
    this.amount = this.itemRate * this.itemQty;
  }

    // Method to handle product change event
    onCategoryChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const selectedOption = target.options[target.selectedIndex];
      this.catName = selectedOption.text;
    }

    
   // Method to handle product change event
   onProductChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    this.proName = selectedOption.text;
  }

  // Method to handle vendor change event
  onVendorChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    this.venName = selectedOption.text;
  }

   // Method to handle currency change event
   onCurrencyChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = target.options[target.selectedIndex];
    this.currency = selectedOption.text;
  }
  //#endregion
}
