import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-book-heirstorian',
	templateUrl: './book-heirstorian.page.html',
	styleUrls: ['./book-heirstorian.page.scss'],
	providers: [DatePipe]
})
export class BookHeirstorianPage implements OnInit 
{
	public resultData:any={};
	public resultDataServices:any=[];
	public queryString: any=[];
	public queryStringData: any=[];
	public user_id: number;
	public heirstorian_id: number;
	public heirstorian_first_name: string;
	public heirstorian_last_name: string;
	public service_id: number;
	public service_desc: string="";
	public hrOptions:any=[];
	public search_profile_photo_url: string="";
	public dateToday: any;
	public booking_id: number=0;
	public researcher_payable_amount: number=0;

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router, private datepipe: DatePipe) 
	{ }

	public HeirstorianBookingForm = this.fb.group({
		user_id: ['', Validators.required],
		heirstorian_id: ['', Validators.required],
		service_id: ['', Validators.required],
		package_selected: ['', Validators.required],
		booking_cost: ['', Validators.required],
		booking_date: ['', Validators.required]		
	});

	ngOnInit()
	{}

	validation_messages = 
	{	
		'service_id': 
		[
      		{ type: 'required', message: 'You must select at least one service option.' }
    	],
    	'package_selected': 
		[
      		{ type: 'required', message: 'You must select at least one package option.' }
    	]
	};

	async ionViewWillEnter() 
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
		this.user_id=Number(localStorage.getItem('user_id'));
		this.heirstorian_id=this.queryStringData['heirstorian_id'];
		this.HeirstorianBookingForm.controls['user_id'].setValue(this.user_id);
		this.HeirstorianBookingForm.controls['heirstorian_id'].setValue(this.heirstorian_id);		
		this.HeirstorianBookingForm.controls['booking_date'].setValue(this.dateToday);

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
			this.resultData=result[0];
			//console.log(this.resultData);
			this.HeirstorianBookingForm.controls['booking_cost'].setValue(this.resultData.cost);

			//JUST TO PASS ON PAYMENT PAGE ONLY
			this.heirstorian_first_name=this.resultData.first_name;
			this.heirstorian_last_name=this.resultData.last_name;
			//JUST TO PASS ON PAYMENT PAGE ONLY
			let get_hr_options=this.resultData.hr_option.split("@");
			for(let hr=0;hr < get_hr_options.length; hr++)
			{
				this.hrOptions.push(get_hr_options[hr]);	
			}
			//console.log(this.hrOptions);
			//HEIRSTORIAN SERVICES
			this.client.get_heirstorian_services(data).then(resultServices => 
			{	
				loading.dismiss();//DISMISS LOADER
				this.resultDataServices=resultServices;
			},
			error => 
			{
				console.log();
			})
			//HEIRSTORIAN SERVICES
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		}) 
	}

	async on_change_service($event)
	{
		this.service_id=$event.target.value;
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
			id:this.service_id
		}
		this.client.get_heirstorian_service_detail(data).then(result => 
		{				
			loading.dismiss();//DISMISS LOADER
			this.service_desc=result['description'];
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		}) 
	}

	async book_this_heirstorian(form)
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

		let booking_date_converted =this.datepipe.transform(form.booking_date, 'yyyy-MM-dd HH:mm:ss');		

		/*
		INITILIZED ON INIT
		this.dateToday = new Date().toISOString();
		this.dateToday = this.datepipe.transform(this.dateToday, 'yyyy-MM-dd HH:mm:ss');
		*/

		this.researcher_payable_amount=form.booking_cost*form.package_selected;
		
		let data={
			user_id:form.user_id,
			heistorian_id:form.heirstorian_id,
			hourly_rate:form.booking_cost,
			booking_cost:this.researcher_payable_amount,
			package_selected:form.package_selected,
			booking_date:booking_date_converted,
			booking_status:0,
			booking_added_date:this.dateToday,
			service_id:form.service_id
		}

		this.client.make_my_booking(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.queryString = 
				{
					booking_id:this.resultData.booking_id,
					booking_cost:this.researcher_payable_amount,
					heirstorian_first_name:this.heirstorian_first_name,
					heirstorian_last_name:this.heirstorian_last_name
				};

				let navigationExtras: NavigationExtras = 
				{
					queryParams: 
					{
						special: JSON.stringify(this.queryString)
					}
				};
				this.client.router.navigate(['/booking-payments'],navigationExtras)
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

}
