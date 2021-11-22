export interface ExpenseEntry {
    _id?: string;
    id: number;
    item: string;
    amount: number;
    category: string;
    location: string;
    spendOn: Date;
    createdOn: Date;
 }