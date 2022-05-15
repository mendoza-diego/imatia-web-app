import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  search: string = "";
  
  constructor(private service: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices(): void {
    this.service.getInvoices()
    .subscribe(invoices => this.invoices = invoices);
  }

  deleteInvoice(invoice: Invoice): void {
    this.invoices = this.invoices.filter(h => h !== invoice);
    this.service.deleteInvoice(invoice.id).subscribe();
  }

  isAvailableToDelete(invoice: Invoice): boolean {
    return invoice.id == Math.max.apply(Math, this.invoices.map(i => i.id));
  }
}
