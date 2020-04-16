import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-message-main-heirstorian',
	templateUrl: './message-main-heirstorian.page.html',
	styleUrls: ['./message-main-heirstorian.page.scss'],
})
export class MessageMainHeirstorianPage implements OnInit 
{
	
	public queryString: any=[];
	public resultData:any=[];
	public tablestyle = 'bootstrap';
	
	constructor(public client: ClientService, public loadingCtrl: LoadingController, 
	private alertCtrl: AlertController) {}	

	async ngOnInit()
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
			user_id:localStorage.getItem('user_id')
		}
		this.client.get_heirstorian_messages(data).then(result => 
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

	doRefresh(event) 
	{
	    setTimeout(() => 
	    {
	      	let data=
	      	{
				user_id:localStorage.getItem('user_id')
			}
			this.client.get_heirstorian_messages(data).then(result => 
			{	
				this.resultData=result;		
			},
			error => 
			{
				console.log();
			})
	      	event.target.complete();
	    }, 2000);
  	}

	async remove_message(message_id)
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
			message_id:message_id
		}
		this.client.remove_message(data).then(result => 
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

	async deleteConfirm(message_id) 
	{
		const alert = await this.alertCtrl.create({
			header: 'Message Deletion',
			message: 'Are you sure to delete this message?',
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: () => 
				{
					//console.log('Cancel clicked');
				}
			},
			{
				text: 'Ok',
				handler: () => 
				{
					this.remove_message(message_id);
					//console.log('Ok clicked');
				}
			}
			]
		});
		await alert.present();
	}

	show_message_thread(question_sku,tab_selected)
	{
		this.queryString = 
		{
			question_sku:question_sku,
			tab_selected:tab_selected
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/show-message-thread'], navigationExtras)
	}

	switchStyle()
	{
		if (this.tablestyle == 'dark')
		{
			this.tablestyle = 'bootstrap';
		} 
		else 
		{
			this.tablestyle = 'dark';
		}
	}
}
