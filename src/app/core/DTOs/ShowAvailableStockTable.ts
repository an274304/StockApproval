export class ShowAvailableStockTable {
    categoryName?: string;
    productName?: string;
    total?: number;
    totalAvailable?: number;
    totalAssigned?: number;
    totalDispose?: number;

    constructor(init?: Partial<ShowAvailableStockTable>) {
        Object.assign(this, init);
    }
}
