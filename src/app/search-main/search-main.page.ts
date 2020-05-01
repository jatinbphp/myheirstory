import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';
import { SearchFiltersPage } from '../search-filters/search-filters.page';

@Component({
	selector: 'app-search-main',
	templateUrl: './search-main.page.html',
	styleUrls: ['./search-main.page.scss'],
})
export class SearchMainPage implements OnInit 
{
	public config_rate_type_options: any=[];
	public config_rate_hourly_options: any=[];
	public config_states: any=[];				//MULTIPLE	
	public config_specialities_options: any=[];	//MULTIPLE
	public config_qua_certif_options: any=[];	//MULTIPLE
	public config_time_period: any=[];			//MULTIPLE
	public config_immigration_options: any=[];
	public config_language_options: any=[];		//MULTIPLE
	public config_dna_specialist: any=[];
	public config_adoption_help_options: any=[];
	public queryString: any=[];
	public queryStringData: any=[];

	search_text: any="";
	rate_type: any="";
	rate: any="";	
	states: any="";	
	specialties: any="";	
	qual_cert: any="";	
	time_period: any="";	
	imm_records: any="";	
	yr_of_experience: any="";	
	language: any="";	
	dna_specialist: any="";
	st_rating: any="";	
	adoption_help: any="";	

	public resultData:any=[];
	public resultDataRating:any=[];
	public resultDataServices:any=[];
	public resultSpeciality:any=[];
	search_profile_photo_url: string="";	

	public heirstorian_asked_for_action:string='';

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router, public modalCtrl: ModalController) 
	{ 
		this.search_profile_photo_url=this.client.search_profile_photo_url;		
		this.config_rate_type_options=this.client.config_rate_type_options;
		this.config_rate_hourly_options=this.client.config_rate_hourly_options;
		this.config_states=this.client.config_states;
		this.config_specialities_options=this.client.config_specialities_options;
		this.config_qua_certif_options=this.client.config_qua_certif_options;
		this.config_time_period=this.client.config_time_period; 
		this.config_immigration_options=this.client.config_immigration_options;	
		this.config_language_options=this.client.config_language_options;
		this.config_dna_specialist=this.client.config_dna_specialist;
		this.config_adoption_help_options=this.client.config_adoption_help_options;
	}

	public SearchMainForm = this.fb.group({				
		search_text: [''],
		rate_type: [''],
		rate: [''],
		states: [''],
		specialties: [''],
		qual_cert: [''],
		time_period: [''],
		imm_records: [''],
		yr_of_experience: [''],
		language: [''],
		dna_specialist: [''],
		st_rating: [''],
		adoption_help: ['']
	});

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
		
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
				if(this.queryStringData['states'])
				{
					this.states=(this.queryStringData['states']) ? this.queryStringData['states'] : "blank";
					//this.SearchMainForm.controls['states'].setValue(this.queryStringData['states'].split("@"));
				}
				if(this.queryStringData['time_period'])
				{
					this.time_period=(this.queryStringData['time_period']) ? this.queryStringData['time_period'] : "blank";//MULTIPLE
					/*this.SearchMainForm.controls['time_period'].
					setValue(this.queryStringData['time_period'].split("@"));*/
				}
				if(this.queryStringData['dna_specialist'])
				{
					this.dna_specialist=(this.queryStringData['dna_specialist']) ? this.queryStringData['dna_specialist'] : "blank";
					/*this.SearchMainForm.controls['dna_specialist'].
					setValue(this.queryStringData['dna_specialist']);*/
				}
				if(this.queryStringData['rate'])
				{
					this.rate=(this.queryStringData['rate']) ? this.queryStringData['rate'] : "blank";
					//this.SearchMainForm.controls['rate'].setValue(this.queryStringData['rate']);
				}
			}//IF PARAMETERS FOUND FROM HOME-SEARCH
			else
			{
				this.queryStringData=[];
				this.SearchMainForm.controls['states'].setValue("");
				this.SearchMainForm.controls['time_period'].setValue("");
				this.SearchMainForm.controls['dna_specialist'].setValue("");
				this.SearchMainForm.controls['rate'].setValue("");
			}//CLEAR SEARCH PARAMETER PASSED FROM HOME-SEARCH
		});

		let data={
			search_text:"blank",
			rate_type:"blank",
			rate:(this.queryStringData['rate']) ? this.queryStringData['rate'] : "blank",
			states:(this.queryStringData['states']) ? this.queryStringData['states'] : "blank",
			specialties:"blank",
			qual_cert:"blank",
			time_period:(this.queryStringData['time_period']) ? this.queryStringData['time_period'] : "blank",
			imm_records:"blank",
			yr_of_experience:"blank",
			dna_specialist:(this.queryStringData['dna_specialist']) ? this.queryStringData['dna_specialist'] : "blank",
			st_rating:"blank",
			adoption_help:"blank"
		}

		this.client.make_search_heirstorian(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;

			
			//[STAR RATING] [SPECIALITY @ REPLACE WITH ,]
			this.resultDataRating=[];			
			this.resultSpeciality=[];
			this.resultDataServices=[];
			for(let i=0;i < this.resultData.length;i++)
			{
				let objRating={};				
				let total_ratings=0;
				let num_of_record=0;
				let average=0;
				if(this.resultData[i].rating_data.length > 0)
				{					
					for(let s=0;s < this.resultData[i].rating_data.length;s++)
					{
						total_ratings+=Number(this.resultData[i].rating_data[s].rating);
						num_of_record++;
					}
					average=Math.round((Number(total_ratings) / Number(num_of_record)));
					objRating[this.resultData[i].user_id] = [average, num_of_record];
					this.resultDataRating.push(objRating);					 
				}
				else
				{
					objRating[this.resultData[i].user_id] = [0, 0];
					this.resultDataRating.push(objRating);
				}
				
				let objSpeciality={};	
				if(this.resultData[i].specialties!=null)
				{
					let re = /\@/gi;
					objSpeciality[this.resultData[i].user_id]=this.resultData[i].specialties.replace(re,",");
					this.resultSpeciality.push(objSpeciality);
				}
				else
				{
					objSpeciality[this.resultData[i].user_id]="";
					this.resultSpeciality.push(objSpeciality);
				}


				let objResearcherServices=[];	
				if(this.resultData[i].service_data.length > 0)
				{					
					for(let sr=0;sr < this.resultData[i].service_data.length;sr++)
					{
						objResearcherServices[sr]=this.client.config_services_icons[this.resultData[i].service_data[sr].type_id];
					}
					this.resultDataServices[this.resultData[i].user_id]=objResearcherServices;
				}
				
				
			}
			//console.log(this.resultDataServices);
			//console.log(this.resultDataRating);
			//[STAR RATING] [SPECIALITY @ REPLACE WITH ,]
			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	ionViewWillEnter()
	{
		if(this.client.heirstorian_asked_for_action > 0)
		{
			this.heirstorian_asked_for_action="heirstorian_"+this.client.heirstorian_asked_for_action;
			this.client.heirstorian_asked_for_action=0;	
		}//THIS LOGIC WILL ADD BORDER TO HEIRSTORIAN WHICH USER WANT TO BOOK,MESSAGE,RATE,FLAG BUT HAVE NOT LOGGED IN, AFTER LOGIN WHEN HE COME BACK THIS WILL SHOW HEIRSTORIAN HEIGHLITED..
		else
		{
			this.heirstorian_asked_for_action="";
		}
	}	

	async search_heirstorian(form)
	{
		this.search_text=(form.search_text) ? form.search_text : "blank";
		this.rate_type=(form.rate_type) ? form.rate_type : "blank";
		this.rate=(form.rate) ? form.rate : "blank";
		this.states=(form.states) ? form['states'].join("@") : "blank";//MULTIPLE
		this.specialties=(form.specialties) ? form['specialties'].join("@") : "blank";//MULTIPLE
		this.qual_cert=(form.qual_cert) ? form['qual_cert'].join("@") : "blank";//MULTIPLE
		this.time_period=(form.time_period) ? form['time_period'].join("@") : "blank";//MULTIPLE
		this.imm_records=(form.imm_records) ? form.imm_records : "blank";
		this.yr_of_experience=(form.yr_of_experience) ? form.yr_of_experience : "blank";
		this.language=(form.language) ? form['language'].join("@") : "blank";//MULTIPLE
		this.dna_specialist=(form.dna_specialist) ? form.dna_specialist : "blank";
		this.st_rating=(form.st_rating) ? form.st_rating : "blank";
		this.adoption_help=(form.adoption_help) ? form.adoption_help : "blank";		

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
			search_text:this.search_text,
			rate_type:this.rate_type,
			rate:this.rate,
			states:this.states,
			specialties:this.specialties,
			qual_cert:this.qual_cert,
			time_period:this.time_period,
			imm_records:this.imm_records,
			yr_of_experience:this.yr_of_experience,
			dna_specialist:this.dna_specialist,
			st_rating:this.st_rating,
			adoption_help:this.adoption_help
		}

		this.client.make_search_heirstorian(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER						
			this.resultData=result;	
			//[STAR RATING] [SPECIALITY @ REPLACE WITH ,]
			this.resultDataRating=[];			
			this.resultSpeciality=[];
			
			for(let i=0;i < this.resultData.length;i++)
			{
				let objRating={};				
				let total_ratings=0;
				let num_of_record=0;
				let average=0;
				if(this.resultData[i].rating_data.length > 0)
				{					
					for(let s=0;s < this.resultData[i].rating_data.length;s++)
					{
						total_ratings+=Number(this.resultData[i].rating_data[s].rating);
						num_of_record++;
					}
					average=Math.round((Number(total_ratings) / Number(num_of_record)));
					objRating[this.resultData[i].user_id] = [average, num_of_record];
					this.resultDataRating.push(objRating);					 
				}
				else
				{
					objRating[this.resultData[i].user_id] = [0, 0];
					this.resultDataRating.push(objRating);
				}

				let objSpeciality={};	
				if(this.resultData[i].specialties!=null)
				{
					let re = /\@/gi;
					objSpeciality[this.resultData[i].user_id]=this.resultData[i].specialties.replace(re,",");
					this.resultSpeciality.push(objSpeciality);
				}
				else
				{
					objSpeciality[this.resultData[i].user_id]="";
					this.resultSpeciality.push(objSpeciality);
				}
			}
			//console.log(this.resultDataRating);
			//[STAR RATING] [SPECIALITY @ REPLACE WITH ,]		
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}//not in use

	show_heirstorian(heirstorian_id)
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

		//WORKING PROPERLY:this.client.router.navigate(['/show-heirstorian'], navigationExtras)//SINGLE PAGE
		this.client.router.navigate(['/show-researcher/show-researcher/show-researcher-info'], navigationExtras);// TAB NAVIGATION APPLIED
	}

	reset_search()
	{
		this.queryStringData=[];
		this.SearchMainForm.controls['search_text'].setValue("");
		this.SearchMainForm.controls['rate_type'].setValue("");
		this.SearchMainForm.controls['specialties'].setValue("");
		this.SearchMainForm.controls['qual_cert'].setValue("");
		this.SearchMainForm.controls['imm_records'].setValue("");
		this.SearchMainForm.controls['yr_of_experience'].setValue("");
		this.SearchMainForm.controls['language'].setValue("");
		this.SearchMainForm.controls['st_rating'].setValue("");
		this.SearchMainForm.controls['adoption_help'].setValue("");
		this.SearchMainForm.controls['states'].setValue("");
		this.SearchMainForm.controls['time_period'].setValue("");
		this.SearchMainForm.controls['dna_specialist'].setValue("");
		this.SearchMainForm.controls['rate'].setValue("");
		this.client.router.navigate(['/search-main']);
	}//not in use

	async open_search_filters()
	{
		const modal = await this.modalCtrl.create({
			component: SearchFiltersPage,
			componentProps: 
			{ 
				searchText: this.search_text,
				RateType: this.rate_type,
				Rate: this.rate,
				States: this.states,
				Specialties: this.specialties, 
				QualCert: this.qual_cert,
				TimePeriod: this.time_period, 
				ImmRecords: this.imm_records,
				YrOfExperience: this.yr_of_experience,
				Language: this.language,
				DnaSpecialist: this.dna_specialist,
				StRating: this.st_rating,
				AdoptionHelp: this.adoption_help
			}
		});

		modal.onDidDismiss().then((data) => 
		{
  			//SEARCH WITH FILTER 
  			//console.log(data.data.searched);  			 			
  			this.client.make_search_heirstorian(data.data.searched).then(result => 
			{				
				//console.log(data.data.searched);
				this.resultData=result;	

				//THIS WILL BE FILL VALUE IN SEARCH-FILTER PAGE
				this.search_text=(data.data.searched.search_text) ? data.data.searched.search_text : "blank";
				this.rate_type=(data.data.searched.rate_type) ? data.data.searched.rate_type : "blank";
				this.rate=(data.data.searched.rate) ? data.data.searched.rate : "blank";
				this.states=(data.data.searched.states) ? data.data.searched.states : "blank";
				this.specialties=(data.data.searched.specialties) ? data.data.searched.specialties : "blank";
				this.qual_cert=(data.data.searched.qual_cert) ? data.data.searched.qual_cert : "blank";//MULTIPLE
				this.time_period=(data.data.searched.time_period) ? data.data.searched.time_period : "blank";//MULTIPLE
				this.imm_records=(data.data.searched.imm_records) ? data.data.searched.imm_records : "blank";
				this.yr_of_experience=(data.data.searched.yr_of_experience) ? data.data.searched.yr_of_experience : "blank";
				this.language=(data.data.searched.language) ? data.data.searched.language : "blank";//MULTIPLE
				this.dna_specialist=(data.data.searched.dna_specialist) ? data.data.searched.dna_specialist : "blank";
				this.st_rating=(data.data.searched.st_rating) ? data.data.searched.st_rating : "blank";
				this.adoption_help=(data.data.searched.adoption_help) ? data.data.searched.adoption_help : "blank";
				//THIS WILL BE FILL VALUE IN SEARCH-FILTER PAGE

				//[STAR RATING] [SPECIALITY @ REPLACE WITH ,]
				this.resultDataRating=[];			
				this.resultSpeciality=[];
				
				for(let i=0;i < this.resultData.length;i++)
				{
					let objRating={};				
					let total_ratings=0;
					let num_of_record=0;
					let average=0;
					if(this.resultData[i].rating_data.length > 0)
					{					
						for(let s=0;s < this.resultData[i].rating_data.length;s++)
						{
							total_ratings+=Number(this.resultData[i].rating_data[s].rating);
							num_of_record++;
						}
						average=Math.round((Number(total_ratings) / Number(num_of_record)));
						objRating[this.resultData[i].user_id] = [average, num_of_record];
						this.resultDataRating.push(objRating);					 
					}
					else
					{
						objRating[this.resultData[i].user_id] = [0, 0];
						this.resultDataRating.push(objRating);
					}

					let objSpeciality={};	
					if(this.resultData[i].specialties!=null)
					{
						let re = /\@/gi;
						objSpeciality[this.resultData[i].user_id]=this.resultData[i].specialties.replace(re,",");
						this.resultSpeciality.push(objSpeciality);
					}
					else
					{
						objSpeciality[this.resultData[i].user_id]="";
						this.resultSpeciality.push(objSpeciality);
					}
				}
				//console.log(this.resultDataRating);
				//[STAR RATING] [SPECIALITY @ REPLACE WITH ,]		
			},
			error => 
			{
				console.log();
			})
  			//SEARCH WITH FILTER
  			//console.log(data);
		})

		return await modal.present();
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

		this.client.router.navigate(['/book-heirstorian'], navigationExtras);
	}
}
