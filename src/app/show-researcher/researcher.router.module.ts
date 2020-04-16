import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowResearcherPage } from './show-researcher.page';

const routes: Routes = [
  {
    path: 'show-researcher',
    component: ShowResearcherPage,
    children: [
      {
        path: 'show-researcher-info',
        children: [
          {
            path: '',
            loadChildren: '../show-researcher-info/show-researcher-info.module#ShowResearcherInfoPageModule'
          }
        ]
      },
      {
        path: 'show-researcher-speciality',
        children: [
          {
            path: '',
            loadChildren: '../show-researcher-speciality/show-researcher-speciality.module#ShowResearcherSpecialityPageModule'
          }
        ]
      },
      {
        path: 'show-researcher-reviews',
        children: [
          {
            path: '',
            loadChildren: '../show-researcher-reviews/show-researcher-reviews.module#ShowResearcherReviewsPageModule'
          }
        ]
      }/*,
      {
        path: '',
        redirectTo: '/show-researcher/show-researcher-info',
        pathMatch: 'full'
      }*/
    ]
  },
  {
    path: '',
    redirectTo: '/show-researcher/show-researcher/show-researcher-info/:heirstorian_id',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShowResearcherPageRoutingModule {}