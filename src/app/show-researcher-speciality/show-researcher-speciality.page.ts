import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';
import { ShowResearcherPage } from '../show-researcher/show-researcher.page'

@Component({
	selector: 'app-show-researcher-speciality',
	templateUrl: './show-researcher-speciality.page.html',
	styleUrls: ['./show-researcher-speciality.page.scss'],
})
export class ShowResearcherSpecialityPage implements OnInit 
{
	
	public config_time_period: any=[];//MULTIPLE
	public resultDataRating:number=0;
	public resultData:any={};
	public queryString: any=[];	
	public queryStringData: any=[];
	public heirstorian_id: number;
	public resultSpeciality:any=[];
	search_profile_photo_url: string="";
	isAnyLoggedin: number=0;
	public resultProjectCompletionData:any={};
	public isUserResearcherProjectCompleted: number=0;
	public isUserResearcherProjectCompletedMsg: string='';

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router, private researcherPage: ShowResearcherPage) 
	{ 
		this.config_time_period=this.client.config_time_period;
		if(Number(localStorage.getItem('user_id')) > 0)
		{this.isAnyLoggedin=1;}

		this.heirstorian_id=researcherPage.heirstorian_id; 
		//CHECK USER AND HEIRSTORIAN COMBINATION HAS PREVIOUSLY COMPLETED BOOKING THEN ONLY ALLOW TO REVIEW/RATE
		let dataCheck=
		{
			user_id:localStorage.getItem('user_id'),
			heistorian_id:this.heirstorian_id
		}
		this.client.does_user_researcher_has_completed_booking(dataCheck).then(resultCompletion => 
		{
			this.resultProjectCompletionData=resultCompletion;
			if(this.resultProjectCompletionData.success == true && 
			this.resultProjectCompletionData.result == true)
			{
				this.isUserResearcherProjectCompleted=1;
			}
			else
			{
				this.isUserResearcherProjectCompletedMsg=this.resultProjectCompletionData.message;
			}
		},
		error => 
		{
			console.log();
		})
		//CHECK USER AND HEIRSTORIAN COMBINATION HAS PREVIOUSLY COMPLETED BOOKING THEN ONLY ALLOW TO REVIEW/RATE
	}

  	async ngOnInit() 
	{
		this.search_profile_photo_url=this.client.search_profile_photo_url;		

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
			
			//STAR RATING
			this.resultDataRating=0;						
			let total_ratings=0;
			let num_of_record=0;
			let average=0;
			if(this.resultData.rating_data.length > 0)
			{					
				for(let s=0;s < this.resultData.rating_data.length;s++)
				{
					total_ratings+=Number(this.resultData.rating_data[s].rating);
					num_of_record++;
				}
				average=Math.round((Number(total_ratings) / Number(num_of_record)));				
				this.resultDataRating=average;
			}
			else
			{				
				this.resultDataRating=0;
			}			
			//STAR RATING
				
			//SPECIALITY REPLACE @
			if(this.resultData.specialties!=null)
			{
				let splitSpeciality=this.resultData.specialties.split("@");
				for(let s=0;s < splitSpeciality.length; s++)
				{
					this.resultSpeciality.push(splitSpeciality[s]);
				}
			}			
			//SPECIALITY REPLACE @							
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	async flag_this_heirstorian(heirstorian_first_name:string,heirstorian_last_name:string,
	heirstorian_email:string)
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
			email:this.client.flag_this_researcher_admin_email, 
			user_name:localStorage.getItem('first_name')+" "+localStorage.getItem('last_name'),
			heirstorian_name:heirstorian_first_name+" "+heirstorian_last_name,
		}
		this.client.flag_this_heirstorian(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			if(this.resultData.status==true)
			{
				this.client.router.navigate(['/profile-main'])
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	rate_this_heirstorian(heirstorian_id)
	{
		this.queryString = 
		{
			heirstorian_id:heirstorian_id
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/review-rating'], navigationExtras)
	}

	book_heirstorian(heirstorian_id)
	{
		this.queryString = 
		{
			heirstorian_id:heirstorian_id
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/book-heirstorian'], navigationExtras)
	}

	message_heirstorian(heirstorian_id)
	{
		this.queryString = 
		{
			heirstorian_id:heirstorian_id
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/message-heirstorian'], navigationExtras)
	}

	login_and_allow_action(heirstorian_id)
	{
		this.client.heirstorian_asked_for_action=heirstorian_id;
		this.client.router.navigate(['/login'])
	}

	error_rate_this_heirstorian()
	{
		this.client.showMessage(this.isUserResearcherProjectCompletedMsg);
	}

}
