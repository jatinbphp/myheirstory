import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Stripe } from '@ionic-native/stripe/ngx';//STRIP
import { PayPal } from '@ionic-native/paypal/ngx';//PayPal
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

//IMAGE UPLOAD
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//IMAGE UPLOAD
//FILE UPLOAD
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
//FILE UPLOAD
//SOCIAL-SHARING
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//SOCIAL-SHARING
import { SearchFiltersPageModule } from './search-filters/search-filters.module';
import { ShowResearcherInformationPageModule } from './show-researcher-information/show-researcher-information.module';
import { MessageExplanationPageModule } from './message-explanation/message-explanation.module';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';//DEEPLINK

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    SearchFiltersPageModule,
    ShowResearcherInformationPageModule,
    MessageExplanationPageModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    Stripe,
    PayPal,
    InAppBrowser,
    HttpClient,
    Deeplinks,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Base64,
    Camera,
    FilePath,
    File,
    FileChooser,
    FileTransfer,
    FileTransferObject,
    DocumentViewer,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
