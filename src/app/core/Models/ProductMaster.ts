export class ProductMaster {
    id?: number;  
    catId?: number;
    proName?: string;
    proCode?: string;
    proPrefix?: string;
    proType?: string;
    proImg?: string;
    proBuyDt?: Date;
    proExpDt?: Date;
    status?: boolean;
    created?: Date;
    createdBy?: string;
    updated?: Date;
    updatedBy?: string;
  
    constructor(init?: Partial<ProductMaster>) {
      if (init) {
        Object.assign(this, init);
      }
    }
  }