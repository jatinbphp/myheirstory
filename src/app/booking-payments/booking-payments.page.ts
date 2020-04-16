import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';//STRIP
import { HttpClient } from "@angular/common/http";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';//PayPal

@Component({
	selector: 'app-booking-payments',
	templateUrl: './booking-payments.page.html',
	styleUrls: ['./booking-payments.page.scss'],
})
export class BookingPaymentsPage implements OnInit 
{
	public resultData:any={};
	public resultDataStripeResp:any={};
	public resultDataPayPalResp:any={};
	public resultHeirstorian:any={};	 
	public queryStringData: any=[];	
	public payment_method_heirstorian: string="strip";
	public account_to_accept_payment: string="";
	public booking_id: number=0;
	public booking_cost: number=0;
	public booking_cost_stripe: number=0;
	public heirstorian_first_name: string="";
	public heirstorian_last_name: string="";
	search_profile_photo_url: string="";

	//PAYPAL
	paymentAmountPayPal: string = '3.33';
	currencyPayPal: string = 'USD';
	currencyIconPayPal: string = '$';
	//PAYPAL

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router, private stripe: Stripe, private http: HttpClient, 
	private payPal: PayPal) { }

	public paymentWithStripForm = this.fb.group({
		card_payable: ['', Validators.required],
		card_number: ['', Validators.required],
		expiry_month: ['', Validators.required],
		expiry_year: ['', Validators.required],
		cvv_code: ['', Validators.required]
	});

	ngOnInit()
	{}

	validation_messages = 
	{
		'card_number': 
		[
      		{ type: 'required', message: 'Card number is required.' }
    	],
    	'expiry_month': 
		[
      		{ type: 'required', message: 'Expiry month is required.' }
    	],
    	'expiry_year': 
		[
      		{ type: 'required', message: 'Expiry year is required.' }
    	],
    	'cvv_code': 
		[
      		{ type: 'required', message: 'CVV is required.' }
    	]
	};
	
	async ionViewWillEnter() 
	{
		this.search_profile_photo_url=this.client.search_profile_photo_url;
		
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		}); 
		this.booking_id=this.queryStringData['booking_id'];
		this.booking_cost=this.queryStringData['booking_cost'];
		this.booking_cost_stripe=this.queryStringData['booking_cost'] * 100;
		this.heirstorian_first_name=this.queryStringData['heirstorian_first_name'];
		this.heirstorian_last_name=this.queryStringData['heirstorian_last_name'];

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
			booking_id:this.booking_id
		}
		this.client.get_my_booking(data).then(result => 
		{				
			loading.dismiss();//DISMISS LOADER			
			//GET HEIRSTORIAN PAYMENT METHOD
			if(result['success']==true)
			{
				this.resultData=result['data'][0];
				this.paymentWithStripForm.controls['card_payable'].setValue(this.resultData.cost);
				this.paymentAmountPayPal=String(this.booking_cost);
				let data=
				{
					id:this.resultData.heistorian_id
				}
				this.client.show_heirstorian(data).then(result => 
				{
					this.resultHeirstorian=result[0];
					this.payment_method_heirstorian=(this.resultHeirstorian['payment_option']) ? 
					this.resultHeirstorian['payment_option'] : "strip";
					this.account_to_accept_payment=this.resultHeirstorian['account_to_accept_payment'];
				},
				error => 
				{
					loading.dismiss();//DISMISS LOADER
					console.log();
				})				
			}
			//GET HEIRSTORIAN PAYMENT METHOD
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	async make_payment_with_stripe(form)
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

		this.stripe.setPublishableKey(this.client.stripe_key);
		let card_details=
		{
			number:form.card_number,
			expMonth:form.expiry_month,
			expYear:form.expiry_year,
			cvc:form.cvv_code
		}

		this.stripe.createCardToken(card_details).then(token => 
		{			
			//NOW IF TOKEN GENERATED, INITIATE PAYMENT FROM API SIDE
			let data_stripe_payment = 
			{
				//email:localStorage.getItem('email'),
				amount:this.booking_cost_stripe,
				source:token.id
			}
			this.client.initiate_stripe_payment_for_booking(data_stripe_payment).then(result => 
			{	
				this.resultDataStripeResp=result;
				if(this.resultDataStripeResp.success==true)
				{
					//UPDATE BOOKING TO PAID WITH TRANSACTION NUMBER
					let resultObj=JSON.parse(this.resultDataStripeResp.response);
					let paymentUpdationToPaid={
						booking_id:this.booking_id, 
						booking_payment_status:'1',
						transaction_id:resultObj.id,
						booking_payment_option:'strip'
					}
					this.client.update_payment_information_for_paypal(paymentUpdationToPaid)
					.then(resultUpdate => 
					{	
						this.resultDataPayPalResp=resultUpdate;							
						if(this.resultDataPayPalResp.success==true)
						{
							//SAVE FULL PAYMENT RESPONSE FROM PAYPAL
							let paymentInformation={
								booking_id:this.booking_id, 
								booking_response:JSON.stringify(resultObj)
							}
							this.client.save_payment_information_for_paypal(paymentInformation)
							.then(resultPayInfo => 
							{	
								this.resultDataPayPalResp=resultPayInfo;									
								loading.dismiss();//DISMISS LOADER			
								if(this.resultDataPayPalResp.success==true)
								{
									this.client.router.navigate(['/view-profile'])
								}			
							},
							error => 
							{
								loading.dismiss();//DISMISS LOADER
								console.log();
							})
							//SAVE FULL PAYMENT RESPONSE FROM PAYPAL
						}			
					},
					error => 
					{
						loading.dismiss();//DISMISS LOADER
						console.log();
					})
					//UPDATE BOOKING TO PAID WITH TRANSACTION NUMBER
				}
				console.log(this.resultDataStripeResp);
			},
			error => 
			{				
				console.log();
			});
			//NOW IF TOKEN GENERATED, INITIATE PAYMENT FROM API SIDE
			loading.dismiss();//DISMISS LOADER
		}).catch(error => 
		{
			this.client.showMessage(error);
			//console.error(error);
			loading.dismiss();//DISMISS LOADER
		});
	}

	async payWithPaypal() 
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

		console.log("Pay ????");
		this.payPal.init({
			PayPalEnvironmentProduction:this.client.paypal_environment_production,
			PayPalEnvironmentSandbox:this.client.paypal_environment_sandbox
		}).then(() => 
		{
			// Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
			this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
				// Only needed if you get an "Internal Service Error" after PayPal login!
				//payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
			})).then(() => 
			{
				let payment = new PayPalPayment(this.paymentAmountPayPal,this.currencyPayPal,
				'Booking: '+this.heirstorian_first_name +" "+this.heirstorian_last_name, 'sale');
				this.payPal.renderSinglePaymentUI(payment).then((res) => 
				{
					if(res.response.state=="approved")
					{
						//UPDATE BOOKING TO PAID WITH TRANSACTION NUMBER
						let paymentUpdationToPaid={
							booking_id:this.booking_id, 
							booking_payment_status:'1',
							transaction_id:res.response.id,
							booking_payment_option:'paypal'
						}
						this.client.update_payment_information_for_paypal(paymentUpdationToPaid)
						.then(resultUpdate => 
						{	
							this.resultDataPayPalResp=resultUpdate;							
							if(this.resultDataPayPalResp.success==true)
							{
								//SAVE FULL PAYMENT RESPONSE FROM PAYPAL
								let paymentInformation={
									booking_id:this.booking_id, 
									booking_response:JSON.stringify(res)
								}
								this.client.save_payment_information_for_paypal(paymentInformation)
								.then(resultPayInfo => 
								{	
									this.resultDataPayPalResp=resultPayInfo;									
									loading.dismiss();//DISMISS LOADER			
									if(this.resultDataPayPalResp.success==true)
									{
										this.client.router.navigate(['/view-profile'])
									}			
								},
								error => 
								{
									loading.dismiss();//DISMISS LOADER
									console.log();
								})
								//SAVE FULL PAYMENT RESPONSE FROM PAYPAL
							}			
						},
						error => 
						{
							loading.dismiss();//DISMISS LOADER
							console.log();
						})
						//UPDATE BOOKING TO PAID WITH TRANSACTION NUMBER
					}
					console.log(res);
					/*
					COMMENT::START::Successfully paid
					Example sandbox response
					{
					   "client": 
					   {
					     "environment": "sandbox",
					     "product_name": "PayPal iOS SDK",
					     "paypal_sdk_version": "2.16.0",
					     "platform": "iOS"
					   },
					   "response_type": "payment",
					   "response": 
					   {
					     "id": "PAY-1AB23456CD789012EF34GHIJ",
					     "state": "approved",
					     "create_time": "2016-10-03T13:33:33Z",
					     "intent": "sale"
					   }
					}COMMENT::ENDS::
					*/
				}, () => 
				{
					// Error or render dialog closed without being successful
				});
			}, () => 
			{
				// Error in configuration
			});
		}, () => 
		{
			// Error in initialization, maybe PayPal isn't supported or something else
		});
	}

	async cancel_my_booking(booking_id)
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
			booking_id:booking_id
		}
		this.client.cancel_my_booking(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.client.router.navigate(['/search-main'])
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}
}
