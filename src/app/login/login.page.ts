import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
	public resultData:any={};
	public passwordType: string = 'password';
 	public passwordIcon: string = 'eye-off';

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private googlePlus: GooglePlus, private fbook: Facebook) 
	{}

	public loginForm = this.fb.group({
		email: ['', Validators.required],
		password: ['', Validators.required]
	});
	
	ngOnInit() 
	{}

	validation_messages = 
	{
		
		'email': 
		[
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		'password': 
		[
      		{ type: 'required', message: 'Password is required.' }
    	]
	};

	async make_me_loggedin(form)
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
			email:form.email, 
			password:form.password,
		}
		this.client.make_me_loggedin(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			//console.log(this.resultData);
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

	hideShowPassword()
	{
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     	this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}	
}
