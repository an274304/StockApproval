import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMngComponent } from './pages/master/category-mng/category-mng.component';
import { VendorMngComponent } from './pages/master/vendor-mng/vendor-mng.component';
import { CurrencyMngComponent } from './pages/master/currency-mng/currency-mng.component';
import { UserMngComponent } from './pages/master/user-mng/user-mng.component';
import { DepartmentMngComponent } from './pages/master/department-mng/department-mng.component';
import { BranchMngComponent } from './pages/master/branch-mng/branch-mng.component';

const routes: Routes = [
  {
    path:"category",
    component:CategoryMngComponent
  },
  {
    path:"vendor",
    component:VendorMngComponent
  },
  {
    path:"currency",
    component:CurrencyMngComponent
  },
  {
    path:"user",
    component:UserMngComponent
  },
  {
    path:"branch",
    component:BranchMngComponent
  },
  {
    path:"department",
    component:DepartmentMngComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
