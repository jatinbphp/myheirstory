import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-answer-message-thread',
	templateUrl: './answer-message-thread.page.html',
	styleUrls: ['./answer-message-thread.page.scss'],
})
export class AnswerMessageThreadPage implements OnInit 
{
	public queryString: any=[];
	public queryStringData: any=[];	
	public resultData:any=[];
	public message_id: number;
	public heirstorian_id: number;
	public question_sku: string;
	public tab_selected: string;

	public answerToQuestionForm = this.fb.group({
		message_id: ['', Validators.required],
		heirstorian_id: ['', Validators.required],
		answer: ['', Validators.required]
	});

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router) { }

	ngOnInit() 
	{ 
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.message_id=this.queryStringData['message_id'];
		this.heirstorian_id=this.queryStringData['heirstorian_id'];
		this.question_sku=this.queryStringData['question_sku'];
		this.tab_selected=this.queryStringData['tab_selected'];

		this.answerToQuestionForm.controls['message_id'].setValue(this.message_id);
		this.answerToQuestionForm.controls['heirstorian_id'].setValue(this.heirstorian_id);
	}

	validation_messages = 
	{		
		'answer': 
		[
      		{ type: 'required', message: 'Answer is required.' }
    	]
	};

	async answer_to_question(form)
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
			id:form.message_id,
			heistorian_id:form.heirstorian_id,
			answer:form.answer
		}
		this.client.answer_to_question(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;	
			if(this.resultData.success == true)
			{
				this.queryString = 
				{
					question_sku:this.question_sku,
					tab_selected:this.tab_selected					
				};

				let navigationExtras: NavigationExtras = 
				{
					queryParams: 
					{
						special: JSON.stringify(this.queryString)
					}
				};

				this.client.router.navigate(['/show-message-thread'], navigationExtras)
			}								
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

}
