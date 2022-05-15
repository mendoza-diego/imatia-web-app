export class InvoiceItem {
  constructor(
    public code: string,
    public description: string,
    public qty: number,
    public price: number,
    public iva: number | null) {}
}