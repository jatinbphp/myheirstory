import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-show-heirstorian',
	templateUrl: './show-heirstorian.page.html',
	styleUrls: ['./show-heirstorian.page.scss'],
})
export class ShowHeirstorianPage implements OnInit 
{
	public config_time_period: any=[];//MULTIPLE

	public resultData:any={};
	public resultDataRating:number=0;
	public queryString: any=[];	
	public queryStringData: any=[];
	public heirstorian_id: number;

	public resultSpeciality:any=[];
	public resultTimePeriod:any=[];
	public resultQualification:any=[];
	public resultLanguage:any=[];
	public resultReligiousRecords:any=[];
	public resultInternational:any=[];

	search_profile_photo_url: string="";
	isAnyLoggedin: number=0;

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router) 
	{ 
		this.config_time_period=this.client.config_time_period;
		if(Number(localStorage.getItem('user_id')) > 0)
		{this.isAnyLoggedin=1;}
	}

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
		this.heirstorian_id=this.queryStringData['heirstorian_id'];

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
			console.log(this.resultData);
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
			
			//TIME PERIOD REPLACE @			
			if(this.resultData.time_period!=null)
			{
				let splitTimePeriod=this.resultData.time_period.split("@");
				for(let t=0;t < splitTimePeriod.length; t++)
				{
					this.resultTimePeriod.push(this.config_time_period[splitTimePeriod[t]]);
				}
			}
			//TIME PERIOD REPLACE @
			
			//QUALIFICATION REPLACE @
			if(this.resultData.qual_cert!=null)
			{
				let splitQualification=this.resultData.qual_cert.split("@");
				for(let q=0;q < splitQualification.length; q++)
				{
					this.resultQualification.push(splitQualification[q]);
				}
			}
			//QUALIFICATION REPLACE @

			//LANGUAGE REPLACE @
			if(this.resultData.language!=null)
			{
				let splitLanguage=this.resultData.language.split("@");
				for(let l=0;l < splitLanguage.length; l++)
				{
					this.resultLanguage.push(splitLanguage[l]);
				}
			}
			//LANGUAGE REPLACE @

			//RELIGIOUS RECORDS REPLACE @
			if(this.resultData.religious_records!=null)
			{
				let splitReligiousRecords=this.resultData.religious_records.split("@");
				for(let r=0;r < splitReligiousRecords.length; r++)
				{
					this.resultReligiousRecords.push(splitReligiousRecords[r]);
				}
			}
			//RELIGIOUS RECORDS REPLACE @
			
			//INTERNATIONAL REPLACE @
			if(this.resultData.international!=null)
			{
				let splitInternational=this.resultData.international.split("@");
				for(let i=0;i < splitInternational.length; i++)
				{
					this.resultInternational.push(splitInternational[i]);
				}
			}
			//INTERNATIONAL REPLACE @
			
			//console.log(this.resultData);					
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
}
