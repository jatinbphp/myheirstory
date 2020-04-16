import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploadCompletionDocumentPage } from './upload-completion-document.page';

const routes: Routes = [
  {
    path: '',
    component: UploadCompletionDocumentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadCompletionDocumentPage]
})
export class UploadCompletionDocumentPageModule {}
