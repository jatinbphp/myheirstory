import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { SearchMainPage } from '../search-main/search-main.page';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-home-search-familytree',
	templateUrl: './home-search-familytree.page.html',
	styleUrls: ['./home-search-familytree.page.scss'],
})
export class HomeSearchFamilytreePage implements OnInit 
{
	public config_states: any=[];
	public config_time_period: any=[];
	public config_rate_hourly_options: any=[];
	public queryString: any=[];

	constructor(public fb: FormBuilder, public client: ClientService) 
	{
		this.config_states=this.client.config_states; 
		this.config_time_period=this.client.config_time_period; 
		this.config_rate_hourly_options=this.client.config_rate_hourly_options; 
	}

	public searchFamilyTreeForm = this.fb.group({
		states: ['', Validators.maxLength(3)],
		time_period: ['', Validators.maxLength(3)],
		rate: [''],
	});

	ngOnInit() 
	{ }

	
	validation_messages = 
	{
		
		'states': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		],
		'time_period': 
		[
			{ type: 'maxlength', message: 'Maximum 3 can be selected.' }
		]		
	};
	

	search_heirstorian(form)
	{
		this.queryString = 
		{
			states:(form.states) ? form.states.join("@") : "",
			time_period:(form.time_period) ? form.time_period.join("@") : "",
			rate:(form.rate) ? form.rate : "" 
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/search-main'], navigationExtras)
	}
}
