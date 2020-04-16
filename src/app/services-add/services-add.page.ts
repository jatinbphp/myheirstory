import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: 'app-services-add',
	templateUrl: './services-add.page.html',
	styleUrls: ['./services-add.page.scss'],
})
export class ServicesAddPage implements OnInit 
{
	public id: Number=0;
	public action: string="Add";
	public queryStringData: any=[];
	public resultData:any={};
	public resultDataCategories:any=[];

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router) 
	{ }

	public ServicesForm = this.fb.group({
		id: ['', Validators.required],
		service_type: ['', Validators.required],
		description: ['', Validators.required]
	});

	ngOnInit() 
	{ 
				
	}

	validation_messages = 
	{	
		'service_type': 
		[
      		{ type: 'required', message: 'Service type is required.' }
    	],
    	'description': 
		[
      		{ type: 'required', message: 'Description is required.' }
    	]
	};

	async ionViewWillEnter() 
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

        this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.id=Number(this.queryStringData['id']);
		if(this.id!=NaN && this.id > 0)
		{
			this.action="Edit";
		}

		//Get Categories
		let data={
			id:this.id
		}
		this.client.get_categories(data).then(result => 
		{	
			this.resultDataCategories=result;
			if(this.resultDataCategories.length > 0)
			{
				loading.dismiss();//DISMISS LOADER
			}
		},
		error => 
		{
			console.log();
		})

		//Get Service Detail
		if(this.id > 0)
		{
			let data={
				id:this.id
			}
			this.client.get_heirstorian_service_detail(data).then(result => 
			{	
				this.resultData=result;
				this.ServicesForm.controls['id'].setValue(this.id);
				this.ServicesForm.controls['service_type'].setValue(this.resultData.type_id);
				this.ServicesForm.controls['description'].setValue(this.resultData.description);
			},
			error => 
			{
				console.log();
			})
		}
		else
		{
			loading.dismiss();//DISMISS LOADER
			this.ServicesForm.controls['id'].setValue(this.id);
		}
    }

	async add_update_my_service(form)
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
			user_id:localStorage.getItem('user_id'),
			type_id:form.service_type,
			description:form.description,
			rate:0
		}

		this.client.add_update_my_service(data,form.id).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER
			this.resultData=result;
			if(this.resultData.success==true)
			{				
				this.router.navigate(['/services-main']);
			}
		},
		error => 
		{
			console.log();
		})
	}
}
