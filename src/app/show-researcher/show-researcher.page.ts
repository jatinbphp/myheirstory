import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';
import { ShowResearcherInformationPage } from '../show-researcher-information/show-researcher-information.page';

@Component({
	selector: 'app-show-researcher',
	templateUrl: './show-researcher.page.html',
	styleUrls: ['./show-researcher.page.scss'],
})
export class ShowResearcherPage implements OnInit 
{	

	public queryStringData: any=[];
	public heirstorian_id: number;	
	
	constructor(private route: ActivatedRoute, private router: Router, 
	public loadingCtrl: LoadingController, public modalCtrl: ModalController) { }

	ngOnInit() 
	{ 
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.heirstorian_id=this.queryStringData['heirstorian_id'];
	}	

	async show_heirstorian_info()
	{
		const modal = await this.modalCtrl.create({
			component: ShowResearcherInformationPage,
			componentProps: 
			{ 
				heirstorian_id: this.heirstorian_id,
			}
		});

		return await modal.present();
		console.log(this.heirstorian_id);
	}
}
