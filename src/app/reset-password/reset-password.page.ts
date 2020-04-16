import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.page.html',
	styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit 
{
	public resultData:any={};
	public queryStringData: any=[];
	public code_provided: string;
	public email_provided: string;

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router) 
	{ }

	public ResetPasswordForm = this.fb.group({		
		email: ['', Validators.required],
		code: ['', Validators.required],
		//password_1: ['', Validators.required],
		password_1: ['', Validators.compose([
			Validators.required,
			Validators.minLength(8)
		])],		
		//password_2: ['', Validators.required]
		password_2: ['', Validators.compose([
			Validators.required,
			Validators.minLength(8)
		])],
	},{validator: this.checkPasswordMatches('password_1','password_2')});

	ngOnInit() 
	{ 
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.code_provided=this.queryStringData['code'];
		this.email_provided=this.queryStringData['email'];

		this.ResetPasswordForm.controls['code'].setValue(this.code_provided);
		this.ResetPasswordForm.controls['email'].setValue(this.email_provided);
	}

	validation_messages = 
	{
		'password_1': 
		[
      		{ type: 'required', message: 'Password is required.' },
      		{ type: 'minlength', message: 'Password must be 8 character long.' },
    	],
    	'password_2': 
		[
      		{ type: 'required', message: 'Confirm password is required.' },
      		{ type: 'minlength', message: 'Password must be 8 character long.' },
      		{ type: 'notEquivalent', message: 'Password not match!' },
    	]
	};

	checkPasswordMatches(passwordMain: string, confirmPassword: string) 
	{
		return (group: FormGroup) => 
		{
			let passwordInput = group.controls[passwordMain],
			passwordConfirmationInput = group.controls[confirmPassword];
			if(passwordInput.value!="" && passwordConfirmationInput.value!="")
			{
				if (passwordInput.value !== passwordConfirmationInput.value) 
				{
					return passwordConfirmationInput.setErrors({notEquivalent: true});
				}
				else
				{
					return passwordConfirmationInput.setErrors(null);
				}
			}
		}
	}

	async change_my_password(form)
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
			code:form.code,
			email:form.email,
			password_1:form.password_1,
			password_2:form.password_2 
		}
		this.client.change_my_password(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			
			if(this.resultData.success==true)
			{
				this.client.router.navigate(['/login']);
			}						
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

}
