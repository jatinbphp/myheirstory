import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MessageExplanationPage } from '../message-explanation/message-explanation.page';

@Component({
	selector: 'app-message-main',
	templateUrl: './message-main.page.html',
	styleUrls: ['./message-main.page.scss'],
})
export class MessageMainPage implements OnInit 
{

	constructor(public loadingCtrl: LoadingController, public modalCtrl: ModalController) { }

	ngOnInit() { }

	async open_message_information()
	{ 
		const modal = await this.modalCtrl.create({
			component: MessageExplanationPage,			
		});

		return await modal.present();
	}
}
