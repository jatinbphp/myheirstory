import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  }, 
  { 
    path: 'home-search', 
    loadChildren: './home-search/home-search.module#HomeSearchPageModule' 
  },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' 
  },
  { 
    path: 'profile-main', 
    loadChildren: './profile-main/profile-main.module#ProfileMainPageModule' 
  },
  { 
    path: 'forgot-password', 
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' 
  },
  { 
    path: 'make-verification', 
    loadChildren: './make-verification/make-verification.module#MakeVerificationPageModule' 
  },
  { 
    path: 'reset-password', 
    loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' 
  },
  { 
    path: 'signup', 
    loadChildren: './signup/signup.module#SignupPageModule' 
  },
  { 
    path: 'change-password', 
    loadChildren: './change-password/change-password.module#ChangePasswordPageModule' 
  },
  { 
    path: 'search-main', 
    loadChildren: './search-main/search-main.module#SearchMainPageModule' 
  },
  { 
    path: 'show-heirstorian', 
    loadChildren: './show-heirstorian/show-heirstorian.module#ShowHeirstorianPageModule' 
  },
  { 
    path: 'review-rating', 
    loadChildren: './review-rating/review-rating.module#ReviewRatingPageModule' 
  },
  { 
    path: 'book-heirstorian', 
    loadChildren: './book-heirstorian/book-heirstorian.module#BookHeirstorianPageModule' 
  },
  { 
    path: 'booking-payments', 
    loadChildren: './booking-payments/booking-payments.module#BookingPaymentsPageModule' 
  },
  { 
    path: 'services-main', 
    loadChildren: './services-main/services-main.module#ServicesMainPageModule' 
  },
  { 
    path: 'services-add', 
    loadChildren: './services-add/services-add.module#ServicesAddPageModule' 
  },
  { 
    path: 'payment-information', 
    loadChildren: './payment-information/payment-information.module#PaymentInformationPageModule' 
  },
  { 
    path: 'researcher-benefits', 
    loadChildren: './researcher-benefits/researcher-benefits.module#ResearcherBenefitsPageModule' 
  },
  { 
    path: 'on-boarding', 
    loadChildren: './on-boarding/on-boarding.module#OnBoardingPageModule' 
  },
  { 
    path: 'search-filters', 
    loadChildren: './search-filters/search-filters.module#SearchFiltersPageModule' 
  },
  { 
  	path: 'message-heirstorian', 
  	loadChildren: './message-heirstorian/message-heirstorian.module#MessageHeirstorianPageModule' 
  },  
  { 
    path: 'message-main', 
    loadChildren: './message-main/message-main.module#MessageMainPageModule' 
  },
  /*
  { 
    path: 'message-main-heirstorian', 
    loadChildren: './message-main-heirstorian/message-main-heirstorian.module#MessageMainHeirstorianPageModule' 
  },
  { 
    path: 'message-main-user', 
    loadChildren: './message-main-user/message-main-user.module#MessageMainUserPageModule' 
  },
  */  
  { 
    path: 'show-researcher', 
    loadChildren: './show-researcher/show-researcher.module#ShowResearcherPageModule' 
  },
  { 
    path: 'show-message-thread', 
    loadChildren: './show-message-thread/show-message-thread.module#ShowMessageThreadPageModule' 
  },
  { 
    path: 'answer-message-thread', 
    loadChildren: './answer-message-thread/answer-message-thread.module#AnswerMessageThreadPageModule' 
  },
  { 
    path: 'booking-main', 
    loadChildren: './booking-main/booking-main.module#BookingMainPageModule' 
  },
  { 
    path: 'upload-completion-document', 
    loadChildren: './upload-completion-document/upload-completion-document.module#UploadCompletionDocumentPageModule' 
  },
  { 
    path: 'show-completion-document', 
    loadChildren: './show-completion-document/show-completion-document.module#ShowCompletionDocumentPageModule' 
  },
  { 
  	path: 'view-profile', 
  	loadChildren: './view-profile/view-profile.module#ViewProfilePageModule' 
  },
  { 
    path: 'message-explanation', 
    loadChildren: './message-explanation/message-explanation.module#MessageExplanationPageModule' 
  },
  { 
    path: 'invite', 
    loadChildren: './invite/invite.module#InvitePageModule' 
  },
  { 
    path: 'show-researcher-information', loadChildren: './show-researcher-information/show-researcher-information.module#ShowResearcherInformationPageModule' 
  },
  { 
    path: 'booking-payment-information', loadChildren: './booking-payment-information/booking-payment-information.module#BookingPaymentInformationPageModule' 
  }
  /*{ 
    path: 'booking-main-heirstorian', 
    loadChildren: './booking-main-heirstorian/booking-main-heirstorian.module#BookingMainHeirstorianPageModule' 
  },
  { 
    path: 'booking-main-user', 
    loadChildren: './booking-main-user/booking-main-user.module#BookingMainUserPageModule' 
  }*/
  /*{ 
    path: 'show-researcher-info', 
    loadChildren: './show-researcher-info/show-researcher-info.module#ShowResearcherInfoPageModule' 
  },
  { 
    path: 'show-researcher-speciality', 
    loadChildren: './show-researcher-speciality/show-researcher-speciality.module#ShowResearcherSpecialityPageModule' 
  },
  { 
    path: 'show-researcher-reviews', 
    loadChildren: './show-researcher-reviews/show-researcher-reviews.module#ShowResearcherReviewsPageModule' 
  },*/
  /*
  { 
    path: 'home-search-familytree', 
    loadChildren: './home-search-familytree/home-search-familytree.module#HomeSearchFamilytreePageModule' 
  },
  { 
    path: 'home-search-dnaresult', 
    loadChildren: './home-search-dnaresult/home-search-dnaresult.module#HomeSearchDnaresultPageModule' 
  },
  */ 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
