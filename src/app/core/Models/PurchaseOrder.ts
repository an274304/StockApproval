export class PurchaseOrder {
    id?: number;
    purchaseOrderNo?: string;
    purchaseRemark?: string;
    purchaseCurrency?: string;
    purchaseOrderDt?: Date;
    purchaseExpDelDt?: Date;
    isFromAdminToDirector?: boolean;
    isFromAdminToVendor?: boolean;
    vendorBillPath?: string;
    isFromAdminToAccts?: boolean;
    isFromAdminToStock?: boolean;
    acctsBillPayReceipt?: string;
    isAcctsBillPayed?: boolean;
    isAdminNewStockUpdate?: boolean;
    status?: boolean;
    created?: Date;
    createdBy?: string;
    updated?: Date;
    updatedBy?: string;
  
    constructor(init?: Partial<PurchaseOrder>) {
      if (init) {
        Object.assign(this, init);
      }
    }
  }
  