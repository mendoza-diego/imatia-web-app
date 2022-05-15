import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Invoice } from '../invoice';
import { InvoiceItem } from '../invoice-item';
import { InvoiceService } from '../invoice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  today: Date = new Date(); 
  ivas = [4, 10, 21];
  
  invoice: Invoice = {
    id: 0,
    customer: "",
    date: null,
    subtotal: 0,
    iva: 0,
    total: 0,
    items: [],
  };

  item: InvoiceItem = {
    code: "",
    description: "",
    qty: 0,
    price: 0,
    iva: null
  };

  constructor(
    private route: ActivatedRoute,
    private service: InvoiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (id && id > 0) {
      this.service.getInvoice(id)
        .subscribe(invoice => this.invoice = invoice);
    }
  }

  goBack(): void {
    this.location.back();
  }

  deleteInvoiceItem(item: InvoiceItem): void {
    this.invoice!.items = this.invoice!.items.filter(i => i !== item);
    this.calculateTotals();
  }

  save(): void {
    if (this.invoice.id) {
      this.service.updateInvoice(this.invoice)
        .subscribe(() => this.goBack());
    } else {
      this.service.insertInvoice(this.invoice)
        .subscribe(() => this.goBack());
    }
  }

  calculateTotals(): void {
    let subtotal = 0;
    let iva = 0;
    let total = 0;

    this.invoice.items.forEach(function(item) {
      let itemSubTotal = item.price * item.qty;
      let itemIva = itemSubTotal * (item.iva!/100);
      let itemTotal = itemSubTotal + itemIva;

      subtotal += itemSubTotal;
      iva += itemIva;
      total += itemTotal;
    });
    
    this.invoice.subtotal = subtotal;
    this.invoice.iva = iva;
    this.invoice.total = total;
  }

  addItem(item: InvoiceItem): void {
    if (item) {
      if (this.invoice.items) {
        this.invoice.items.push(item);
      } else {
        this.invoice.items = [item];
      }

      this.calculateTotals();
      this.item = new InvoiceItem("", "", 0, 0, null);
    }
  }
}
