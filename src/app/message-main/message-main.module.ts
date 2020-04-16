import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MessageMainPageRoutingModule } from './message.router.module';
import { MessageMainPage } from './message-main.page';

const routes: Routes = [
  {
    path: '',
    component: MessageMainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageMainPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessageMainPage]
})
export class MessageMainPageModule {}
