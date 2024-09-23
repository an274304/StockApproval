import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UserMngService } from '../../../services/user-mng.service';
import { UserMaster } from '../../../../core/Models/UserMaster';
import { ApiResult } from '../../../../core/DTOs/ApiResult';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-mng',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './user-mng.component.html',
  styleUrl: './user-mng.component.css'
})
export class UserMngComponent {
  UserTypes = [
    {value:"1", text:"Admin"},
    {value:"1", text:"HOD"}
  ];

  Branches = [
    {value:"1", text:"New Delhi"}
  ];

  Departments = [
    {value:"1", text:"AIR EXPORT"}
  ];

  userListApiResult: ApiResult<UserMaster> = { dataList: [], result: false, message: 'Connection Not Available.' };
  userForm: FormGroup;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  @ViewChild('userFileInput') userFileInput: ElementRef<HTMLInputElement> | undefined;
  userSaveApiResult: ApiResult<UserMaster> = { data: undefined, dataList: [], result: false, message: 'Connection Not Available.' };

  selectedUser: UserMaster | null = null;

  searchTerm: string = '';
  filteredUsers: UserMaster[] = [];

  private userService = inject(UserMngService);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [0],
      usTypeId: [null],
      usBranchId: [null],
      usDepartmentId: [null],
      usName: [''],
      usCode: [''],
      usPrefix: [''],
      usTypeName: [''],
      usImg: [null],
      usAddress: [''],
      usEmail: [''],
      usMob: [''],
      usGstin: [''],
      status: [false],
      created: [null],
      createdBy: [''],
      updated: [null],
      updatedBy: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response: ApiResult<UserMaster>) => {
        this.userListApiResult = response;
        this.filteredUsers = response.dataList ?? [];
      },
      error: (err) => {
        console.error('Error fetching Users', err);
        this.userListApiResult = { dataList: [], result: false, message: 'Error fetching Users' };
        this.filteredUsers = [];
      }
    });
  }

  onSearchChange(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.userListApiResult.dataList?.filter(user =>
        user.usName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) ?? [];
    } else {
      this.filteredUsers = this.userListApiResult.dataList ?? [];
    }
  }

  onSelectUser(user: UserMaster): void {
    this.userService.getUserById(user.id!).subscribe({
      next: (response: ApiResult<UserMaster>) => {
        if (response.result && response.data) {
          this.selectedUser = response.data;

          // Set the image preview URL
          this.imagePreviewUrl = this.selectedUser.usImg ? this.selectedUser.usImg : null;

          // Prepare form data without the file input field
          const { usImg, ...formData } = this.selectedUser;

          // Patch the form with other fields
          this.userForm.patchValue(formData);
        }
      },
      error: (err) => {
        console.error('Error fetching user by ID', err);
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
    this.userForm.reset();
    this.selectedUser= null;
    this.imagePreviewUrl = null;
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
  
    const formData = new FormData();
    this.appendFormData(formData);
  
    const saveOrUpdate$ = this.selectedUser?.id ? 
      this.userService.updateUser(formData) : 
      this.userService.saveUser(formData);
  
    saveOrUpdate$.subscribe({
      next: (response: ApiResult<UserMaster>) => {
        this.userSaveApiResult = response;
        if (response.result) {
          alert(this.selectedUser ? 'Updated successfully' : 'Saved successfully');
          this.loadUsers();
          this.resetForm();
        } else {
          alert('Failed to save');
        }
      },
      error: (err) => {
        console.error('Error saving user', err);
        this.userSaveApiResult = { dataList: [], result: false, message: 'Error saving category' };
      }
    });
  }

  private appendFormData(formData: FormData): void {
    formData.append('id', this.selectedUser?.id?.toString() ?? '0');
    formData.append('usTypeId', this.userForm.get('usTypeId')?.value ?? '0');
    formData.append('usBranchId', this.userForm.get('usBranchId')?.value ?? '0');
    formData.append('usDepartmentId', this.userForm.get('usDepartmentId')?.value ?? '0');
    formData.append('usName', this.userForm.get('usName')?.value ?? '');
    formData.append('usEmail', this.userForm.get('usEmail')?.value ?? '');
    formData.append('usMob', this.userForm.get('usMob')?.value ?? '');
    formData.append('usAddress', this.userForm.get('usAddress')?.value ?? '');
    formData.append('created', new Date().toISOString());
    formData.append('createdBy', 'getSessionIN');
    formData.append('updated', new Date().toISOString());
    formData.append('updatedBy', 'getSessionUP');
    if (this.userFileInput?.nativeElement) {
      const file = this.userFileInput.nativeElement.files?.[0];
      if (file) {
        formData.append('file', file, file.name);
      } else {
       // console.error('No file selected.');
      }
    }
  }
}
