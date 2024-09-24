import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { ProductMaster } from '../../../../core/Models/ProductMaster';
import { ProductMngService } from '../../../services/product-mng.service';

@Component({
  selector: 'app-product-mng',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './product-mng.component.html',
  styleUrl: './product-mng.component.css'
})
export class ProductMngComponent {
  productListApiResult: ApiResult<ProductMaster> = { dataList: [], result: false, message: 'Connection Not Available.' };
  productForm: FormGroup;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  @ViewChild('productFileInput') productFileInput: ElementRef<HTMLInputElement> | undefined;
  productSaveApiResult: ApiResult<ProductMaster> = { data: undefined, dataList: [], result: false, message: 'Connection Not Available.' };

  selectedProduct: ProductMaster | null = null;

  searchTerm: string = '';
  filteredProducts: ProductMaster[] = [];

  Categories = [
    {value:"1", text:"Laptop"}
  ];

  private productService = inject(ProductMngService);

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id: [0],
      catId: [0],
      proName: [''],
      proCode: [''],
      proPrefix: [''],
      proType: [''],
      proImg: [null],
      proBuyDt: [null],
      proExpDt: [null],
      status: [false],
      created: [null],
      createdBy: [''],
      updated: [null],
      updatedBy: ['']
    });
  }

  ngOnInit(): void {
    this.loadProductes();
  }

  private loadProductes(): void {
    this.productService.getProducts().subscribe({
      next: (response: ApiResult<ProductMaster>) => {
        this.productListApiResult = response;
        this.filteredProducts = response.dataList ?? [];
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.productListApiResult = { dataList: [], result: false, message: 'Error fetching products' };
        this.filteredProducts = [];
      }
    });
  }

  onSearchChange(): void {
    if (this.searchTerm) {
      this.filteredProducts = this.productListApiResult.dataList?.filter(product =>
        product.proName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) ?? [];
    } else {
      this.filteredProducts = this.productListApiResult.dataList ?? [];
    }
  }

  onSelectProduct(product: ProductMaster): void {
    this.productService.getProductById(product.id!).subscribe({
      next: (response: ApiResult<ProductMaster>) => {
        if (response.result && response.data) {
          this.selectedProduct = response.data;

          // Set the image preview URL
          this.imagePreviewUrl = this.selectedProduct.proImg ? this.selectedProduct.proImg : null;

          // Prepare form data without the file input field
          const { proImg, ...formData } = this.selectedProduct;

          // Patch the form with other fields
          this.productForm.patchValue(formData);
        }
      },
      error: (err) => {
        console.error('Error fetching product by ID', err);
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreviewUrl = e.target?.result as string | ArrayBuffer | null;
      };

      reader.readAsDataURL(file);
    }
  }


  resetForm(): void {
    this.productForm.reset();
    this.selectedProduct = null;
    this.imagePreviewUrl = null;
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
  
    const formData = new FormData();
    this.appendFormData(formData);
  
    const saveOrUpdate$ = this.selectedProduct?.id ? 
      this.productService.updateProduct(formData) : 
      this.productService.saveProduct(formData);
  
    saveOrUpdate$.subscribe({
      next: (response: ApiResult<ProductMaster>) => {
        this.productSaveApiResult = response;
        if (response.result) {
          alert(this.selectedProduct ? 'Updated successfully' : 'Saved successfully');
          this.loadProductes();
          this.resetForm();
        } else {
          alert('Failed to save');
        }
      },
      error: (err) => {
        console.error('Error saving category', err);
        this.productSaveApiResult = { dataList: [], result: false, message: 'Error saving category' };
      }
    });
  }

  private appendFormData(formData: FormData): void {
    formData.append('id', this.selectedProduct?.id?.toString() ?? '0');
    formData.append('catId', this.productForm.get('catId')?.value ?? '');
    formData.append('proName', this.productForm.get('proName')?.value ?? '');
    formData.append('proCode', this.productForm.get('proCode')?.value ?? '');
    formData.append('proPrefix', this.productForm.get('proPrefix')?.value ?? '');
    formData.append('created', new Date().toISOString());
    formData.append('createdBy', 'getSessionIN');
    formData.append('updated', new Date().toISOString());
    formData.append('updatedBy', 'getSessionUP');
    if (this.productFileInput?.nativeElement) {
      const file = this.productFileInput.nativeElement.files?.[0];
      if (file) {
        formData.append('file', file, file.name);
      } else {
       // console.error('No file selected.');
      }
    }
  }
}
