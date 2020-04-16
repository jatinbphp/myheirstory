import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-booking-main-heirstorian',
	templateUrl: './booking-main-heirstorian.page.html',
	styleUrls: ['./booking-main-heirstorian.page.scss'],
})
export class BookingMainHeirstorianPage implements OnInit 
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
		this.client.get_heirstorian_bookings(data).then(result => 
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
			this.client.get_heirstorian_bookings(data).then(result => 
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
	
	uploadCompletionDocument(booking_id,user_email)
	{
		this.queryString = 
		{
			booking_id:booking_id,
			email:user_email
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/upload-completion-document'], navigationExtras)
	}

	async approveBookingConfirm(booking_id) 
	{
		const alert = await this.alertCtrl.create({
			header: 'Booking Approve',
			message: 'Are you sure to approve this booking?',
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
					this.change_booking_status(booking_id,1);
					//console.log('Ok clicked');
				}
			}
			]
		});
		await alert.present();
	}

	async disApproveBookingConfirm(booking_id) 
	{
		const alert = await this.alertCtrl.create({
			header: 'Booking Disapprove',
			message: 'Are you sure to disapprove this booking?',
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
					this.change_booking_status(booking_id,0);
					//console.log('Ok clicked');
				}
			}
			]
		});
		await alert.present();
	}
	
	async change_booking_status(booking_id,booking_status)
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
			booking_id:booking_id,
			booking_status:booking_status
		}
		this.client.change_booking_status(data).then(result => 
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

	show_completion_document(booking_id,user_email)
	{
		this.queryString = 
		{
			booking_id:booking_id,
			email:user_email,
			view_as:'heirstorian'
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

	show_booking_payment_information()
	{
		this.client.router.navigate(['/booking-payment-information'])
	}
}
