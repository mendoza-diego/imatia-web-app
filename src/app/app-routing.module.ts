import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'new', component: InvoiceDetailsComponent },
  { path: 'edit/:id', component: InvoiceDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}