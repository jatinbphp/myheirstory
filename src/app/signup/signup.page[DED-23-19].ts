import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { NavigationExtras } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit 
{
	public resultData:any={};
	public queryString: any=[];
	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private googlePlus: GooglePlus, private fbook: Facebook) 
	{ }

	public signUpForm = this.fb.group({
		user_type: ['', Validators.required],
		first_name: ['', Validators.required],
		last_name: ['', Validators.required],
		phone_number: ['', Validators.required],
		email: ['', Validators.required],		
		password_1: ['', Validators.compose([
			Validators.required,
			Validators.minLength(8)
		])],
		password_2: ['', Validators.required]
	},{validator: this.checkPasswordMatches('password_1','password_2')});

	ngOnInit() 
	{ 
		this.signUpForm.controls['user_type'].setValue('user');
	}

	validation_messages = 
	{
		
		'first_name': 
		[
      		{ type: 'required', message: 'First name is required.' }
    	],
    	'last_name': 
		[
      		{ type: 'required', message: 'Last name is required.' }
    	],
    	'phone_number': 
		[
      		{ type: 'required', message: 'Phone number is required.' }
    	],
		'email': 
		[
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		'password_1': 
		[
			{ type: 'required', message: 'Password is required.' },	
			{ type: 'minLength', message: 'Password must be at least 8 characters long.' }		
		],
		'password_2': 
		[
			{ type: 'required', message: 'Confirm password is required.' },			
		],
	};

	checkPasswordMatches(passwordMain: string, confirmPassword: string) 
	{
		return (group: FormGroup) => 
		{
			let passwordInput = group.controls[passwordMain],
			passwordConfirmationInput = group.controls[confirmPassword];
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

	async make_me_signup(form)
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
			first_name:form.first_name, 
			last_name:form.last_name,
			email:form.email,
			password:form.password_1,
			password_confirmation:form.password_2,
			user_type:form.user_type,
			phone_no:form.phone_number
		}
		this.client.make_me_signup(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.queryString = 
				{
					from_page:"registration",
					email:form.email
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
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	async doGoogleLogin()
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

		this.googlePlus.login({}).then(user => 
		{
			let data={
				email:user.email 
			}
			this.client.make_social_loggedin(data).then(result => 
			{	
				loading.dismiss();//DISMISS LOADER			
				this.resultData=result;
				if(this.resultData.status==true)
				{
					this.client.router.navigate(['/profile-main'])
				}			
			},
			error => 
			{
				loading.dismiss();//DISMISS LOADER
				console.log();
			})
			//console.log(user.displayName);
			//console.log(user.email);
			//console.log(user.imageUrl);        
		}, 
		err => 
		{
			loading.dismiss();//DISMISS LOADER	
			console.log(err);
		})
	}

	async doFBLogin()
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

		this.fbook.login(['public_profile','user_friends', 'email']).then(FacebookLoginResponse => 
		{
			let userId = FacebookLoginResponse.authResponse.userID;
			this.fbook.api("/me?fields=name,email", ['public_profile','user_friends', 'email'])
			.then(user =>
			{
				let data={
					email:user.email 
				}
				this.client.make_social_loggedin(data).then(result => 
				{	
					loading.dismiss();//DISMISS LOADER			
					this.resultData=result;
					if(this.resultData.status==true)
					{
						this.client.router.navigate(['/profile-main'])
					}			
				},
				error => 
				{
					loading.dismiss();//DISMISS LOADER
					console.log();
				})
				//user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
				//console.log(user.name);
				//console.log(user.email);
				//console.log(user.picture);
			})                    
		}, 
		err => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log(err);
		})    
	}
}
