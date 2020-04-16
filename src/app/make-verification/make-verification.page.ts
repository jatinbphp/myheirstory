import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-make-verification',
	templateUrl: './make-verification.page.html',
	styleUrls: ['./make-verification.page.scss'],
})
export class MakeVerificationPage implements OnInit 
{
	public from_page: string;
	public email_provided: string;
	public queryString: any=[];
	public queryStringData: any=[];
	public resultData:any={};	

	constructor(public fb: FormBuilder, public client: ClientService, 
	private route: ActivatedRoute, private router: Router, public loadingCtrl: LoadingController) 
	{ }

	public VerificationForm = this.fb.group({
		from_page: ['', Validators.required],
		email: ['', Validators.required],
		code: ['', Validators.required]
	});

	ngOnInit() 
	{ 
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.from_page=this.queryStringData['from_page'];
		this.email_provided=this.queryStringData['email'];

		this.VerificationForm.controls['from_page'].setValue(this.from_page);
		this.VerificationForm.controls['email'].setValue(this.email_provided);
	}

	validation_messages = 
	{
		'code': 
		[
      		{ type: 'required', message: 'Code is required.' }
    	]
	};

	async verify_my_code(form)
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
			from_page:form.from_page,
			email:form.email,
			code:form.code 
		}
		this.client.check_verification_code(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;			
			if(this.resultData.success==true)
			{
				/*
				This portion is made because app.component will redirect APP to home if APP 
				reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
				*/
				
				localStorage.removeItem("has_to_verify");
				
				/*
				This portion is made because app.component will redirect APP to home if APP 
				reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
				*/

				this.queryString = 
				{
					email:this.email_provided,
					code:form.code					
				};

				let navigationExtras: NavigationExtras = 
				{
					queryParams: 
					{
						special: JSON.stringify(this.queryString)
					}
				};

				if(this.from_page=="forgot-password")
				{
					this.client.router.navigate(['/reset-password'], navigationExtras)
				}

				if(this.from_page=="registration")
				{
					this.client.router.navigate(['/login'], navigationExtras)
				}

				if(this.from_page=="login")
				{
					this.client.router.navigate(['/login'], navigationExtras)
				}
			}						
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	async send_verification_code()
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
			from_page:this.from_page,
			email:this.email_provided
		}
		this.client.send_verification_code(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			//console.log(this.resultData);
						
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})	
	}
}
