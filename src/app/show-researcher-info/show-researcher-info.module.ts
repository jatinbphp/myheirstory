import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowResearcherInfoPage } from './show-researcher-info.page';

const routes: Routes = [
  {
    path: '',
    component: ShowResearcherInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowResearcherInfoPage]
})
export class ShowResearcherInfoPageModule {}
