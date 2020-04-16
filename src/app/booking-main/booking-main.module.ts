import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BookingMainPageRoutingModule } from './booking.router.module';
import { BookingMainPage } from './booking-main.page';

const routes: Routes = [
  {
    path: '',
    component: BookingMainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingMainPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingMainPage]
})
export class BookingMainPageModule {}
