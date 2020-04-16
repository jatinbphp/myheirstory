import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.page.html',
	styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit 
{
	public resultData:any={};

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router) { }

	public ChangePasswordForm = this.fb.group({				
		//password: ['', Validators.required],
		password: ['', Validators.compose([
			Validators.required,
			Validators.minLength(8)
		])],
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

	ngOnInit() { }

	validation_messages = 
	{	
		'password': 
		[
      		{ type: 'required', message: 'Password is required.' },
      		{ type: 'minlength', message: 'Password must be 8 character long.' },
    	],
    	'password_1': 
		[
      		{ type: 'required', message: 'Password is required.' },
      		{ type: 'minlength', message: 'Password must be 8 character long.' },
    	],
    	'password_2': 
		[
      		{ type: 'required', message: 'Password is required.' },
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

	async change_account_password(form)
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
			old_password:form.password,
			password:form.password_1,
			password_confirmation:form.password_2 
		}
		this.client.change_account_password(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}
}
