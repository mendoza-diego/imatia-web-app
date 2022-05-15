import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Invoice } from './invoice';
import { MessageService } from './message.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  // private invoiceUrl = 'https://imatia-test.azurewebsites.net/invoices';
  private invoiceUrl = 'http://localhost:8080/invoices';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private invoices: Invoice[] = [];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoiceUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched invoices')),
        catchError(this.handleError<Invoice[]>('getInvoices', []))
      );
  }

  getInvoice(id: number): Observable<Invoice> {
    const url = `${this.invoiceUrl}/${id}`;
    return this.http.get<Invoice>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched invoice id=${id}`)),
      catchError(this.handleError<Invoice>(`getInvoice id=${id}`))
    );
  }

  deleteInvoice(id: number): Observable<Invoice> {
    const url = `${this.invoiceUrl}/${id}`;

    return this.http.delete<Invoice>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted invoice id=${id}`)),
      catchError(this.handleError<Invoice>('deleteInvoice'))
    );
  }

  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.put(`${this.invoiceUrl}/${invoice.id}`, invoice, this.httpOptions).pipe(
      tap(_ => this.log(`updated invoice id=${invoice.id}`)),
      catchError(this.handleError<any>('updateInvoice'))
    );
  }

  insertInvoice(invoice: Invoice): Observable<any> {
    return this.http.post(this.invoiceUrl, invoice, this.httpOptions).pipe(
      tap(id => Swal.fire(`Factura #${id}`, '¡Factura guardada!', 'success')),
      catchError(this.handleError<any>('updateInvoice'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`InvoiceService: ${message}`);
  }
}
