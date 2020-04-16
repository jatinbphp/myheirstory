import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-message-heirstorian',
	templateUrl: './message-heirstorian.page.html',
	styleUrls: ['./message-heirstorian.page.scss'],
	providers: [DatePipe]
})
export class MessageHeirstorianPage implements OnInit 
{
	
	public resultData:any={};
	public queryString: any=[];
	public queryStringData: any=[];
	public heirstorian_id: number;
	public dateToday: any;
	search_profile_photo_url: string="";

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController,
	private route: ActivatedRoute, private router: Router, private datepipe: DatePipe) 
	{ }

	public messageForm = this.fb.group({
		messate_to_heirstorian: ['', Validators.required],
		parent_id: ['', Validators.required],
		question_sku: ['', Validators.required],
		contact_on_date: ['', Validators.required],
		question: ['', Validators.required]
	});

	async ngOnInit() 
	{
		this.dateToday = new Date().toISOString();
		this.dateToday = this.datepipe.transform(this.dateToday, 'yyyy-MM-dd HH:mm:ss');

		this.search_profile_photo_url=this.client.search_profile_photo_url;
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.heirstorian_id=this.queryStringData['heirstorian_id'];

		this.messageForm.controls['messate_to_heirstorian'].setValue(this.heirstorian_id);
		this.messageForm.controls['parent_id'].setValue(0);
		this.messageForm.controls['question_sku'].setValue("NULL");
		this.messageForm.controls['contact_on_date'].setValue(this.dateToday);

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
			id:this.heirstorian_id
		}
		this.client.show_heirstorian(data).then(result => 
		{			
			loading.dismiss();//DISMISS LOADER	
			this.resultData=result[0];			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		}) 
	}

	validation_messages = 
	{
		'question': 
		[
      		{ type: 'required', message: 'Message is required.' }
    	]
	};

	async message_heirstorian(form)
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

		let contact_on_date_converted =this.datepipe.transform(form.contact_on_date, 'yyyy-MM-dd HH:mm:ss');
		
		/*
		INITILIZED ON INIT
		this.dateToday = new Date().toISOString();
		this.dateToday = this.datepipe.transform(this.dateToday, 'yyyy-MM-dd HH:mm:ss');
		*/

		let data={
			user_id:localStorage.getItem('user_id'),
			heistorian_id:form.messate_to_heirstorian,
			contact_on_date:contact_on_date_converted,
			question:form.question,
			parent_id:form.parent_id,
			question_sku:form.question_sku
		}

		this.client.message_heirstorian(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.queryString = 
				{
					heirstorian_id:this.heirstorian_id	
				};

				let navigationExtras: NavigationExtras = 
				{
					queryParams: 
					{
						special: JSON.stringify(this.queryString)
					}
				};
				this.client.router.navigate(['/show-researcher/show-researcher/show-researcher-info'], navigationExtras);// TAB NAVIGATION APPLIED
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}
}
