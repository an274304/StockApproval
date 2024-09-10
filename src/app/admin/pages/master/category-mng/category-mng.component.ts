import { Component, inject, OnInit } from '@angular/core';
import { CategoryMngService } from '../../../services/category-mng.service';
import { CategoryMasterDTO } from '../../../../core/Models/CategoryMaster';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-category-mng',
  standalone: true,
  imports: [],
  templateUrl: './category-mng.component.html',
  styleUrl: './category-mng.component.css'
})
export class CategoryMngComponent implements OnInit {


  // Directly bind the Category ApiResult type
  categoryApiResult: ApiResult<CategoryMasterDTO> = { dataList: [], result: false, message: 'Connection Not Available.' };

  categoryService = inject(CategoryMngService);

  constructor() {

  }

  ngOnInit(): void {
   // this.bindCategory();
  }
  
  bindCategory() {
    debugger;
    this.categoryService.getCategories().subscribe({
      next: (response: ApiResult<CategoryMasterDTO>) => {
        this.categoryApiResult = response;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.categoryApiResult = { dataList: [], result: false, message: 'Error fetching categories' };
      }
    });
  }

}
