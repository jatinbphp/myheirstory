import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
	selector: 'app-message-explanation',
	templateUrl: './message-explanation.page.html',
	styleUrls: ['./message-explanation.page.scss'],
})
export class MessageExplanationPage implements OnInit 
{

	constructor(public modalCtrl: ModalController, public navParams: NavParams) { }

	ngOnInit() { }

	dismissModal()
	{
		this.modalCtrl.dismiss({
			'dismissed': true	
		});
	}

}
