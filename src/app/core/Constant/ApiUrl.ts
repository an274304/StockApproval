
export const ApiUrl = {
    baseApiUrl: 'https://localhost:7071/api/',

    auth : {
        AUTH : 'v1/Auth/LogIn'
    },

    category : {
        GET_ALL_CATEGORY : 'v1/Category/all',
        SAVE_CATEGORY : 'v1/Category/save',
        UPDATE_CATEGORY : 'v1/Category/update',
        GET_CATEGORY_BY_ID : 'v1/Category/get/',
        DELETE_CATEGORY_BY_ID : 'v1/Category/delete/'
    },

    branch : {
        GET_ALL_BRANCH : 'v1/Branch/all',
        SAVE_BRANCH : 'v1/Branch/save',
        UPDATE_BRANCH : 'v1/Branch/update',
        GET_BRANCH_BY_ID : 'v1/Branch/get/',
        DELETE_BRANCH_BY_ID : 'v1/Branch/delete/'
    },

    vendor : {
        GET_ALL_VENDOR : 'v1/Vendor/all',
        SAVE_VENDOR : 'v1/Vendor/save',
        UPDATE_VENDOR : 'v1/Vendor/update',
        GET_VENDOR_BY_ID : 'v1/Vendor/get/',
        DELETE_VENDOR_BY_ID : 'v1/Vendor/delete/'
    },

    currency : {
        GET_ALL_CURRENCY : 'v1/Currency/all',
        SAVE_CURRENCY : 'v1/Currency/save',
        UPDATE_CURRENCY : 'v1/Currency/update',
        GET_CURRENCY_BY_ID : 'v1/Currency/get/',
        DELETE_CURRENCY_BY_ID : 'v1/Currency/delete/'
    },

    user : {
        GET_ALL_USER : 'v1/User/all',
        SAVE_USER : 'v1/User/save',
        UPDATE_USER : 'v1/User/update',
        GET_USER_BY_ID : 'v1/User/get/',
        DELETE_USER_BY_ID : 'v1/User/delete/'
    },

    department : {
        GET_ALL_DEPARTMENT : 'v1/Department/all',
        SAVE_DEPARTMENT : 'v1/Department/save',
        UPDATE_DEPARTMENT : 'v1/Department/update',
        GET_DEPARTMENT_BY_ID : 'v1/Department/get/',
        DELETE_DEPARTMENT_BY_ID : 'v1/Department/delete/'
    },

    product : {
        GET_ALL_PRODUCT : 'v1/Product/all',
        SAVE_PRODUCT : 'v1/Product/save',
        UPDATE_PRODUCT : 'v1/Product/update',
        GET_PRODUCT_BY_ID : 'v1/Product/get/',
        DELETE_PRODUCT_BY_ID : 'v1/Product/delete/'
    },

    purchase : {
        PURCHASE_ORDER : 'v1/Purchase/PurchaseOrder',
        ITEMS_SEND_TO_VENDOR : 'v1/Purchase/ItemsSendToVendor?purchaseOrderNo=',
        Get_Received_Items_For_Update : 'v1/Purchase/GetReceivedItemsForUpdate?purchaseOrderNo=',
        Bill_Send_TO_Accts_And_Stock : 'v1/Purchase/BillSendTOAcctsAndStock'
    },

    purchaseTable : {
        Get_Approval_Pending_Order_At_Admin : 'v1/PurchaseTable/GetApprovalPendingOrderAtAdmin',
        Get_Approved_Order_At_Admin : 'v1/PurchaseTable/GetApprovedOrderAtAdmin',
        Get_Rejected_Order_At_Admin : 'v1/PurchaseTable/GetRejectedOrderAtAdmin',
        Get_Waiting_Order_At_Admin : 'v1/PurchaseTable/GetWaitingOrderAtAdmin',
        Get_Order_To_Approve_At_Director : 'v1/PurchaseTable/GetOrderToApproveAtDirector',
    },

    stock : {
        Get_New_Stock_At_Admin : 'v1/Stock/GetNewStockAtAdmin',
        Get_New_Stock_Items_At_Admin : 'v1/Stock/GetNewStockItemsAtAdmin?purchaseOrderNo=',
        Update_New_Stock_Item : 'v1/Stock/UpdateNewStockItem',
        Load_Updated_Stock_Master_Items : 'v1/Stock/loadUpdatedStockMasterItems?purchaseOrderNo='
    }
  };