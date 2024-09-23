export class UserMaster {
    id?: number;
    usTypeId?: number;
    usBranchId?: number;
    usDepartmentId?: number;
    usName?: string;
    usCode?: string;
    usPrefix?: string;
    usTypeName?: string;
    usImg?: string;
    usAddress?: string;
    usEmail?: string;
    usMob?: string;
    usGstin?: string;
    status?: boolean;
    created?: Date;
    createdBy?: string;
    updated?: Date;
    updatedBy?: string;
    UsPassword?: string;
  
    constructor(init?: Partial<UserMaster>) {
      if (init) {
        Object.assign(this, init);
      }
    }
  }
  