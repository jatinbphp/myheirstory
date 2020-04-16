import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessageExplanationPage } from './message-explanation.page';

const routes: Routes = [
  {
    path: '',
    component: MessageExplanationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessageExplanationPage]
})
export class MessageExplanationPageModule {}
