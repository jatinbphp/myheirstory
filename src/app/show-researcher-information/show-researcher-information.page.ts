import { Component, OnInit } from '@angular/core';
import { ClientService } from '../providers/client.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
	selector: 'app-show-researcher-information',
	templateUrl: './show-researcher-information.page.html',
	styleUrls: ['./show-researcher-information.page.scss'],
})
export class ShowResearcherInformationPage implements OnInit 
{
	public heirstorian_id: number = 0;
	public resultData:any={};

	constructor(public client: ClientService, public modalCtrl: ModalController, 
	public navParams: NavParams) 
	{ 
		this.heirstorian_id=this.navParams.get('heirstorian_id');
	}

	ngOnInit() 
	{ 
		let data={
			id:this.heirstorian_id
		}
		this.client.show_heirstorian(data).then(result => 
		{	
			this.resultData=result[0];
			//console.log(this.resultData);
		},
		error => 
		{
			console.log();
		})
		//console.log("Researcher Information:",this.heirstorian_id);
	}

	dismissModal(form)
	{
		this.modalCtrl.dismiss({
			'dismissed': true
		});
	}
}
