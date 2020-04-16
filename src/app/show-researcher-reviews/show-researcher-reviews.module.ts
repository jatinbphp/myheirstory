import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowResearcherReviewsPage } from './show-researcher-reviews.page';

const routes: Routes = [
  {
    path: '',
    component: ShowResearcherReviewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowResearcherReviewsPage]
})
export class ShowResearcherReviewsPageModule {}
