import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShowResearcherPageRoutingModule } from './researcher.router.module';
import { ShowResearcherPage } from './show-researcher.page';

const routes: Routes = [
  {
    path: '',
    component: ShowResearcherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowResearcherPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowResearcherPage]
})
export class ShowResearcherPageModule {}
