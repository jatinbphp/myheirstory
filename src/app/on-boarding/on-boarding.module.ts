import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnBoardingPage } from './on-boarding.page';

const routes: Routes = [
  {
    path: '',
    component: OnBoardingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OnBoardingPage]
})
export class OnBoardingPageModule {}
