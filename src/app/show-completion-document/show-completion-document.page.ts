import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
//FILE DOWNLOAD
import { File, IWriteOptions, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'; 
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
//FILE DOWNLOAD
//SIGN DOCUMENT
import SignaturePad from 'signature_pad';
//SIGN DOCUMENT
@Component({
	selector: 'app-show-completion-document',
	templateUrl: './show-completion-document.page.html',
	styleUrls: ['./show-completion-document.page.scss'],
})
export class ShowCompletionDocumentPage implements OnInit 
{
	public booking_completion_status: number;
	public resultData: any=[];
	public resultDataResearcher: any=[];	
	public queryStringData: any=[];
	public booking_id: string;
	public email: string;
	public view_as: string;
	public user_signature: string="null";
	//FILE DOWNLOAD
	private fileTransfer: FileTransferObject;
	private downloadFile: string;
	//FILE DOWNLOAD
	//SIGN DOCUMENT
	@ViewChild('sPad', {static: true}) signaturePad;
  	signPad: any;
  	res: any;
  	user_signature_uploaded: any;
	//SIGN DOCUMENT
	
	public signingCompletionDocument = this.fb.group({
		booking_id: ['', Validators.required],
		email: ['', Validators.required],
		heistorian_id: ['', Validators.required],
		cost: ['', Validators.required]
	});

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private alertCtrl: AlertController, private route: ActivatedRoute, private router: Router, 
	private filePath: FilePath, private transfer: FileTransfer, private file: File, 
	private document: DocumentViewer) 
	{ }

	async ngOnInit() 
	{	
		this.route.queryParams.subscribe(params => 
		{
			if(params && params.special)
			{
				this.queryStringData = JSON.parse(params.special);
			}
		});
		this.booking_id=this.queryStringData['booking_id'];
		this.email=this.queryStringData['email'];
		this.view_as=this.queryStringData['view_as'];

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
			booking_id:this.booking_id
		}
		this.client.get_my_booking(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER			
			this.resultData=result;		
			//console.log(this.resultData);
			this.signingCompletionDocument.controls['booking_id'].setValue(this.resultData.data[0].booking_id);
			this.signingCompletionDocument.controls['email'].setValue(this.resultData.data[0].email);
			this.signingCompletionDocument.controls['heistorian_id'].setValue(this.resultData.data[0].heistorian_id);
			this.signingCompletionDocument.controls['cost'].setValue(this.resultData.data[0].booking_cost);

			this.booking_completion_status=this.resultData.data[0].booking_completion[0].booking_completion_status;
			if(this.resultData.data[0].booking_completion[0].complition_document_heirstorian != 'null' && 
			this.resultData.data[0].booking_completion[0].complition_document_heirstorian_url != 'null')
			{
				this.download_completion_document(this.resultData.data[0].booking_completion[0].complition_document_heirstorian,this.resultData.data[0].booking_completion[0].complition_document_heirstorian_url);
			}

			if(this.resultData.data[0].booking_completion[0].booking_completion_status==1)
			{
				this.user_signature=this.resultData.data[0].booking_completion[0].user_signature_url;
			}
			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			this.resultData=[];
			console.log();
		})
	}

	ngAfterViewInit(): void 
	{
    	if(this.view_as=="user")
    	{
    		this.signPad = new SignaturePad(this.signaturePad.nativeElement);
    	}
  	}

	download_completion_document(fileName,filePath)
	{
		//this.file.createDir(this.file.externalRootDirectory,'my_downloads',false).then(responseDir => 
		//{
			//console.log('Directory created',responseDir);
			
			let url = encodeURI(filePath);
			this.fileTransfer = this.transfer.create();
			/*
			let documentDirectory = this.platform.is('android') ? this.file.dataDirectory : this.file.documentsDirectory;
			*/
			this.fileTransfer.download(url, this.file.dataDirectory + fileName, true).then((entry) => 
			{
				//here logging our success downloaded file path in mobile. 
				//console.log('download completed: ' + entry.toURL());

				// open downloaded file 
				this.downloadFile = entry.toURL();

				const options: DocumentViewerOptions = 
				{
					title: 'Completion Document'
				}
				this.document.viewDocument(this.downloadFile, 'application/pdf', options)
				
			}).catch((error) => 
			{
				//here logging an error. 
				//console.log('download failed: ' + JSON.stringify(error));
			});
		//});
	}

	show_completion_document()
	{
		const options: DocumentViewerOptions = 
		{
  			title: 'Completion Document'
		}
		this.document.viewDocument(this.downloadFile, 'application/pdf', options)	
	}	
	
	async make_document_completed(form)
	{		
		//HEIRSTORIAN DETAILS
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

		let dataResearcher = 
		{
			id:form.heistorian_id
		}
		this.client.show_heirstorian(dataResearcher).then(result => 
		{	
			this.resultDataResearcher=result[0];
			if(this.resultDataResearcher['payment_option']=="strip")
			{
				let payable_amount=((form.cost*this.client.site_commision)/100);
	            let final_payable_amount_stripe=((form.cost-payable_amount)*100);
	            let researcher_amount_paid=final_payable_amount_stripe/100;	            
	            let researcher_account_id_paid_with=this.resultDataResearcher['stripe_account_id'];				
				
				let data = {
		  			booking_id:form.booking_id,
		  			email:form.email,
		  			user_signature:this.signPad.toDataURL(),
		  			total_booking_amount:form.cost,
		  			portal_commission:this.client.site_commision,
		  			researcher_amount_paid:researcher_amount_paid,
		  			researcher_account_id_paid_with:researcher_account_id_paid_with,
		  			payment_type:this.resultDataResearcher['payment_option']
		  		}
		  		this.client.upload_signature_completion_document(data).then(result => 
				{	
					loading.dismiss();//DISMISS LOADER
					this.resultData=result;
					if(this.resultData.success==true)
					{
						this.client.router.navigate(['/booking-main'])
					}			
				},
				error => 
				{
					loading.dismiss();//DISMISS LOADER
					console.log();
				})
			}
			if(this.resultDataResearcher['payment_option']=="paypal")
			{
				let payable_amount=((form.cost*this.client.site_commision)/100);
	            let final_payable_amount_paypal=form.cost-payable_amount;
	            let researcher_amount_paid=final_payable_amount_paypal;
	            let researcher_account_id_paid_with=this.resultDataResearcher['account_to_accept_payment'];
	            				
	            let data = {
		  			booking_id:form.booking_id,
		  			email:form.email,
		  			user_signature:this.signPad.toDataURL(),
		  			total_booking_amount:form.cost,
		  			portal_commission:this.client.site_commision,
		  			researcher_amount_paid:researcher_amount_paid,
		  			researcher_account_id_paid_with:researcher_account_id_paid_with,
		  			payment_type:this.resultDataResearcher['payment_option']
		  		}
		  		this.client.upload_signature_completion_document(data).then(result => 
				{	
					loading.dismiss();//DISMISS LOADER
					this.resultData=result;
					if(this.resultData.success==true)
					{
						this.client.router.navigate(['/booking-main'])
					}			
				},
				error => 
				{
					loading.dismiss();//DISMISS LOADER
					console.log();
				})
			}
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
		console.log(this.client.site_commision);		
		//HEIRSTORIAN DETAILS

		/*
		WORKING CODE BEFORE IMPLEMENT [HEIRSTORIAN DETAILS] CODE
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

		let data = {
  			booking_id:form.booking_id,
  			email:form.email,
  			heistorian_id:form.heistorian_id,
  			cost:form.cost,
  			user_signature:this.signPad.toDataURL()
  		}
    	this.client.upload_signature_completion_document(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER
			this.resultData=result;
			if(this.resultData.success==true)
			{
				this.client.router.navigate(['/booking-main'])
			}			
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
		WORKING CODE BEFORE IMPLEMENT [HEIRSTORIAN DETAILS] CODE
		*/		
	}  	

	clearSignature()
	{
		this.signPad.clear();
	}
}
