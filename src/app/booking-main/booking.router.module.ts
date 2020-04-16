import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingMainPage } from './booking-main.page';

const routes: Routes = [
  {
    path: 'booking-main',
    component: BookingMainPage,
    children: [
      {
        path: 'booking-main-heirstorian',
        children: [
          {
            path: '',
            loadChildren: '../booking-main-heirstorian/booking-main-heirstorian.module#BookingMainHeirstorianPageModule'
          }
        ]
      },
      {
        path: 'booking-main-user',
        children: [
          {
            path: '',
            loadChildren: '../booking-main-user/booking-main-user.module#BookingMainUserPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/booking-main/booking-main-heirstorian',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/booking-main/booking-main/booking-main-heirstorian',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookingMainPageRoutingModule {}