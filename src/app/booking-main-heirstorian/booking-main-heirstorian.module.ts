import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookingMainHeirstorianPage } from './booking-main-heirstorian.page';

const routes: Routes = [
  {
    path: '',
    component: BookingMainHeirstorianPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookingMainHeirstorianPage]
})
export class BookingMainHeirstorianPageModule {}
