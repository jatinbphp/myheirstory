import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
import { AlertController, Events } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
//File Upload
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'; 
//File Upload

@Component({
	selector: 'app-upload-completion-document',
	templateUrl: './upload-completion-document.page.html',
	styleUrls: ['./upload-completion-document.page.scss'],
})
export class UploadCompletionDocumentPage implements OnInit 
{
	
	public resultData: any=[];
	public queryStringData: any=[];
	public booking_id: string;
	public user_id:number;
	public heistorian_id:number;
	public email: string;
	public file_uri: string;
	public selected_file: string;
	public sourse_file_path: string;

	//File Upload	
	private fileTransfer: FileTransferObject;
	//File Upload

	public uploadCompletionDocumentForm = this.fb.group({
		booking_id: ['', Validators.required],
		user_id: ['', Validators.required],
		heistorian_id: ['', Validators.required],
		email: ['', Validators.required],
		file_uri: ['', Validators.required],
		selected_file: ['', Validators.required],
		sourse_file_path: ['', Validators.required],
	});

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private alertCtrl: AlertController, private route: ActivatedRoute, private router: Router, 
	private fileChooser: FileChooser, private filePath: FilePath, private transfer: FileTransfer, 
	private file: File) { }

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
			this.heistorian_id=this.resultData['data'][0].heistorian_id;
			this.user_id=this.resultData['data'][0].booking_user_id;

			this.uploadCompletionDocumentForm.controls['booking_id'].setValue(this.booking_id);
			this.uploadCompletionDocumentForm.controls['user_id'].setValue(this.user_id);
			this.uploadCompletionDocumentForm.controls['heistorian_id'].setValue(this.heistorian_id);
			this.uploadCompletionDocumentForm.controls['email'].setValue(this.email);	
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			this.resultData=[];
			console.log();
		})
	}

	openChooser()
	{
		//console.log('Opening chooser')
		this.fileChooser.open({"mime": "application/pdf"})
		.then(uri => 
		{
			//console.log('File chosen: ', uri);
			this.uploadHandler(uri);
		})
		.catch(e => 
		{
			console.log('Error choosing file: ', e);
		});
	}

	async uploadHandler(uri) 
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

		this.filePath.resolveNativePath(uri).then(url => 
		{
			// url is path of selected file
			var file_name = url.substring(url.lastIndexOf("/") + 1)
			
			this.uploadCompletionDocumentForm.controls['file_uri'].setValue(uri);
			this.uploadCompletionDocumentForm.controls['selected_file'].setValue(file_name);
			this.uploadCompletionDocumentForm.controls['sourse_file_path'].setValue(url);			
			loading.dismiss();//DISMISS LOADER
							
			// fileName is selected file name
		}).catch(err => console.log(err));	
	}

	async upload_completion_document(form)
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

		this.fileTransfer = this.transfer.create();
		let upload_options: FileUploadOptions = 
		{
			headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') },
			fileKey: 'complition_document_heirstorian',
			chunkedMode: false,
			fileName: form.selected_file,
		}

		let other_required_parameters = 
		{
			booking_id: form.booking_id,
			user_id: form.user_id,
			heistorian_id: form.heistorian_id,
			email: form.email
		}

		upload_options.params = other_required_parameters;

		//http://myheirstory.zoom-technologies.co/experi.php
		this.fileTransfer.upload(form.sourse_file_path,this.client.api_url+"user/completion/save", upload_options, true).then((res) => 
		{
			//console.log("file uploaded successfully.", res)			
			this.showMessage();
			loading.dismiss();//DISMISS LOADER
			//this.uploaded = true;
		}).catch((error) => 
		{
			//here logging an error. 
			console.log('upload failed: ' + JSON.stringify(error));
		})				
	}

	async showMessage() 
	{
		const alert = await this.alertCtrl.create({
			header: 'Completion Document',
			message: 'Completion document uploaded successfully!',
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: () => 
				{
					//console.log('Cancel clicked');
				}
			},
			{
				text: 'Ok',
				handler: () => 
				{
					this.client.router.navigate(['/booking-main'])
					//console.log('Ok clicked');
				}
			}
			]
		});
		await alert.present();
	}
}
