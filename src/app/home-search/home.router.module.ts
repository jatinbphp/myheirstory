import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeSearchPage } from './home-search.page';

const routes: Routes = [
  {
    path: 'home-search',
    component: HomeSearchPage,
    children: [
      {
        path: 'home-search-familytree',
        children: [
          {
            path: '',
            loadChildren: '../home-search-familytree/home-search-familytree.module#HomeSearchFamilytreePageModule'
          }
        ]
      },
      {
        path: 'home-search-dnaresult',
        children: [
          {
            path: '',
            loadChildren: '../home-search-dnaresult/home-search-dnaresult.module#HomeSearchDnaresultPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home-search/home-search-familytree',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home-search/home-search/home-search-familytree',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeSearchPageRoutingModule {}