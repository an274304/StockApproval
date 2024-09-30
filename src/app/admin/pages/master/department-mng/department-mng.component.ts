import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentMaster } from '../../../../core/Models/DepartmentMaster';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { DepartmentMngService } from '../../../services/department-mng.service';
import { BranchMngService } from '../../../services/branch-mng.service';
import { BranchMaster } from '../../../../core/Models/BranchMaster';

@Component({
  selector: 'app-department-mng',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './department-mng.component.html',
  styleUrl: './department-mng.component.css'
})
export class DepartmentMngComponent implements OnInit {
  departmentListApiResult: ApiResult<DepartmentMaster> = { dataList: [], result: false, message: 'Connection Not Available.' };
  branchListApiResult: ApiResult<BranchMaster> = { dataList: [], result: false, message: 'Connection Not Available.' };

  departmentForm: FormGroup;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  @ViewChild('departmentFileInput') departmentFileInput: ElementRef<HTMLInputElement> | undefined;
  departmentSaveApiResult: ApiResult<DepartmentMaster> = { data: undefined, dataList: [], result: false, message: 'Connection Not Available.' };

  selectedDepartment: DepartmentMaster | null = null;

  searchTerm: string = '';
  filteredDepartments: DepartmentMaster[] = [];
  filteredBranches: BranchMaster[] = [];


  private departmentService = inject(DepartmentMngService);
  private branchService = inject(BranchMngService);

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      id: [0],
      branchId: [0],  // Added branchId field
      depName: [''],
      depCode: [''],
      depPrefix: [''],
      depImg: [null],
      status: [false],
      created: [null],
      createdBy: [''],
      updated: [null],
      updatedBy: ['']
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadBranches();
  }

  private loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (response: ApiResult<DepartmentMaster>) => {
        this.departmentListApiResult = response;
        this.filteredDepartments = response.dataList ?? [];
      },
      error: (err) => {
        console.error('Error fetching Departments', err);
        this.departmentListApiResult = { dataList: [], result: false, message: 'Error fetching Departments' };
        this.filteredDepartments = [];
      }
    });
  }

  private loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (response: ApiResult<BranchMaster>) => {
        this.branchListApiResult = response;
        this.filteredBranches = response.dataList ?? [];
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.branchListApiResult = { dataList: [], result: false, message: 'Error fetching categories' };
        this.filteredBranches = [];
      }
    });
  }

  onSearchChange(): void {
    if (this.searchTerm) {
      this.filteredDepartments = this.departmentListApiResult.dataList?.filter(department =>
        department.depName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) ?? [];
    } else {
      this.filteredDepartments = this.departmentListApiResult.dataList ?? [];
    }
  }

  onSelectDepartment(department: DepartmentMaster): void {
    this.departmentService.getDepartmentById(department.id!).subscribe({
      next: (response: ApiResult<DepartmentMaster>) => {
        if (response.result && response.data) {
          this.selectedDepartment = response.data;

          // Set the image preview URL
          this.imagePreviewUrl = this.selectedDepartment.depImg ? this.selectedDepartment.depImg : null;

          // Prepare form data without the file input field
          const { depImg, ...formData } = this.selectedDepartment;

          // Patch the form with other fields
          this.departmentForm.patchValue(formData);
        }
      },
      error: (err) => {
        console.error('Error fetching department by ID', err);
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
    this.departmentForm.reset();
    this.selectedDepartment = null;
    this.imagePreviewUrl = null;
  }

  submitForm(): void {
    if (this.departmentForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const formData = new FormData();
    this.appendFormData(formData);

    const saveOrUpdate$ = this.selectedDepartment?.id ?
      this.departmentService.updateDepartment(formData) :
      this.departmentService.saveDepartment(formData);

    saveOrUpdate$.subscribe({
      next: (response: ApiResult<DepartmentMaster>) => {
        this.departmentSaveApiResult = response;
        if (response.result) {
          alert(this.selectedDepartment ? 'Updated successfully' : 'Saved successfully');
          this.loadDepartments();
          this.resetForm();
        } else {
          alert('Failed to save');
        }
      },
      error: (err) => {
        console.error('Error saving department', err);
        this.departmentSaveApiResult = { dataList: [], result: false, message: 'Error saving category' };
      }
    });
  }

  private appendFormData(formData: FormData): void {
    formData.append('id', this.selectedDepartment?.id?.toString() ?? '0');
    formData.append('branchId', this.departmentForm.get('branchId')?.value ?? '');
    formData.append('depName', this.departmentForm.get('depName')?.value ?? '');
    formData.append('depCode', this.departmentForm.get('depCode')?.value ?? '');
    formData.append('depPrefix', this.departmentForm.get('depPrefix')?.value ?? '');
    formData.append('created', new Date().toISOString());
    formData.append('createdBy', 'getSessionIN');
    formData.append('updated', new Date().toISOString());
    formData.append('updatedBy', 'getSessionUP');
    if (this.departmentFileInput?.nativeElement) {
      const file = this.departmentFileInput.nativeElement.files?.[0];
      if (file) {
        formData.append('file', file, file.name);
      } else {
        // console.error('No file selected.');
      }
    }
  }
}
