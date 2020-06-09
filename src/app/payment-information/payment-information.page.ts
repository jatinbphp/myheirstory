import { Component, OnInit } from '@angular/core';
import { LoadingController, Events } from '@ionic/angular';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { AppComponent } from '../app.component'
import { ActivatedRoute, Router } from "@angular/router";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

declare var paypalConnect: any;//PAYPAL IDENTITY

@Component({
	selector: 'app-payment-information',
	templateUrl: './payment-information.page.html',
	styleUrls: ['./payment-information.page.scss'],
})
export class PaymentInformationPage implements OnInit 
{
	public account_to_accept_payment: any={};//WILL INITILIZE FROM PAYPAL RESPONSE [app.component.ts]
	public resultData:any={};
	public selectedPaymentMethod: string="";
	public isStripe: boolean=false;
	public isPayPal: boolean=false;
	public stripAccount: string="";

	constructor(public fb: FormBuilder, public client: ClientService, 
	public loadingCtrl: LoadingController, private appComp: AppComponent, public events: Events, 
	private inAppBrowser: InAppBrowser) 
	{
		paypalConnect();//PAYPAL IDENTITY
		
		//GET EVENT AFTER PAYPAL IDENTITY RESPOND
	    events.subscribe('payPal:account_to_accept_payment', (paypalAuthencationData) => 
	    {
		    console.log(paypalAuthencationData);
	    	if(paypalAuthencationData!='')
	    	{
		    	this.account_to_accept_payment=paypalAuthencationData.split("=");
		    	if(this.account_to_accept_payment.length > 0)
		    	{	    		
	    			var objResponse = JSON.parse(this.account_to_accept_payment[1]);		    		
	    			this.account_to_accept_payment=objResponse;
	    		
	    			//console.log("Account=",this.account_to_accept_payment.account);
	    			//console.log("Email=",this.account_to_accept_payment.email);
	    			//console.log("PayMethod=",this.account_to_accept_payment.payment_method);	    		
	    			this.savePayPalInformation();
	    			
		    	}//UPDATE PAYMENT INFORMATION
	    	}
	    });
	    //GET EVENT AFTER PAYPAL IDENTITY RESPOND
	}

	public paymentInfoForm = this.fb.group({
		payment_option: ['', Validators.required],
		account_to_accept_payment: ['', Validators.required]
	});

	savePayPalInformation() 
	{

		let data={
			user_id:localStorage.getItem('user_id'),
			email:localStorage.getItem('email'),
			user_type:'heirstorian',
			payment_option:this.account_to_accept_payment.payment_method,
			stripe_account_id:this.account_to_accept_payment.account,
			account_to_accept_payment:this.account_to_accept_payment.email
		}

		this.client.save_payment_info(data).then(result => 
		{	
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.ngOnInit();
			}			
		},
		error => 
		{
			console.log();
		})
	}

	async ngOnInit() 
	{
		if(localStorage.getItem('user_type')=="heirstorian")
		{
			//LOADER
			const loading = await this.loadingCtrl.create({
				spinner: null,
				//duration: 5000,
				message: 'Please wait...',
				translucent: true,
				cssClass: 'custom-class custom-loading'
			});
			await loading.present();
			//LOADER

			let data={
				id:localStorage.getItem('user_id')			
			}

			this.client.show_heirstorian(data).then(result => 
			{	
				loading.dismiss();//DISMISS LOADER			
				this.resultData=result[0];			
				this.stripAccount=this.resultData.stripe_account_id;
				this.paymentInfoForm.controls['payment_option'].setValue(this.resultData['payment_option']);
				this.paymentInfoForm.controls['account_to_accept_payment'].
				setValue(this.resultData['account_to_accept_payment']);
			},
			error => 
			{
				loading.dismiss();//DISMISS LOADER
				console.log();
			})
		}
	}

	selected_method($event)
	{
		this.selectedPaymentMethod=$event.target.value;
		if(this.selectedPaymentMethod=="strip")
		{
			this.isStripe=true;
			this.isPayPal=false;
			
			this.paymentInfoForm.addControl('country',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('currency',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('account_number',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('routing_number',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('bank_name',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('account_holder_name',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('date_of_birth',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('account_ssn',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('address_line_1',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('address_line_2',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('address_in_city',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('address_in_state',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('address_zipcode',new FormControl('', Validators.required));
			this.paymentInfoForm.addControl('account_holder_type',new FormControl('', Validators.required));
			
			this.paymentInfoForm.controls['country'].setValue("US");
			this.paymentInfoForm.controls['currency'].setValue("USD");
			this.paymentInfoForm.controls['account_holder_type'].setValue("individual");
		}
		else
		{
			this.isPayPal=true;
			this.isStripe=false;
		}		
	}

	validation_messages = 
	{	
		'payment_option': 
		[
      		{ type: 'required', message: 'Payment option is required.' }
    	],
    	'account_to_accept_payment': 
		[
      		{ type: 'required', message: 'Username of type is required.' }
    	],
		'account_number': 
		[
      		{ type: 'required', message: 'Account number is required.' }
    	],
    	'routing_number': 
		[
      		{ type: 'required', message: 'Routing number is required.' }
    	],
    	'bank_name': 
		[
      		{ type: 'required', message: 'Bank name is required.' }
    	],
    	'account_holder_name': 
		[
      		{ type: 'required', message: 'Account holder name is required.' }
    	],
    	'date_of_birth': 
		[
      		{ type: 'required', message: 'Date of birth is required.' }
    	],
    	'account_ssn': 
		[
      		{ type: 'required', message: 'SSN is required.' }
    	],
    	'address_line_1': 
		[
      		{ type: 'required', message: 'Address-1 is required.' }
    	],
    	'address_in_city': 
		[
      		{ type: 'required', message: 'City is required.' }
    	],
    	'address_in_state': 
		[
      		{ type: 'required', message: 'State is required.' }
    	],
    	'address_zipcode': 
		[
      		{ type: 'required', message: 'Zipcode is required.' }
    	]
	};

	async save_payment_info(form)
	{
		//LOADER
		const loading = await this.loadingCtrl.create({
			spinner: null,
			//duration: 5000,
			message: 'Please wait...',
			translucent: true,
			cssClass: 'custom-class custom-loading'
		});
		await loading.present();
		//LOADER

		let data={
			user_id:localStorage.getItem('user_id'),
			email:localStorage.getItem('email'),
			user_type:'heirstorian',
			payment_option:form.payment_option,
			stripe_account_id:'1111111111',
			account_to_accept_payment:form.account_to_accept_payment
		}

		this.client.save_payment_info(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				if(localStorage.getItem('user_type')=="user")
				{
					this.appComp.logout();
				}//IF USER UPGRADS TO HEIRSTORIAN, BY UPDATING PAYMENT INFORMATION THEN LOGOUT USER.
				else
				{
					this.client.router.navigate(['/payment-information'])
				}
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	//In AppBrowser Functions
	openStripe()
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
		this.inAppBrowser.create("https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FqKtwsSqUBI5gk5p9RTWUZjBIDDOOS8d&scope=read_write&redirect_uri=https://myheirstory.com/authenticate_stripe_account_ionic.php",target,options);
		

		/*
		const browser = this.inAppBrowser.create('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_FqKtwsSqUBI5gk5p9RTWUZjBIDDOOS8d&scope=read_write&redirect_uri=https://myheirstory.com/authenticate_stripe_account_ionic.php','_blank',
		{location:'no',clearcache:'yes',toolbar:'no'});
		browser.on('loadstart').subscribe(function(event)
		{
			browser.executeScript({code:'document.cookie;'}).then((cookie)=>
			{
		    	console.log(cookie);
			});
		});
		*/
	}

	show_booking_payment_information()
	{
		this.client.router.navigate(['/booking-payment-information'])
	}

	async remove_payment_method()
	{
		//LOADER
		const loading = await this.loadingCtrl.create({
			spinner: null,
			//duration: 5000,
			message: 'Please wait...',
			translucent: true,
			cssClass: 'custom-class custom-loading'
		});
		await loading.present();
		//LOADER

		let data={
			userId:localStorage.getItem('user_id')
		}

		this.client.remove_payment_method(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER						
			this.ngOnInit();						
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}
}
