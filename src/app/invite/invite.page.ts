import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';

@Component({
	selector: 'app-invite',
	templateUrl: './invite.page.html',
	styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit 
{
	public resultData:any={};
	public emailCount: number = 1;
	public emailCountToValidate: number = 2;
	public isViewLoaded: boolean =false;		
	public inviteForm = this.fb.group({		
		email_addresses_1: ['', Validators.required],
		email_count: ['', Validators.required],
		email_subject: ['', Validators.required],
		email_content: ['', Validators.required]
	});	
	
	public myEmailValidation = [
		{ type: 'required', message: 'Email is required.' }, 
		{ type: 'pattern', message: 'Please enter a valid email.' }
	];

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController) 
	{ }

	ngOnInit()
	{ 
		this.inviteForm.controls['email_count'].setValue(this.emailCount);	
	}

	validation_messages = 
	{
		
		'email_addresses_1': 
		[
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		'email_subject': 
		[
      		{ type: 'required', message: 'Subject is required.' }
    	],
		'email_content': 
		[
      		{ type: 'required', message: 'Email content is required.' }
    	]
	};

	add_invitee()
	{
		this.emailCount++;
    	if(this.emailCountToValidate <= 10)
    	{
    		this.inviteForm.addControl('email_addresses_'+this.emailCount,new FormControl('', Validators.required));
    		this.inviteForm.controls['email_count'].setValue(this.emailCount);
    		this.validation_messages['email_addresses_'+this.emailCount]=this.myEmailValidation;
    		this.emailCountToValidate++;
    	}
    	else
    	{
    		this.client.showMessage("Invitee limit exceed!");
    	}    	
	}

	remove_invitee(control)
	{
		this.emailCount--;
		this.inviteForm.removeControl(control.key);
		this.emailCountToValidate--;
	}

	async invite_all_invitee(form)
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

		let email_to_addresses: any=[];
		let concate_email_to_addresses: string="";

		for(let e=1; e <= form.email_count; e++)
		{
			let temp_email_addresses="email_addresses_"+e;
			email_to_addresses.push(this.inviteForm.controls[temp_email_addresses].value);
			//console.log(this.inviteForm.controls[temp_email_addresses].value);			
		}
		if(email_to_addresses.length > 0)
		{			
			concate_email_to_addresses=email_to_addresses.join(",");			
		}

		let data={
			email:concate_email_to_addresses,
			subject:form.email_subject,
			message:form.email_content
		}

		this.client.invite_all_invitee(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.client.router.navigate(['/view-profile'])
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})		
	}

}
