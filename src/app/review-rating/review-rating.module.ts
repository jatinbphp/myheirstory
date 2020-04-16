import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReviewRatingPage } from './review-rating.page';
import { StarRating } from 'ionic4-star-rating';

const routes: Routes = [
  {
    path: '',
    component: ReviewRatingPage
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
  exports: [ StarRating ],
  declarations: [ReviewRatingPage, StarRating]
})
export class ReviewRatingPageModule {}
