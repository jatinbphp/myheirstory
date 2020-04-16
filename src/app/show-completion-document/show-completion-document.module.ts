import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowCompletionDocumentPage } from './show-completion-document.page';

const routes: Routes = [
  {
    path: '',
    component: ShowCompletionDocumentPage
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
  declarations: [ShowCompletionDocumentPage]
})
export class ShowCompletionDocumentPageModule {}
