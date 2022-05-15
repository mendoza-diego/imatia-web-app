import { InvoiceItem } from "./invoice-item";

export class Invoice {
  constructor(
    public id: number,
    public customer: string,
    public date: Date | null,
    public subtotal: number,
    public iva: number,
    public total: number,
    public items: InvoiceItem[]) {}
}