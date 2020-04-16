import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-search-filters',
	templateUrl: './search-filters.page.html',
	styleUrls: ['./search-filters.page.scss'],
})
export class SearchFiltersPage implements OnInit 
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

	@Input() searchText: any="";
	@Input() RateType: any="";
	
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

	constructor(public fb: FormBuilder, public client: ClientService, public modalCtrl: ModalController, 
	public navParams: NavParams) 
	{
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
		states: ['', Validators.maxLength(3)],
		specialties: ['', Validators.maxLength(3)],
		qual_cert: ['', Validators.maxLength(3)],
		time_period: ['', Validators.maxLength(3)],
		imm_records: [''],
		yr_of_experience: [''],
		language: ['', Validators.maxLength(3)],
		dna_specialist: [''],
		st_rating: [''],
		adoption_help: ['']
	});

	ngOnInit() 
	{
		this.SearchMainForm.controls['search_text'].setValue(this.navParams.get('searchText'));
		this.SearchMainForm.controls['rate_type'].setValue(this.navParams.get('RateType'));
		this.SearchMainForm.controls['rate'].setValue(this.navParams.get('Rate'));
		this.SearchMainForm.controls['states'].setValue(this.navParams.get('States').split("@"));
		this.SearchMainForm.controls['specialties'].setValue(this.navParams.get('Specialties').split("@"));
		this.SearchMainForm.controls['qual_cert'].setValue(this.navParams.get('QualCert').split("@"));
		this.SearchMainForm.controls['time_period'].setValue(this.navParams.get('TimePeriod').split("@"));
		this.SearchMainForm.controls['imm_records'].setValue(this.navParams.get('ImmRecords'));
		this.SearchMainForm.controls['yr_of_experience'].setValue(this.navParams.get('YrOfExperience'));
		this.SearchMainForm.controls['language'].setValue(this.navParams.get('Language').split("@"));
		this.SearchMainForm.controls['dna_specialist'].setValue(this.navParams.get('DnaSpecialist'));
		this.SearchMainForm.controls['st_rating'].setValue(this.navParams.get('StRating'));
		this.SearchMainForm.controls['adoption_help'].setValue(this.navParams.get('AdoptionHelp'));
	}

	validation_messages = 
	{
		
		'states': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		],
		'specialties': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		],
		'qual_cert': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		],
		'time_period': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		],
		'language': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		]		
	};

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
			language:this.language,
			dna_specialist:this.dna_specialist,
			st_rating:this.st_rating,
			adoption_help:this.adoption_help
		}

		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		this.modalCtrl.dismiss({
			'dismissed': true,
			'searched': data	
		});		
	}
	
	reset_search()
	{
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
	}

	dismissModal(form)
	{
		// using the injected ModalController this page
		// can "dismiss" itself and optionally pass back data
		
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

		this.modalCtrl.dismiss({
			'dismissed': true,
			'searched': data	
		}); 
    }
}
