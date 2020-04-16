import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-services-main',
	templateUrl: './services-main.page.html',
	styleUrls: ['./services-main.page.scss'],
})

export class ServicesMainPage implements OnInit 
{
	public queryString: any=[];
	public resultData:any=[];
	public uploadedServicesCount: number = 0;
	public rows = [
		{
		  "name": "Ethel Price",
		  "gender": "female",
		  "age": 22,
		  "id": 1
		},
		{
		  "name": "Claudine Neal",
		  "gender": "female",
		  "age": 55,
		  "id": 2
		},
		{
		  "name": "Beryl Rice",
		  "gender": "female",
		  "age": 67,
		  "id": 3
		},
		{
		  "name": "Simon Grimm",
		  "gender": "male",
		  "age": 28,
		  "id": 4
		}
	];//Example of DataTable Data Array

	public tablestyle = 'bootstrap';
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
			id:localStorage.getItem('user_id')
		}
		this.client.get_heirstorian_services(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			this.uploadedServicesCount=this.resultData.length;
			//console.log(this.resultData);			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
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
	
	edit_service(row_id)
	{
		this.queryString = 
		{
			id:row_id
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/services-add'], navigationExtras)
	}

	remove_service(row_id)
	{
		let messageDisplay=this.showMessage("Are you sure to delete service ?",row_id);		
	}

	async showMessage(message,row_id)
	{		
		const alert = await this.alertCtrl.create(
		{
			header: 'MyHeirStory',
			message: message,
			buttons: 
			[
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => 
					{
						console.log('Confirm Cancel: blah');
					}
				}, 
				{
					text: 'Okay',
					handler: () => 
					{
						let data={
							id:row_id
						}
						this.client.remove_my_service(data,row_id).then(result => 
						{	
							//this.client.router.navigate(['/services-main']);
							this.ngOnInit();
						},
						error => 
						{
							console.log();
						})
						//console.log('Confirm Ok: blah');
					}
				}
			]
		});
		await alert.present();		
	}
}
