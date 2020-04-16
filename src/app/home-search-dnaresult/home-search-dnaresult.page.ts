import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { SearchMainPage } from '../search-main/search-main.page';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-home-search-dnaresult',
	templateUrl: './home-search-dnaresult.page.html',
	styleUrls: ['./home-search-dnaresult.page.scss'],
})
export class HomeSearchDnaresultPage implements OnInit 
{
	public config_dna_specialist: any=[];
	public config_rate_hourly_options: any=[];
	public queryString: any=[];

	constructor(public fb: FormBuilder, public client: ClientService) 
	{
		this.config_dna_specialist=this.client.config_dna_specialist;  
		this.config_rate_hourly_options=this.client.config_rate_hourly_options;  
	}

	public searchDnaResultForm = this.fb.group({
		dna_specialist: [''],		
		rate: ['']
	});

	ngOnInit() { }

	search_heirstorian(form)
	{
		this.queryString = 
		{
			dna_specialist:(form.dna_specialist) ? form.dna_specialist : "",			
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
