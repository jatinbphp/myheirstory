import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.page.html',
	styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit 
{
	public has_to_verify=[];
	public resultData:any={};
	public queryString: any=[];

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController) 
	{ }

	public ForgotPasswordForm = this.fb.group({
		email: ['', Validators.required]
	});

	ngOnInit() { }

	validation_messages = 
	{
		
		'email': 
		[
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		]
	};

	async recover_my_password(form)
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
			email:form.email 
		}
		this.client.recover_my_password(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.queryString = 
				{
					from_page:"forgot-password",
					email:form.email
				};

				let navigationExtras: NavigationExtras = 
				{
					queryParams: 
					{
						special: JSON.stringify(this.queryString)
					}
				};

				/*
				This portion is made because app.component will redirect APP to home if APP 
				reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
				*/
				
				let obj = {};
		        obj['from_page'] = "forgot-password";
		        obj['email'] = form.email;
		        this.has_to_verify.push(obj);
				localStorage.setItem('has_to_verify',JSON.stringify(this.has_to_verify));	
				
				/*
				This portion is made because app.component will redirect APP to home if APP 
				reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
				*/

				this.client.router.navigate(['/make-verification'], navigationExtras)
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}
}
