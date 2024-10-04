import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingVendorBillComponent } from './pages/VendorBill/VendorBillTable/pending-vendor-bill/pending-vendor-bill.component';
import { ViewPendingBillComponent } from './pages/VendorBill/view-pending-bill/view-pending-bill.component';
import { PayedVendorBillComponent } from './pages/VendorBill/VendorBillTable/payed-vendor-bill/payed-vendor-bill.component';

const routes: Routes = [
  {
    path:'', //Default Component to load from account section
    component: PendingVendorBillComponent
  },
  {
    path:'bill-pending',
    component: PendingVendorBillComponent
  },
  {
    path:'pending/:purchaseOrderNo',
    component: ViewPendingBillComponent
  },
  {
    path:'bill-payed',
    component: PayedVendorBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
