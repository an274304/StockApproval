import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryMngComponent } from './pages/master/category-mng/category-mng.component';

const routes: Routes = [
  {
    path:"category",
    component:CategoryMngComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
