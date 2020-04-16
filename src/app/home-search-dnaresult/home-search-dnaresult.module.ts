import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeSearchDnaresultPage } from './home-search-dnaresult.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSearchDnaresultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeSearchDnaresultPage]
})
export class HomeSearchDnaresultPageModule {}
