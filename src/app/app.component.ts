import { Component } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ClientService } from './providers/client.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';//DEEPLINK
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Search',
      url: '/search-main',
      icon: 'search'
    },
    {
      title: 'Become A Researcher',
      url: '/signup',
      icon: 'flask'
    },
    {
      title: 'SignUp',
      url: '/signup',
      icon: 'person-add'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'person'
    }
  ];    

  queryString: any=[];
  has_to_verify:any={};
  has_to_verify_length:number=0;
  resultData:any={};
  token: string;
  welcomeString: string;
  userProfilePicURL: string;
  userProfilePic: string;
  isAnyLoggedin: number=0;
  lastBack: any;
  currentPage: any;

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar,
  public client: ClientService, public events: Events, private inAppBrowser: InAppBrowser, 
  private googlePlus: GooglePlus, private fbook: Facebook, private deeplinks: Deeplinks)
  {
    //get event
    events.subscribe('user:loggedin', (userData) => 
    {
      // user and time are the same arguments passed in `events.publish(user, time)`      
      if(userData.first_name!=null && userData.last_name!=null)
      {
        this.welcomeString=userData.first_name + " " + userData.last_name;
      }
      else
      {
        this.welcomeString=userData.email;
      }
      this.userProfilePicURL=this.client.search_profile_photo_url
      this.userProfilePic=userData.photo;
      if(userData.user_type=="heirstorian")
      {
        this.isAnyLoggedin=1;        
        this.appPages = 
        [
          {
            title: 'Home',
            url: '/home',
            icon: 'home'
          },
          {
            title: 'Search',
            url: '/search-main',
            icon: 'search'
          },
          {
            title: 'Profile',
            url: '/view-profile',
            icon: 'person'
          },
          {
            title: 'Inbox',
            url: '/message-main',
            icon: 'mail'
          },
          {
            title: 'Security + Login',
            url: '/change-password',
            icon: 'key'
          },
          {
            title: 'Payments',
            url: '/payment-information',
            icon: 'cash'
          },
          {
            title: 'Services',
            url: '/services-main',
            icon: 'options'
          },
          {
            title: 'Bookings',
            url: '/booking-main',
            icon: 'calendar'
          }
        ];
      }
      if(userData.user_type=="user")
      {
        this.isAnyLoggedin=1; 
        this.appPages = 
        [
          {
            title: 'Home',
            url: '/home',
            icon: 'home'
          },
          {
            title: 'Search',
            url: '/search-main',
            icon: 'search'
          },
          {
            title: 'Profile',
            url: '/view-profile',
            icon: 'person'
          },
          {
            title: 'Inbox',
            url: '/message-main',
            icon: 'mail'
          },
          {
            title: 'Security + Login',
            url: '/change-password',
            icon: 'key'
          },
          /*{
            title: 'Payments',
            url: '/list',
            icon: 'cash'
          },*/
          {
            title: 'Bookings',
            url: '/booking-main',
            icon: 'calendar'
          }
        ];       
      }
    });
    //get event

    this.initializeApp();
    this.token=localStorage.getItem('token');    
    /* IF TOKEN EXISTS ROUTE TO PROFILE ELSE TO HOME */
    if(this.token === null || this.token === "undefined" ||  this.token === "null" ||  this.token === "")
    {
      this.has_to_verify=JSON.parse(localStorage.getItem('has_to_verify'));
      if(this.has_to_verify != null)
      {
        this.has_to_verify_length=this.has_to_verify.length;
        if(this.has_to_verify_length > 0)
        {
          this.queryString = 
          {
            from_page:this.has_to_verify[0].from_page,
            email:this.has_to_verify[0].email
          };

          let navigationExtras: NavigationExtras = 
          {
            queryParams: 
            {
              special: JSON.stringify(this.queryString)
            }
          };
          this.client.router.navigate(['/make-verification'], navigationExtras)
        }
      } 
      else
      {
        this.client.router.navigate(['/home'])
      }
    }     
    else
    {
      this.client.router.navigate(['/view-profile'])
      //creating event
      this.client.get_user_profile().then(result => 
      { 
        this.resultData=result;  
        this.events.publish('user:loggedin',this.resultData);
        //console.log(this.resultData);      
      },
      error => 
      {
        console.log();
      }); 
      //creating event
    }
    /* IF TOKEN EXISTS ROUTE TO PROFILE ELSE TO HOME */
  }

  initializeApp()
  {
    this.platform.ready().then(() => 
    {
      //this.client.router.navigate(['/home'])
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      //DEEPLINK
      this.deeplinks.route({'/payment-information/:account_to_accept_payment':'PaymentInformationPage'}).subscribe(match => 
      {
        //console.log('Successfully matched route', match);
        this.client.router.navigate(['/payment-information/'])
        //creating event
        this.events.publish('payPal:account_to_accept_payment',match.$args.account_to_accept_payment);
        //creating event
      }, nomatch => 
      {
        // nomatch.$link - the full link data
        //console.log('NoMatch=', nomatch);
        //this.client.router.navigate(['/home'])
      });
       //DEEPLINK
    });

    //EXIT APP
    this.platform.backButton.subscribe(() => 
    {      
      if(Date.now() - this.lastBack < 500) 
      {
        let messageDisplay=this.client.showMessageOnExit("Are you sure to Exit?", this.isAnyLoggedin);
      }                  
      this.lastBack= Date.now();      
    });
    //EXIT APP
  }

  //Social Links
  openSocialLink(targetUrl)
  {
    const options : InAppBrowserOptions = {
        location : 'yes',//Or 'no' 
        hidden : 'no', //Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes',//Android only ,shows browser zoom controls 
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', //Android only 
        closebuttoncaption : 'Close', //iOS only
        disallowoverscroll : 'no', //iOS only 
        toolbar : 'yes', //iOS only 
        enableViewportScale : 'no', //iOS only 
        allowInlineMediaPlayback : 'no',//iOS only 
        presentationstyle : 'pagesheet',//iOS only 
        fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(targetUrl,target,options);
  }

  //In AppBrowser Functions
  help()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"gethelp",target,options);
  }

  genealogist()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"what-is-genealogist",target,options);
  }

  protection()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"bookingprotection",target,options);
  }

  service_fees()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"service-fees",target,options);
  }

  terms()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"tos",target,options);
  }

  privacy()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"privacy",target,options);
  }

  about()
  {
    const options : InAppBrowserOptions = 
    {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
      closebuttoncaption : 'Close', //iOS only
      disallowoverscroll : 'no', //iOS only 
      toolbar : 'yes', //iOS only 
      enableViewportScale : 'no', //iOS only 
      allowInlineMediaPlayback : 'no',//iOS only 
      presentationstyle : 'pagesheet',//iOS only 
      fullscreen : 'yes',//Windows only    
    };
    let target = "_system";
    this.inAppBrowser.create(this.client.site_url+"about",target,options);
  }
  //In AppBrowser Functions

  logout()
  {    
    this.platform.backButton.subscribeWithPriority(9999, () => 
    {
      document.addEventListener('backbutton', function (event)
      {
        event.preventDefault();
        event.stopPropagation();
      }, false);
    });//STOP PROPOGATION FOR BACK-BUTTON    
    
    return new Promise((resolve, reject) => 
    {
      let options = this.client.getHeaderOptions();
      let postData = 
      {
        1:1
      }
      this.client.http.post(this.client.api_url + "user/logout", postData, options).subscribe((res: any) => 
      {
        if(res.success == true)
        {  
          //GOOGLE LOGOUT
          this.googlePlus.logout().then(res => 
          {}, 
          err => 
          {
            console.log(err);
          });
          //GOOGLE LOGOUT

          //FB LOGOUT
          this.fbook.logout().then(res => 
          {}, 
          err => 
          {
            console.log(err);
          });          
          //FB LOGOUT

          //RESET MENU AND REMOVE LOGOUT LINK       
          this.isAnyLoggedin=0;
          this.appPages = 
          [
            {
              title: 'Home',
              url: '/home',
              icon: 'home'
            },
            {
              title: 'Search',
              url: '/search-main',
              icon: 'search'
            },
            {
              title: 'Become A Researcher',
              url: '/signup',
              icon: 'flask'
            },
            {
              title: 'SignUp',
              url: '/signup',
              icon: 'person-add'
            },
            {
              title: 'Login',
              url: '/login',
              icon: 'person'
            }
          ];
          //RESET MENU AND REMOVE LOGOUT LINK

          let messageDisplay=this.client.showMessage("You have successfully logged out!");
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
          localStorage.removeItem("email");
          localStorage.removeItem("user_type");
          localStorage.removeItem("photo"); 
          this.client.router.navigate(['/home'])
          resolve(res.data);
          reject(messageDisplay);                    
        }
        else
        {
          let messageDisplay=this.client.showMessage(res.message);
          reject(messageDisplay);
        }      
      },
      err => 
      {
        let errorMessage=this.client.getErrorMessage(err);
        this.client.showMessage(errorMessage);
        reject(errorMessage);
      });
    });//CALLING API
  }
}
