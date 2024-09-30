import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewApprovedBillComponent } from './pages/vendorBill/view-approved-bill/view-approved-bill.component';
import { PendingBillComponent } from './pages/vendorBillTable/pending-bill/pending-bill.component';
import { ViewPendingBillComponent } from './pages/vendorBill/view-pending-bill/view-pending-bill.component';
import { ApprovedBillComponent } from './pages/vendorBillTable/approved-bill/approved-bill.component';
import { RejectedBillComponent } from './pages/vendorBillTable/rejected-bill/rejected-bill.component';
import { ViewRejectedBillComponent } from './pages/vendorBill/view-rejected-bill/view-rejected-bill.component';

const routes: Routes = [
  {
    path:'', //Default Component to load from director section
    component: PendingBillComponent
  },
  {
    path:'bill-pending',
    component: PendingBillComponent
  },
  {
    path:'pending/:purchaseOrderNo',
    component: ViewPendingBillComponent
  },
  {
    path:'bill-approved',
    component: ApprovedBillComponent
  },
  {
    path:'approved/:purchaseOrderNo',
    component: ViewApprovedBillComponent
  },
  {
    path:'bill-rejected',
    component: RejectedBillComponent
  },
  {
    path:'rejected/:purchaseOrderNo',
    component: ViewRejectedBillComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorRoutingModule { }
