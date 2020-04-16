import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-booking-payment-information',
	templateUrl: './booking-payment-information.page.html',
	styleUrls: ['./booking-payment-information.page.scss'],
})
export class BookingPaymentInformationPage implements OnInit 
{
	public resultData:any;

	constructor(public client: ClientService, public loadingCtrl: LoadingController, 
	private alertCtrl: AlertController) 
	{}

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
			heirstorian_id:localStorage.getItem('user_id')
		}
		this.client.get_heirstorian_booking_payment_information(data).then(result => 
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

}
