import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceService } from './invoice.service';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './message.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TableFilterPipe } from './table-filter.pipe';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    TableFilterPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
