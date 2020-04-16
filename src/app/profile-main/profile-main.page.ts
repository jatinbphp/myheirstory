import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../providers/client.service';
//IMAGE UPLOAD
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//IMAGE UPLOAD

@Component({
	selector: 'app-profile-main',
	templateUrl: './profile-main.page.html',
	styleUrls: ['./profile-main.page.scss'],
})
export class ProfileMainPage implements OnInit 
{
	//IMAGE UPLOAD		
  	public selectedImgPreview : string="";
  	//IMAGE UPLOAD
  	profile_photo_url: string="";
  	profile_photo: string="";

	public resultData:any={};
	user_type: string;
	
	public config_hourly_options: any=[];
	public split_hourly_options: any;

	public config_time_period: any=[];
	public split_time_period: any;

	public config_religious_records: any=[];
	public split_religious_records: any;

	public config_specialities_options: any=[];
	public split_specialities_options: any;

	public config_states: any=[];	
	public split_states: any;

	public config_international: any=[];
	public split_international: any;

	public config_immigration_options: any=[];
	
	public config_qua_certif_options: any=[];
	public split_qua_certif_options: any;

	public config_dna_specialist: any=[];
	public config_adoption_help_options: any=[];
	public config_language_options: any=[];
	public split_language_options: any;

	public array_to_check_profile_completion: {}=[];
	public array_profile_completed_rate: any=[];
	public profile_completed_persontage: number = 0;
	public resultDataServices:any=[];

	constructor(public fb: FormBuilder, public client: ClientService, public loadingCtrl: LoadingController, 
	private base64: Base64, private camera: Camera, private filePath: FilePath, private file: File) 
	{
		this.profile_photo_url=this.client.search_profile_photo_url;

		this.user_type=this.client.user_type;
		this.config_hourly_options=this.client.config_hourly_options;
		this.config_time_period=this.client.config_time_period;
		this.config_religious_records=this.client.config_religious_records;
		this.config_specialities_options=this.client.config_specialities_options;
		this.config_states=this.client.config_states;
		this.config_international=this.client.config_international_options;
		this.config_immigration_options=this.client.config_immigration_options;
		this.config_qua_certif_options=this.client.config_qua_certif_options;
		this.config_dna_specialist=this.client.config_dna_specialist;
		this.config_adoption_help_options=this.client.config_adoption_help_options;
		this.config_language_options=this.client.config_language_options;
	}	

	public profileFormUser = this.fb.group({
		first_name: ['', Validators.required],
		last_name: ['', Validators.required],
		mobile: [''],
		email: ['', Validators.required],
		zipcode: [''],		
		user_type: [''],//HIDDEN FIELDS				
		geneaology_research: [''],//HIDDEN FIELDS
		old_photo: [''],//HIDDEN FIELDS
	});

	public profileFormHeirstorian = this.fb.group({
		first_name: ['', Validators.required],
		last_name: ['', Validators.required],
		mobile: [''],
		email: ['', Validators.required],
		zipcode: [''],
		cost: ['', Validators.required],
		//hr_option: ['', Validators.required, Validators.maxLength(3)],
		hr_option: ['', Validators.compose([
			Validators.required,
			Validators.maxLength(2)
		])],
		experience: ['', Validators.required],
		time_period: [''],
		religious_records: [''],
		specialties: ['', Validators.required],
		state: [''],
		international: [''],
		imm_records: ['', Validators.required],
		qual_cert: [''],
		other_qual_cert: [''],
		dna_specialist: ['', Validators.required],
		adoption_help: ['', Validators.required],
		yr_of_experience: ['', Validators.required],
		language: [''],
		other_language: [''],
		website: [''],
		blog: [''],
		acc_instagram: [''],
		acc_facebook: [''],
		acc_twitter: [''],
		location: [''],
		user_type: [''],//HIDDEN FIELDS		
		geneaology_research: [''],//HIDDEN FIELDS
		old_photo: [''],//HIDDEN FIELDS
		other_specialities: ['']
	});

	async ngOnInit()
	{		
		//User Information
		const loading = await this.loadingCtrl.create({
			spinner: null,
			//duration: 5000,
			message: 'Please wait...',
			translucent: true,
			cssClass: 'custom-class custom-loading'
		});
		await loading.present();
		this.client.get_user_profile().then(result => 
		{	
			this.profile_photo=result['photo'];
			if(this.client.user_type=="user")
			{
				this.array_to_check_profile_completion=this.client.array_check_is_profile_completed_user;

				this.profileFormUser.controls['first_name'].setValue(result['first_name']);
				this.profileFormUser.controls['last_name'].setValue(result['last_name']);
				this.profileFormUser.controls['mobile'].setValue(result['phone_no']);
				this.profileFormUser.controls['email'].setValue(result['email']);
				this.profileFormUser.controls['zipcode'].setValue(result['zipcode']);
				//HIDDEN FIELDS
				this.profileFormUser.controls['user_type'].setValue(result['user_type']);		
				this.profileFormUser.controls['geneaology_research'].setValue("Yes");
				this.profileFormUser.controls['old_photo'].setValue(result['photo']);
				//HIDDEN FIELDS
			}
			if(this.client.user_type=="heirstorian")
			{
				this.array_to_check_profile_completion=this.client.array_check_is_profile_completed_researcher;
				
				if(result['hr_option']!=null)
				{
					this.split_hourly_options=result['hr_option'].split("@");
				}
				if(result['time_period']!=null)
				{
					this.split_time_period=result['time_period'].split("@");				
				}
				if(result['religious_records']!=null)
				{
					this.split_religious_records=result['religious_records'].split("@");				
				}
				if(result['specialties']!=null)
				{
					this.split_specialities_options=result['specialties'].split("@");
				}
				if(result['state']!=null)
				{
					this.split_states=result['state'].split("@");
				}
				if(result['international']!=null)
				{
					this.split_international=result['international'].split("@");
				}
				if(result['qual_cert']!=null)
				{
					this.split_qua_certif_options=result['qual_cert'].split("@");
				}
				if(result['language']!=null)
				{
					this.split_language_options=result['language'].split("@");
				}

				
				this.profileFormHeirstorian.controls['first_name'].setValue(result['first_name']);
				this.profileFormHeirstorian.controls['last_name'].setValue(result['last_name']);
				this.profileFormHeirstorian.controls['mobile'].setValue(result['phone_no']);
				this.profileFormHeirstorian.controls['email'].setValue(result['email']);
				this.profileFormHeirstorian.controls['zipcode'].setValue(result['zipcode']);
				this.profileFormHeirstorian.controls['cost'].setValue(result['cost']);
				this.profileFormHeirstorian.controls['hr_option'].setValue(this.split_hourly_options);
				this.profileFormHeirstorian.controls['experience'].setValue(result['experience']);
				this.profileFormHeirstorian.controls['time_period'].setValue(this.split_time_period);
				this.profileFormHeirstorian.controls['religious_records'].setValue(this.split_religious_records);
				this.profileFormHeirstorian.controls['specialties'].setValue(this.split_specialities_options);	
				this.profileFormHeirstorian.controls['state'].setValue(this.split_states);
				this.profileFormHeirstorian.controls['international'].setValue(this.split_international);
				this.profileFormHeirstorian.controls['imm_records'].setValue(result['imm_records']);
				this.profileFormHeirstorian.controls['qual_cert'].setValue(this.split_qua_certif_options);
				this.profileFormHeirstorian.controls['other_qual_cert'].setValue(result['other_qual_cert']);
				this.profileFormHeirstorian.controls['dna_specialist'].setValue(result['dna_specialist']);
				this.profileFormHeirstorian.controls['adoption_help'].setValue(result['adoption_help']);
				this.profileFormHeirstorian.controls['yr_of_experience'].setValue(result['yr_of_experience']);
				this.profileFormHeirstorian.controls['language'].setValue(this.split_language_options);
				this.profileFormHeirstorian.controls['other_language'].setValue(result['other_language']);
				
				this.profileFormHeirstorian.controls['website'].setValue(result['website']);
				this.profileFormHeirstorian.controls['blog'].setValue(result['blog']);
				this.profileFormHeirstorian.controls['acc_instagram'].setValue(result['acc_instagram']);
				this.profileFormHeirstorian.controls['acc_facebook'].setValue(result['acc_facebook']);
				this.profileFormHeirstorian.controls['acc_twitter'].setValue(result['acc_twitter']);
				this.profileFormHeirstorian.controls['location'].setValue(result['location']);
				this.profileFormHeirstorian.controls['other_specialities'].setValue(result['other_specialities']);

				//HIDDEN FIELDS
				this.profileFormHeirstorian.controls['user_type'].setValue(result['user_type']);				
				this.profileFormHeirstorian.controls['geneaology_research'].setValue("Yes");
				this.profileFormHeirstorian.controls['old_photo'].setValue(result['photo']);
				//HIDDEN FIELDS
			}
			this.resultData=result;
			//UPDATE USER,HEIRSTORIAN PROFILE COMPLETION STATUS
			this.array_profile_completed_rate=this.client.get_profile_completion_rate(this.resultData,this.array_to_check_profile_completion);			
			//console.log(this.array_profile_completed_rate);
			let status_to_be_sent="0";
			//console.log(this.array_profile_completed_rate);
			if(this.array_profile_completed_rate.is_profile_completed==0)
			{
				status_to_be_sent="0";
				this.profile_completed_persontage=this.array_profile_completed_rate.profile_completed_rate / 100;
			}
			if(this.array_profile_completed_rate.is_profile_completed==1)
			{
				status_to_be_sent="1";
				this.profile_completed_persontage=100;
			}
			let dataProfileCompletion={				
				'user_id':localStorage.getItem('user_id'),
				'is_profile_completed':status_to_be_sent
			}
			//console.log(dataProfileCompletion);
			this.client.save_profile_completion_rate(dataProfileCompletion).then(result => 
			{},
			error => 
			{
				console.log();
			});
			//console.log(this.array_profile_completed_rate);
			//UPDATE USER,HEIRSTORIAN PROFILE COMPLETION STATUS
			loading.dismiss();//DISMISS LOADER
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		});		
	}

	validation_messages_usr = 
	{
		
		'first_name': 
		[
      		{ type: 'required', message: 'First name is required.' }
    	],
    	'last_name': 
		[
      		{ type: 'required', message: 'Last name is required.' }
    	],
		'email': 
		[
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		]
	};

	validation_messages_heirstorian = 
	{	
		
		'first_name': 
		[
      		{ type: 'required', message: 'First name is required.' }
    	],
    	'last_name': 
		[
      		{ type: 'required', message: 'Last name is required.' }
    	],
		'email': 
		[
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		'cost': 
		[
      		{ type: 'required', message: 'Cost is required.' }
    	],
    	'hr_option': 
		[
      		{ type: 'required', message: 'You must select at least one hourly rate option.' },
      		{ type: 'maxlength', message: 'Maximum 2 can be selected.' }
    	],
    	'experience': 
		[
      		{ type: 'required', message: 'Biography is required.' }
    	],
    	'specialties': 
		[
      		{ type: 'required', message: 'Ethnicity & Race Records is required.' }
    	],
    	'imm_records': 
		[
      		{ type: 'required', message: 'You must select at least one option.' }
    	],
    	'dna_specialist': 
		[
      		{ type: 'required', message: 'You must select at least one option.' }
    	],
    	'adoption_help': 
		[
      		{ type: 'required', message: 'You must select at least one option.' }
    	],
    	'yr_of_experience': 
		[
      		{ type: 'required', message: 'Years of Experience is required.' }
    	]
	};

	async update_my_profile(form)
	{
		const loading = await this.loadingCtrl.create({
			spinner: null,
			//duration: 5000,
			message: 'Please wait...',
			translucent: true,
			cssClass: 'custom-class custom-loading'
		});
		await loading.present();
		let data={
			is_base64:true,
			user_id:localStorage.getItem('user_id'),
			first_name:(form.first_name) ? form.first_name : "NULL", 
			last_name:(form.last_name) ? form.last_name : "NULL",
			phone_no:(form.mobile) ? form.mobile : "NULL", 
			email:(form.email) ? form.email : "NULL",
			user_type:(localStorage.getItem('user_type')) ? localStorage.getItem('user_type') : "NULL",	
			rate_type:(form.rate_type) ? form.rate_type : "NULL",//WATCH
			cost:(form.cost) ? form.cost : 0,
			deposit:(form.deposit) ? form.deposit : 0,//WATCH
			//hr_option:(form.hr_option) ? form['hr_option'].join("@") : "NULL",//MULTIPLE 
			hr_option:(form.hr_option) ? form['hr_option'] : "NULL",//MULTIPLE 
			zipcode:(form.zipcode) ? form.zipcode : "NULL",
			experience:(form.experience) ? form.experience : "NULL", 
			//state:(form.state) ? form['state'].join("@") : "NULL", //MULTIPLE
			state:(form.state) ? form['state'] : "NULL", //MULTIPLE
			//international:(form.international) ? form['international'].join("@") : "NULL", //MULTIPLE
			international:(form.international) ? form['international'] : "NULL", //MULTIPLE
			//time_period:(form.time_period) ? form['time_period'].join("@") : "NULL", //MULTIPLE
			time_period:(form.time_period) ? form['time_period'] : "NULL", //MULTIPLE
			//religious_records:(form.religious_records) ? form['religious_records'].join("@") : "NULL", //MULTIPLE
			religious_records:(form.religious_records) ? form['religious_records'] : "NULL", //MULTIPLE
			//specialties:(form.specialties) ? form['specialties'].join("@") : "NULL", //MULTIPLE
			specialties:(form.specialties) ? form['specialties'] : "NULL", //MULTIPLE
			imm_records:(form.imm_records) ? form.imm_records : "NULL",
			//language:(form.language) ? form['language'].join("@") : "NULL",//MULTIPLE
			language:(form.language) ? form['language'] : "NULL",//MULTIPLE
			other_language:(form.other_language) ? form.other_language : "NULL",
			//qual_cert:(form.qual_cert) ? form['qual_cert'].join("@") : "NULL",//MULTIPLE 
			qual_cert:(form.qual_cert) ? form['qual_cert'] : "NULL",//MULTIPLE 
			other_qual_cert:(form.other_qual_cert) ? form.other_qual_cert : "NULL",
			dna_specialist:(form.dna_specialist) ? form.dna_specialist : "NULL", 
			adoption_help:(form.adoption_help) ? form.adoption_help : "NULL", 
			yr_of_experience:(form.yr_of_experience) ? form.yr_of_experience : "NULL", 
			website:(form.website) ? form.website : "NULL",
			blog:(form.blog) ? form.blog : "NULL",
			acc_instagram:(form.acc_instagram) ? form.acc_instagram : "NULL",
			acc_facebook:(form.acc_facebook) ? form.acc_facebook : "NULL",
			acc_twitter:(form.acc_twitter) ? form.acc_twitter : "NULL",
			location:(form.location) ? form.location : "NULL",
			other_specialities:(form.other_specialities) ? form.other_specialities : "NULL",			
			//profile_picture:this.splitbasic64Content(this.selectedImgPreview),
			profile_picture:this.selectedImgPreview,
			geneaology_research:(form.geneaology_research) ? form.geneaology_research : "YES",
			old_photo:(form.old_photo) ? form.old_photo : "NULL"
    	}
    	this.client.update_my_profile(data).then(result => 
		{	
			loading.dismiss();//DISMISS LOADER
			this.resultData=result;
			if(this.resultData.status==true)
			{				
				
				this.profile_photo=result['photo'];				
				//this.client.router.navigate(['/profile-main']);			
			}
			//AUTOMATIC GENERATE SERVICE FOR HEIRSTORIAN, IF NOT
			if(data.user_type=="heirstorian")
			{
				let data_services=
				{
					id:data.user_id
				}
				this.client.get_heirstorian_services(data_services).then(result => 
				{
					this.resultDataServices=result;	
					if(this.resultDataServices.length===0)
					{
						if(data.imm_records=="Yes")
						{
							let description="The United States is considered a melting pot for a good reason. For generations, families have immigrated to this country from all over the world. I have a deep understanding of federal and state immigration records and I enjoy connecting families to their ancestral homelands.";
							let dataAddService={			
								user_id:data.user_id,
								type_id:6,
								description:description,
								rate:0
							}

							this.client.add_update_my_service(dataAddService,0).then(result => 
							{	
								loading.dismiss();//DISMISS LOADER								
							},
							error => 
							{
								console.log();
							})
						}
						if(data.dna_specialist=="Yes")
						{
							let description="Commercial DNA analysis products have become very prevalent across many segments of society. Understanding your DNA has become a logical next step for many people as they begin their journey for self-discovery. I can provide a deep understanding of the nuances of understanding your DNA results as you seek additional information about your biological family.";
							let dataAddService={			
								user_id:data.user_id,
								type_id:3,
								description:description,
								rate:0
							}

							this.client.add_update_my_service(dataAddService,0).then(result => 
							{	
								loading.dismiss();//DISMISS LOADER								
							},
							error => 
							{
								console.log();
							})
						}
						if(data.adoption_help=="Yes")
						{
							let description="Helping adoptees look for one or both birth parents is a unique service that provides immense hope for families looking for a better understanding of their own personal stories. I can provide assistance to adoptees as they seek to learn more about their biological families.";
							let dataAddService={			
								user_id:data.user_id,
								type_id:2,
								description:description,
								rate:0
							}

							this.client.add_update_my_service(dataAddService,0).then(result => 
							{	
								loading.dismiss();//DISMISS LOADER								
							},
							error => 
							{
								console.log();
							})
						}
						if(data.geneaology_research=="Yes")
						{
							let description="Growing a family tree can be very time consuming and tricky for many families. I have an extensive background for building family trees and providing historical records for families to share with future generations.";
							let dataAddService={			
								user_id:data.user_id,
								type_id:4,
								description:description,
								rate:0
							}

							this.client.add_update_my_service(dataAddService,0).then(result => 
							{	
								loading.dismiss();//DISMISS LOADER								
							},
							error => 
							{
								console.log();
							})
						}
						this.client.router.navigate(['/on-boarding']);
					}
				},
				error => 
				{
					loading.dismiss();//DISMISS LOADER
					console.log();
				})			
				
			}			
			//AUTOMATIC GENERATE SERVICE FOR HEIRSTORIAN, IF NOT
			this.ngOnInit();
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		})
	}

	splitbasic64Content(imagecontent)
	{
		if(imagecontent == '') 
		{
			return '';
		} 
		else 
		{
			//console.log(imagecontent.split('base64,')[1]);
			return imagecontent.split('base64,')[1];
		}
	}

	getPhoto() 
	{		
		/*
		const options: CameraOptions = 
		{
			quality: 100,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		this.camera.getPicture(options).then((imagePath) => 
		{
			this.filePath.resolveNativePath(imagePath).then(imageData => 
			{
				this.base64.encodeFile(imageData).then((base64File: string) => 
				{
					//console.log(base64File);
					this.selectedImgPreview=base64File;
				}, 
				(err) => 
				{
					console.log(err);
				});			
			});
		}, 
		(err) => 
		{
			// Handle error
		});
		*/

		const options: CameraOptions = 
		{  
			//here is the picture quality in range 0-100 default value 50. Optional field  
			quality: 100,  
			
			/**here is the format of an output file. 
			*destination type default is FILE_URI. 
			* DATA_URL: 0 (number) - base64-encoded string,  
			* FILE_URI: 1 (number)- Return image file URI, 
			* NATIVE_URI: 2 (number)- Return image native URI        
			*/  
			destinationType: this.camera.DestinationType.DATA_URL,  
			
			/**here is the returned image file format 
			*default format is JPEG 
			* JPEG:0 (number), 
			* PNG:1 (number), 
			*/  
			encodingType: this.camera.EncodingType.JPEG,  
			
			/** Only works when Picture Source Type is PHOTOLIBRARY or  SAVEDPHOTOALBUM.  
			*PICTURE: 0 allow selection of still pictures only. (DEFAULT) 
			*VIDEO: 1 allow selection of video only.        
			*/  
			mediaType: this.camera.MediaType.PICTURE,  
			
			/**here set the source of the picture 
			*Default is CAMERA.  
			*PHOTOLIBRARY : 0,  
			*CAMERA : 1,  
			*SAVEDPHOTOALBUM : 2 
			*/  
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY  
		} 
		this.camera.getPicture(options).then((imageData) => 
		{
			this.selectedImgPreview='data:image/jpeg;base64,' + imageData;				
		}, 
		(err) => 
		{
			// Handle error
		}); 
	}
}
