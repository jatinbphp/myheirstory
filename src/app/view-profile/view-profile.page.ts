import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ClientService } from '../providers/client.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';//SOCIAL-SHARING
//IMAGE UPLOAD
import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//IMAGE UPLOAD
@Component({
	selector: 'app-view-profile',
	templateUrl: './view-profile.page.html',
	styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit 
{
	//IMAGE UPLOAD		
  	public selectedImgPreview : string="";
  	//IMAGE UPLOAD

	profile_photo_url: string="";
  	profile_photo: string="";

	public resultData:any={};
	public resultDataRating:number=0;
	public resultNumberOfRating:number=0;
	public resultLanguages:any=[];
	public resultLanguagesString:string;
	public resultRegions:any=[];
	public resultRegionsString:string;
	public resultSpecialities:any=[];
	public resultSpecialitiesString:string;
	public resultQualification:any=[];
	public resultQualificationString:string;
	user_type: string;
	
	public social_message: string;//SOCIAL-SHARING
	public social_subject: string;//SOCIAL-SHARING
	public social_image: string;//SOCIAL-SHARING
	public social_url: string;//SOCIAL-SHARING

	constructor(public client: ClientService, public loadingCtrl: LoadingController, 
	public actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing,
	private base64: Base64, private camera: Camera, private filePath: FilePath, private file: File) 
	{ 
		this.profile_photo_url=this.client.search_profile_photo_url;
		this.user_type=this.client.user_type;
	}

	ngOnInit()
	{ }
	
	async ionViewWillEnter() 
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
			loading.dismiss();//DISMISS LOADER
			this.profile_photo=result['photo'];
			this.resultData=result;
			if(this.user_type=="heirstorian")
			{
				//STAR RATING
				this.resultDataRating=0;						
				let total_ratings=0;
				let num_of_record=0;
				let average=0;
				if(this.resultData.rating_data.length > 0)
				{					
					for(let s=0;s < this.resultData.rating_data.length;s++)
					{
						total_ratings+=Number(this.resultData.rating_data[s].rating);
						num_of_record++;
					}
					average=Math.round((Number(total_ratings) / Number(num_of_record)));				
					this.resultDataRating=average;
					this.resultNumberOfRating=num_of_record;
				}
				else
				{				
					this.resultDataRating=0;
				}			
				//STAR RATING

				//LANGUAGE REPLACE @
				if(this.resultData.language!=null)
				{
					let splitLanguages=this.resultData.language.split("@");
					for(let q=0;q < splitLanguages.length; q++)
					{
						this.resultLanguages.push(splitLanguages[q]);
					}
					this.resultLanguagesString=this.resultLanguages.join(", ");
				}
				//LANGUAGE REPLACE @

				//REGIONS REPLACE @
				if(this.resultData.state!=null)
				{
					let splitRegions=this.resultData.state.split("@");
					for(let q=0;q < splitRegions.length; q++)
					{
						this.resultRegions.push(splitRegions[q]);
					}
					this.resultRegionsString=this.resultRegions.join(", ");
				}
				//REGIONS REPLACE @
				
				//SPECIALITIES REPLACE @
				if(this.resultData.specialties!=null)
				{
					let splitSpecialities=this.resultData.specialties.split("@");
					for(let q=0;q < splitSpecialities.length; q++)
					{
						this.resultSpecialities.push(splitSpecialities[q]);
					}
					this.resultSpecialitiesString=this.resultSpecialities.join(", ");
				}
				//SPECIALITIES REPLACE @

				//QUALIFICATION REPLACE @
				if(this.resultData.qual_cert!=null)
				{
					let splitQualification=this.resultData.qual_cert.split("@");
					for(let q=0;q < splitQualification.length; q++)
					{
						this.resultQualification.push(splitQualification[q]);
					}
					this.resultQualificationString=this.resultQualification.join(", ");
				}
				//QUALIFICATION REPLACE @
			}

			this.social_message="MyHeirStory is just fantastic!";
			this.social_subject=" ";
			this.social_image=this.client.search_profile_photo_url+this.resultData['photo'];
			this.social_url=this.client.site_url;
			
			//console.log(this.resultData);
		},
		error => 
		{
			loading.dismiss();//DISMISS LOADER
			console.log();
		});
	}

	edit_profile()
	{
		this.client.router.navigate(['/profile-main'])
	}

	async presentActionSheet()
	{
		this.social_message="Checkout My Profile\n";
		this.social_message += this.resultData.first_name +" "+this.resultData.last_name;		
		this.social_message +="\nJoin MyHeirStory Today";
		
		const actionSheet = await this.actionSheetCtrl.create({
		header: 'SHARE WITH',
		buttons: [
			{
				text: "Share on Facebook",
				role: "destructive",
				cssClass: " action-facebook",
				icon: "logo-facebook",
				handler: () => {

					this.client.share("com.facebook.katana","Facebook","facebook",
					this.social_message,this.social_subject,this.social_image,this.social_url);
				}
			},
			{
				text: "Share on WhatsApp",
				role: "destructive",
				cssClass: " action-whatsup",
				icon: "logo-whatsapp",
				handler: () => {
					this.client.share("com.whatsapp","Whatsapp","whatsapp",
					this.social_message,this.social_subject,this.social_image,this.social_url);
				}
			},
			{
				text: "Share on Instagram",
				role: "destructive",
				cssClass: " action-instagram",
				icon: "logo-instagram",
				handler: () => {
					this.client.share("com.instagram.android","Instagram","instagram",
					this.social_message,this.social_subject,this.social_image,this.social_url);
				}
			},
			{
				text: "Share on Twitter",
				role: "destructive",
				cssClass: " action-twitter",
				icon: "logo-twitter",
				handler: () => {
					this.client.share("com.twitter.android","Twitter","twitter",
					this.social_message,this.social_subject,this.social_image,this.social_url);
				}
			},
			{
				text: "More share options",
				role: "destructive",
				cssClass: " action-regular",
				icon: "share",
				handler: () => {
					this.client.share("none","Share","none",
					this.social_message,this.social_subject,this.social_image,this.social_url);
				}
			}
		]
	});
	await actionSheet.present();
	}

	invite()
	{
		this.client.router.navigate(['/invite'])	
	}

	getPhoto() 
	{	

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
			
			//UPDATE IMAGE						
			let data = {
				user_id : this.resultData['user_id'],
				email : this.resultData['email'],
				user_photo : this.selectedImgPreview,
				old_photo : this.resultData['photo']	
			}
			this.client.update_user_profile_photo(data).then(resultPhotoUpdate => 
			{					
				this.ionViewWillEnter();				
				//console.log(resultPhotoUpdate);
			},
			error => 
			{

			});			
			//UPDATE IMAGE
			//console.log(this.selectedImgPreview);
			//console.log(this.resultData);
		}, 
		(err) => 
		{
			// Handle error
		}); 
	}
}
