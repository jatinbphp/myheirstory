import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowResearcherInformationPage } from './show-researcher-information.page';

const routes: Routes = [
  {
    path: '',
    component: ShowResearcherInformationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowResearcherInformationPage]
})
export class ShowResearcherInformationPageModule {}
