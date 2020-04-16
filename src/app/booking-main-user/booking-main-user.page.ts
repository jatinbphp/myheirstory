import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-booking-main-user',
	templateUrl: './booking-main-user.page.html',
	styleUrls: ['./booking-main-user.page.scss'],
})
export class BookingMainUserPage implements OnInit 
{
	
	public resultData:any;
	public queryString: any=[];

	constructor(public client: ClientService, public loadingCtrl: LoadingController, 
	private alertCtrl: AlertController) { }	

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
		this.client.get_user_bookings(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;		
			//console.log(this.resultData);	
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			this.resultData=[];
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
			this.client.get_user_bookings(data).then(result => 
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

	show_completion_document(booking_id,user_email)
	{
		this.queryString = 
		{
			booking_id:booking_id,
			email:user_email,
			view_as:'user'
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/show-completion-document'], navigationExtras)
	}

	async remove_booking(booking_id)
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
		this.client.remove_booking(data).then(result => 
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

	async deleteConfirm(booking_id) 
	{
		const alert = await this.alertCtrl.create({
			header: 'Booking Deletion',
			message: 'Are you sure to delete this booking?',
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
					this.remove_booking(booking_id);
					//console.log('Ok clicked');
				}
			}
			]
		});
		await alert.present();
	}
}
