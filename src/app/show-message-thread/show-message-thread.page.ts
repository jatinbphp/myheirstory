import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-show-message-thread',
	templateUrl: './show-message-thread.page.html',
	styleUrls: ['./show-message-thread.page.scss'],
	providers: [DatePipe]
})
export class ShowMessageThreadPage implements OnInit 
{
	public queryString: any=[];
	public queryStringData: any=[];	
	public resultData:any=[];
	public resultDataLength: number;
	public resultDataSuccess:any={};
	public tab_selected: string;
	public messate_to_heirstorian: number;
	public parent_id: number;	
	public question_sku: string;
	public contact_on_date: any;

	public askQuestionForm = this.fb.group({
		messate_to_heirstorian: ['', Validators.required],
		parent_id: ['', Validators.required],
		question_sku: ['', Validators.required],
		contact_on_date: ['', Validators.required],
		question: ['', Validators.required]
	});

	User: string = "Me";
	toUser: string = "HealthBot";
	inp_text: string = "";

	msgList: Array<{
	userId: any,
	userName: any,
	userAvatar: any,
	time: any,
	message: any
	}>;

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private route: ActivatedRoute, private router: Router, private datepipe: DatePipe) 
	{ 
		this.msgList = [
			{
			userId: "HealthBot",
			userName: "HealthBot",
			userAvatar: "assets/imgs/android.png",
			time: "12:00 pm",
			message: "Hello, how can I help you"
			},
			{
			userId: "Me",
			userName: "Me",
			userAvatar: "assets/imgs/boy.png",
			time: "12:00 pm",
			message: "I'm having fever"
			},
			{
			userId: "HealthBot",
			userName: "HealthBot",
			userAvatar: "assets/imgs/android.png",
			time: "12:01 pm",
			message: "Take Paracetamol 500 mg"
			},
			{
			userId: "HealthBot",
			userName: "HealthBot",
			userAvatar: "assets/imgs/android.png",
			time: "12:01 pm",
			message: "Also, take some rest"
			}
		];
	}

	ngOnInit() 
	{ 
		this.contact_on_date = new Date().toISOString();
		this.contact_on_date = this.datepipe.transform(this.contact_on_date, 'yyyy-MM-dd HH:mm:ss');

		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.question_sku=this.queryStringData['question_sku'];
		this.tab_selected=this.queryStringData['tab_selected'];		
	}

	async ionViewDidEnter()
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
			message_id:this.question_sku
		}
		this.client.get_message_thread(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;
			
			if(this.resultData[0].user_id==localStorage.getItem('user_id'))
			{
				let dataUpdateStatus=
				{
					message_id:this.question_sku
				}
				this.client.update_message_read_status(dataUpdateStatus).then(result => 
				{},
				error => 
				{
					loading.dismiss();//DISMISS LOADER
					console.log();
				})		
			}//UPDATE MESSAGE STATUS TO READED
			
			this.resultDataLength=this.resultData.length;
			this.messate_to_heirstorian=this.resultData[0].heistorian_id;
			if(this.resultDataLength > 0)
			{
				let reduceByOne=this.resultDataLength - 1;
				this.parent_id=this.resultData[reduceByOne].id;
			}
			else
			{
				this.parent_id=this.resultData[0].id;	
			}			

			this.askQuestionForm.controls['messate_to_heirstorian'].setValue(this.messate_to_heirstorian);
			this.askQuestionForm.controls['parent_id'].setValue(this.parent_id);
			this.askQuestionForm.controls['question_sku'].setValue(this.question_sku);
			this.askQuestionForm.controls['contact_on_date'].setValue(this.contact_on_date);
			//console.log(this.resultData);						
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	async askQuestion(form)
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
			user_id:localStorage.getItem('user_id'), 
			heistorian_id:form.messate_to_heirstorian,
			question:form.question,
			contact_on_date:form.contact_on_date,
			parent_id:form.parent_id,
			question_sku:form.question_sku
		}
		
		this.client.message_heirstorian(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultDataSuccess=result;			
			if(this.resultDataSuccess.success==true)
			{
				this.askQuestionForm.controls['question'].setValue("");
				this.ionViewDidEnter();
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})

		/*
		if (this.inp_text !== "") 
		{
			this.msgList.push({
				userId: this.User,
				userName: this.User,
				userAvatar: "assets/imgs/boy.png",
				time: "12:01 pm",
				message: this.inp_text
			});
			this.msgList.push({
				userId: this.toUser,
				userName: this.toUser,
				userAvatar: "assets/imgs/android.png",
				time: "12:01 pm",
				message: this.inp_text
			})
			
			this.inp_text = "";
			setTimeout(() => {
				//this.content.scrollToBottom();
			});
		}
		*/
	}

	answerQuestion(message_id,heirstorian_id,question_sku)
	{
		this.queryString = 
		{
			message_id:message_id,
			heirstorian_id:heirstorian_id,
			question_sku:question_sku,
			tab_selected:'Researcher'
		};

		let navigationExtras: NavigationExtras = 
		{
			queryParams: 
			{
				special: JSON.stringify(this.queryString)
			}
		};

		this.client.router.navigate(['/answer-message-thread'], navigationExtras)		
	}	
}
