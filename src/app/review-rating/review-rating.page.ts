import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StarRating } from 'ionic4-star-rating';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-review-rating',
	templateUrl: './review-rating.page.html',
	styleUrls: ['./review-rating.page.scss'],
})
export class ReviewRatingPage implements OnInit 
{
	public resultData:any={};
	public queryString: any=[];
	public queryStringData: any=[];
	public user_id: number;
	public heirstorian_id: number;
	public ratingSelected: number=0;
	search_profile_photo_url: string="";

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router) { }

	public ReviewRatingForm = this.fb.group({
		user_id: ['', Validators.required],
		heirstorian_id: ['', Validators.required],
		rating: ['', Validators.required],
		review: ['', Validators.required]
	});

	async ngOnInit() 
	{	
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
		this.ReviewRatingForm.controls['user_id'].setValue(this.user_id);
		this.ReviewRatingForm.controls['heirstorian_id'].setValue(this.heirstorian_id);		

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
		'rating': 
		[
      		{ type: 'required', message: 'Selecting rating is required.' }
    	],
    	'review': 
		[
      		{ type: 'required', message: 'Review is required.' }
    	]
	};

	logRatingSelected(rating)
	{
        this.ratingSelected=rating;
    }

    async rate_this_heirstorian(form)
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
			user_id:form.user_id, 
			heirstorian_id:form.heirstorian_id,
			rating:form.rating,
			review:form.review,
		}
		this.client.rate_this_heirstorian(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER						
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

			//WORKING PROPERLY:this.client.router.navigate(['/show-heirstorian'], navigationExtras)//SINGLE PAGE
			this.client.router.navigate(['/show-researcher/show-researcher/show-researcher-info'], navigationExtras);// TAB NAVIGATION APPLIED
						
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
    }
}
