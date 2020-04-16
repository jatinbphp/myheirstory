import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageMainPage } from './message-main.page';

const routes: Routes = [
  {
    path: 'message-main',
    component: MessageMainPage,
    children: [
      {
        path: 'message-main-heirstorian',
        children: [
          {
            path: '',
            loadChildren: '../message-main-heirstorian/message-main-heirstorian.module#MessageMainHeirstorianPageModule'
          }
        ]
      },
      {
        path: 'message-main-user',
        children: [
          {
            path: '',
            loadChildren: '../message-main-user/message-main-user.module#MessageMainUserPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/message-main/message-main-heirstorian',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/message-main/message-main/message-main-heirstorian',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MessageMainPageRoutingModule {}