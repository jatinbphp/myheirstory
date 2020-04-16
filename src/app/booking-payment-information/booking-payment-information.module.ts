import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingPaymentInformationPage } from './booking-payment-information.page';

const routes: Routes = [
  {
    path: '',
    component: BookingPaymentInformationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingPaymentInformationPage]
})
export class BookingPaymentInformationPageModule {}
