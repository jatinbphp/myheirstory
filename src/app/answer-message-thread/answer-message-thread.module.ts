import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnswerMessageThreadPage } from './answer-message-thread.page';

const routes: Routes = [
  {
    path: '',
    component: AnswerMessageThreadPage
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
  declarations: [AnswerMessageThreadPage]
})
export class AnswerMessageThreadPageModule {}
