import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';//SOCIAL-SHARING
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
	providedIn: 'root'
})
export class ClientService 
{	
	config_user_type_options: { [key: string]: string } =
	{
		'user': 'User',
		'heirstorian': 'Researcher'
	};

	config_rate_type_options: { [key: string]: string } =
	{
		'Fixed': 'Fixed',
		'Hourly': 'Hourly'
	};
	
	config_rate_hourly_options: { [key: string]: string } =
	{
		'0-250': '$0-250',
		'250-500': '$250-500',
		'500-1000': '$500-1000',
		'1000+': '$1000+'
	};

	config_hourly_options: { [key: string]: string } =
	{
		'5': '5 Hours',
		'10': '10 Hours',
		'15': '15 Hours',
		'20': '20 Hours',
		'30': '30 Hours',
		'40': '40 Hours',
		'50': '50 Hours'
	};

	config_time_period: { [key: string]: string } =
	{
		'16': '1600s',
		'17': '1700s',
		'18': '1800s',
		'19': '1900s'
	};

	config_specialities_options: { [key: string]: string } = 
	{
		'African American': 'African American',
		'Asian American': 'Asian American',
		'Native American': 'Native American',
		'Hispanic/Latino American': 'Hispanic/Latino American'
	};

	config_religious_records: { [key: string]: string } =
	{
		'Jewish': 'Jewish',
		'Quaker': 'Quaker',
		'Mormon': 'Mormon'
	};

	config_qua_certif_options: { [key: string]: string } =
	{
		'Board Certification of Genealogists (CG)': 'Board Certification of Genealogists (CG)',
		'Association of Professional Genealogists (APG)': 'Association of Professional Genealogists (APG)'
	};

	config_immigration_options: { [key: string]: string } =
	{
		'Yes': 'Yes',
		'No': 'No'
	};

	config_dna_specialist: { [key: string]: string } =
	{
		'Yes': 'Yes',
		'No': 'No'
	};

	config_adoption_help_options: { [key: string]: string } =
	{
		'Yes': 'Yes',
		'No': 'No'
	};

	config_international_options: { [key: string]: string } =
	{
		'Europe': 'Europe',
		'Asia': 'Asia',
		'Africa': 'Africa'
	};

	config_language_options: { [key: string]: string } =
	{
		'English': 'English',
		'Spanish': 'Spanish',
		'Mandarin': 'Mandarin',
		'Italian	': 'Italian',
		'French': 'French',
		'Dutch': 'Dutch',
		'German': 'German',
		'Japanese': 'Japanese'
	};

	array_check_is_profile_completed_researcher: {} = [
		'cost',
		//'deposit',
		//'deposit',
		'hr_option',
		'experience',
		//'time_period',
		'specialties',
		'imm_records',
		//'qual_cert',
		'dna_specialist',
		'adoption_help',
		'yr_of_experience',
		'account_to_accept_payment',
		'first_name',
		'last_name',
		'photo',
		//'phone_no',
		'email',
		//'language',
		//'location',
		//'state',
		//'zipcode'
	];

	array_check_is_profile_completed_user: {} = [
		'first_name',
		'last_name',
		'photo',
		//'phone_no',
		'email',
		//'language',
		//'location',
		//'state',
		'zipcode'
	];

	config_states: { [key: string]: string } =
	{
		'Alabama': 'Alabama',
		'Alaska': 'Alaska',
		'American Samoa': 'American Samoa',
		'Arizona': 'Arizona',
		'Arkansas': 'Arkansas',
		'California': 'California',
		'Colorado': 'Colorado',
		'Connecticut': 'Connecticut',
		'Delaware': 'Delaware',
		'District of Columbia': 'District of Columbia',
		'Florida': 'Florida',
		'Georgia': 'Georgia',
		'Guam': 'Guam',
		'Hawaii': 'Hawaii',
		'Idaho': 'Idaho',
		'Illinois': 'Illinois',
		'Indiana': 'Indiana',
		'Iowa': 'Iowa',
		'Kansas': 'Kansas',
		'Kentucky': 'Kentucky',
		'Louisiana': 'Louisiana',
		'Maine': 'Maine',
		'Maryland': 'Maryland',
		'Massachusetts': 'Massachusetts',
		'Michigan': 'Michigan',
		'Minnesota': 'Minnesota',
		'Mississippi': 'Mississippi',
		'Missouri': 'Missouri',
		'Montana': 'Montana',
		'Nebraska': 'Nebraska',
		'Nevada': 'Nevada',
		'New Hampshire': 'New Hampshire',
		'New Jersey': 'New Jersey',
		'New Mexico': 'New Mexico',
		'New York': 'New York',
		'North Carolina': 'North Carolina',
		'North Dakota': 'North Dakota',
		'Northern Mariana Islands': 'Northern Mariana Islands',
		'Ohio': 'Ohio',
		'Oklahoma': 'Oklahoma',
		'Oregon': 'Oregon',
		'Palau': 'Palau',
		'Pennsylvania': 'Pennsylvania',
		'Puerto Rico': 'Puerto Rico',
		'Rhode Island': 'Rhode Island',
		'South Carolina': 'South Carolina',
		'South Dakota': 'South Dakota',
		'Tennessee': 'Tennessee',
		'Texas': 'Texas',
		'Utah': 'Utah',
		'Vermont': 'Vermont',
		'Virgin Islands': 'Virgin Islands',
		'Virginia': 'Virginia',
		'Washington': 'Washington',
		'West Virginia': 'West Virginia',
		'Wisconsin': 'Wisconsin',
		'Wyoming': 'Wyoming'
	};
	
	config_services_icons: { [key: string]: string } =
	{
		'2': 'adoption-hover.png',
		'3': 'dna-research-hover.png',
		'4': 'genealogyResearch-hover.png',
		'6': 'immigrationRecords-hover.png'
		
	};

	site_url: string ="https://myheirstory.com/";//http://myheirstory.zoom-technologies.co/
	api_url: string = "https://admin.myheirstory.com/api/";
	//BEFORE::http://zoom-technologies.co/mhs/public/api/
	stripe_key = 'pk_test_V67QexJKsEmiT7sVh3Ia3ph400DaprbQuu';//pk_live_A8QXADaPagWC3iP4C5teaCbk00Tbflip2H
	paypal_environment_production = 'AQvntXAubSqPbi9ZsYMKAULzoJuXqfmJzwtX81plllsR0MXc-ZrLlsb-3Px-CEBoC0VmhuJsJOaHAe8D';
	paypal_environment_sandbox =  'AXMHOinXXGQ7AZiJMON59YRFr9w7qBlYAyVxOQAQroO-3bICUwm4Iz4B2DEWbYo3FInHrakots09_PQ3';
	search_profile_photo_url: string = "https://admin.myheirstory.com/user_photo/";
	//BEFORE::http://zoom-technologies.co/mhs/public/user_photo/
	site_commision : number =7;
	flag_this_researcher_admin_email: string = "support@myheirstory.com";
	token: string;
	user_id: string;
	user_type: string;
	serverResponse: any=[];
	google_client_id: string="883484324739-ntpif1ot6cpsjagmgr4c0ipd59ifu67c.apps.googleusercontent.com";
	google_client_secret: string="3z2uyExrwBe8zSDRQ2vGCJoo";
	queryString: any=[];	
	heirstorian_asked_for_action: number=0;
	has_to_verify=[];

	constructor(public http: HttpClient, private alertCtrl: AlertController, public router: Router, 
	public events: Events, private socialSharing: SocialSharing, private googlePlus: GooglePlus, 
	public zone: NgZone)
	{
		this.token=localStorage.getItem('token');
		this.user_id=localStorage.getItem('user_id');
		this.user_type=localStorage.getItem('user_type');
	}

	getHeaderOptions(): any 
	{	
		var headers = new HttpHeaders().set('Authorization',`${this.token}`).set('Accept','application/json');
		return { headers }	    
	}

	get_profile_completion_rate(arr_profile,array_to_check_profile_completion)
	{
		var profile_completed_rate=0;
		var is_profile_completed=0;
		var number_of_fields=array_to_check_profile_completion.length;
		var weight_of_each_field=100/number_of_fields;
		for(let i=0; i < array_to_check_profile_completion.length ; i++)
		{
			var field_nm=array_to_check_profile_completion[i];
			if(arr_profile[field_nm]!=null)
			{
				profile_completed_rate+=weight_of_each_field;
			}
		}
		if(Math.round(profile_completed_rate) < 100)
		{
			is_profile_completed=0;	
		}
		else
		{
			is_profile_completed=1;
		}

		var profile_completion_response: { [key: string]: number } =
		{
			'profile_completed_rate': Math.round(profile_completed_rate),
			'is_profile_completed': is_profile_completed
		};

		return profile_completion_response;
	}

	save_profile_completion_rate(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/profile_complete/"+data.user_id, data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					//let messageDisplay=this.showMessage(res.message);	
					resolve(res);										
					//reject(messageDisplay);
				}								
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	make_social_loggedin(data)
	{	
		return new Promise((resolve, reject) => 
		{
			//console.log(credentials);
			this.http.post(this.api_url + "user/social", data).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					this.serverResponse=res.data;
					//creating event
					this.events.publish('user:loggedin',this.serverResponse);
					//creating event					
					if(this.serverResponse.user_status==1)
					{
						if(this.serverResponse.status==1)
						{
							let messageDisplay=this.showMessage("Please check your email to complete the registration.");
							reject(messageDisplay);

							this.queryString = 
							{
								from_page:"login",
								email:this.serverResponse.email
							};

							let navigationExtras: NavigationExtras = 
							{
								queryParams: 
								{
									special: JSON.stringify(this.queryString)
								}
							};

							/*
							This portion is made because app.component will redirect APP to home if APP 
							reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
							*/
							
							let obj = {};
					        obj['from_page'] = "login";
					        obj['email'] = this.serverResponse.email;
					        this.has_to_verify.push(obj);
							localStorage.setItem('has_to_verify',JSON.stringify(this.has_to_verify));	
							
							/*
							This portion is made because app.component will redirect APP to home if APP 
							reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
							*/
							
							//this.router.navigate(['/email-verification'], navigationExtras)
							this.router.navigate(['/make-verification'], navigationExtras)
						}

						if(this.serverResponse.status==2)
						{
							this.token=this.serverResponse.api_token;
							this.user_id=this.serverResponse.user_id;
							this.user_type=this.serverResponse.user_type;

							localStorage.setItem('token',this.serverResponse.api_token);
							localStorage.setItem('user_id',this.serverResponse.user_id);
							localStorage.setItem('first_name',this.serverResponse.first_name);
							localStorage.setItem('last_name',this.serverResponse.last_name);
							localStorage.setItem('email',this.serverResponse.email);
							localStorage.setItem('user_type',this.serverResponse.user_type);
							localStorage.setItem('photo',this.serverResponse.photo);					
							resolve(res);										

							let messageDisplay=this.showMessage("You are successfully login!");
							reject(messageDisplay);
							//this.router.navigate(['/profile-main']);
							if(this.heirstorian_asked_for_action > 0)
							{
								this.router.navigate(['/search-main']);
							}
							else
							{
								this.router.navigate(['/view-profile']);
							}
						}
					}
					else
					{
						let messageDisplay=this.showMessage("Your account is not approved by MyHeirStory!");
						reject(messageDisplay);
					}
				}
				else
				{
					let messageDisplay=this.showMessage(res.message);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}
	
	make_me_loggedin(credentials)
	{	
		return new Promise((resolve, reject) => 
		{
			//console.log(credentials);
			this.http.post(this.api_url + "user/login", credentials).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					this.serverResponse=res.data;
					//console.log(this.serverResponse);
					//creating event
					this.events.publish('user:loggedin',this.serverResponse);
					//creating event					
					if(this.serverResponse.user_status==1)
					{
						if(this.serverResponse.status==1)
						{
							let messageDisplay=this.showMessage("Please check your email to complete the registration.");
							reject(messageDisplay);

							this.queryString = 
							{
								from_page:"login",
								email:this.serverResponse.email
							};

							let navigationExtras: NavigationExtras = 
							{
								queryParams: 
								{
									special: JSON.stringify(this.queryString)
								}
							};
							
							/*
							This portion is made because app.component will redirect APP to home if APP 
							reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
							*/
							
							let obj = {};
					        obj['from_page'] = "login";
					        obj['email'] = this.serverResponse.email;
					        this.has_to_verify.push(obj);
							localStorage.setItem('has_to_verify',JSON.stringify(this.has_to_verify));	
							
							/*
							This portion is made because app.component will redirect APP to home if APP 
							reinitilize to after having confirmation code from eamil(gmail) app, so from this portion we can know that it is new registration and redirect APP to verification code screen and not to home
							*/

							//this.router.navigate(['/email-verification'], navigationExtras)
							this.router.navigate(['/make-verification'], navigationExtras)
						}

						if(this.serverResponse.status==2)
						{
							this.token=this.serverResponse.api_token;
							this.user_id=this.serverResponse.user_id;
							this.user_type=this.serverResponse.user_type;

							localStorage.setItem('token',this.serverResponse.api_token);
							localStorage.setItem('user_id',this.serverResponse.user_id);
							localStorage.setItem('first_name',this.serverResponse.first_name);
							localStorage.setItem('last_name',this.serverResponse.last_name);
							localStorage.setItem('email',this.serverResponse.email);
							localStorage.setItem('user_type',this.serverResponse.user_type);
							localStorage.setItem('photo',this.serverResponse.photo);									
							resolve(res);										

							let messageDisplay=this.showMessage("You are successfully login!");
							reject(messageDisplay);
							//this.router.navigate(['/profile-main']);
							if(this.heirstorian_asked_for_action > 0)
							{								
								this.router.navigate(['/search-main']);
							}
							else
							{
								this.router.navigate(['/view-profile']);
							}
						}
					}
					else
					{
						let messageDisplay=this.showMessage("Your account is not approved by MyHeirStory!");
						reject(messageDisplay);
					}
				}
				else
				{
					let messageDisplay=this.showMessage(res.message);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	get_user_profile()
	{		
		return new Promise((resolve, reject) => 
		{	
			let options = this.getHeaderOptions();
			if(this.user_type=="user")
			{
				let postData = 
				{
					user_id:this.user_id
				}
				this.http.post(this.api_url + "user/users/"+this.user_id, postData, options).
				subscribe((res: any) => 
				{
					if(res.success == true)
					{	
						this.serverResponse=res.data[0];
						resolve(this.serverResponse);										
					}
					else
					{
						let messageDisplay=this.showMessage("Token is expired!");
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
	        if(this.user_type=="heirstorian")
			{
				let postData = 
				{
					id:this.user_id
				}
				this.http.post(this.api_url + "user/heistorian/"+this.user_id, postData, options).
				subscribe((res: any) => 
				{
					if(res.success == true)
					{	
						this.serverResponse=res.data[0];
						resolve(this.serverResponse);										
					}
					else
					{
						let messageDisplay=this.showMessage("Token is expired!");
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
			}	        
		});
	}

	update_my_profile(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/updatecost", data, options).subscribe((res: any) => 
			{
				if(res.success == 1)
				{
					//creating event to show updated data in menu, the same event is created on login
					this.events.publish('user:loggedin',res.data);
					//creating event to show updated data in menu, the same event is created on login
					
					let messageDisplay=this.showMessage("Profile successfully updated");					
					resolve(res);										
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage("There is some issue updating Profile!");
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	save_payment_info(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/updatepayment", data, options).subscribe((res: any) => 
			{
				if(res.success == 1)
				{
					let messageDisplay=this.showMessage("Payment method successfully updated!!");	
					resolve(res);										
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage("There is some issue updating Payment Information!");
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	recover_my_password(data)
	{
		return new Promise((resolve, reject) => {
			this.http.post(this.api_url + "user/forgotpassword", data).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					let messageDisplay=this.showMessage("A confirmation code is sent to your email.");		
					resolve(res);										
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage(res.message);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	check_verification_code(data)
	{
		return new Promise((resolve, reject) => 
		{
			if(data.from_page=="forgot-password")
			{
				let dataPass={
					email:data.email,
					confirmation_code:data.code 
				}

				this.http.post(this.api_url + "user/password_confirmation", dataPass).subscribe((res: any) => 
				{
					if(res.success == 1)
					{
						let messageDisplay=this.showMessage("Code verified! Reset your Password.");		
						resolve(res);										
						reject(messageDisplay);
					}
					else
					{
						let messageDisplay=this.showMessage(res.message);
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
	        if(data.from_page=="registration")
			{
				let dataPass={
					email:data.email,
					confirmation_code:data.code 
				}

				this.http.post(this.api_url + "user/confirmation", dataPass).subscribe((res: any) => 
				{
					if(res.success == 1)
					{
						let messageDisplay=this.showMessage("Confirmation made successfully! Please login.");	
						resolve(res);										
						reject(messageDisplay);
					}
					else
					{
						let messageDisplay=this.showMessage(res.message);
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
	        if(data.from_page=="login")
			{
				let dataPass={
					email:data.email,
					confirmation_code:data.code 
				}

				this.http.post(this.api_url + "user/confirmation", dataPass).subscribe((res: any) => 
				{
					if(res.success == 1)
					{
						let messageDisplay=this.showMessage("Confirmation made successfully! Please login.");	
						resolve(res);										
						reject(messageDisplay);
					}
					else
					{
						let messageDisplay=this.showMessage(res.message);
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
		});
	}

	send_verification_code(data)
	{
		return new Promise((resolve, reject) => 
		{			
			if(data.from_page=="forgot-password")
			{
				let dataPass={
					where:"forgot_password" 
				}

				this.http.post(this.api_url + "user/reconfirmation/"+data.email, dataPass).subscribe((res: any) => 
				{
					if(res.success == 1)
					{
						let messageDisplay=this.showMessage("A confirmation code is sent to your email.");		
						resolve(res);										
						reject(messageDisplay);
					}
					else
					{
						let messageDisplay=this.showMessage(res.message);
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
	        if(data.from_page=="registration")
			{
				let dataPass={
					where:"registration" 
				}

				this.http.post(this.api_url + "user/reconfirmation/"+data.email, dataPass).subscribe((res: any) => 
				{
					if(res.success == 1)
					{
						let messageDisplay=this.showMessage("A confirmation code is sent to your email.");		
						resolve(res);										
						reject(messageDisplay);
					}
					else
					{
						let messageDisplay=this.showMessage(res.message);
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
	        if(data.from_page=="login")
			{
				let dataPass={
					where:"login" 
				}

				this.http.post(this.api_url + "user/reconfirmation/"+data.email, dataPass).subscribe((res: any) => 
				{
					if(res.success == 1)
					{
						let messageDisplay=this.showMessage("A confirmation code is sent to your email.");		
						resolve(res);										
						reject(messageDisplay);
					}
					else
					{
						let messageDisplay=this.showMessage(res.message);
						reject(messageDisplay);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }
		});
	}

	change_my_password(data)
	{
		return new Promise((resolve, reject) => 
		{			
			let dataPass={
				token:data.code,
				email:data.email,
				password:data.password_1, 
				password_confirmation:data.password_2 
			}

			this.http.post(this.api_url + "user/resetpassword", dataPass).subscribe((res: any) => 
			{
				if(res.success == 1)
				{
					let messageDisplay=this.showMessage("Password changed successfully.");		
					resolve(res);										
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage(res.message);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	change_account_password(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/changepassword", data, options).subscribe((res: any) => 
			{
				if(res.success == 1)
				{
					let messageDisplay=this.showMessage("Password changed successfully.");		
					resolve(res);										
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage(res.message);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	make_me_signup(data)
	{
		return new Promise((resolve, reject) => 
		{
			this.http.post(this.api_url + "user/register", data).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					let messageDisplay=this.showMessage("You have successfully registered. A confirmation code has been sent to your email.");		
					resolve(res);										
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage(res.errors);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	make_search_heirstorian(data)
	{
		return new Promise((resolve, reject) => 
		{
			this.http.post(this.api_url + "user/search/heistorian", data).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res.data);										
				}
				else
				{
					let messageDisplay=this.showMessage(res.data);
					resolve([]);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	show_heirstorian(data)
	{
		return new Promise((resolve, reject) => 
		{
			this.http.post(this.api_url + "user/heistorian/"+data.id, data).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res.data);										
				}
				else
				{
					let messageDisplay=this.showMessage(res.data);
					resolve([]);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	flag_this_heirstorian(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/mail/admin", data, options).subscribe((res: any) => 
			{
				if(res.success == 1)
				{					
					let messageDisplay=this.showMessage(res.message);
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage(res.data);
					resolve([]);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	rate_this_heirstorian(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/ratings/save", data, options).subscribe((res: any) => 
			{
				if(res.success == 1)
				{					
					let messageDisplay=this.showMessage(res.message);
					resolve(res);
					reject(messageDisplay);
				}
				else if(res.error == true)
				{					
					let messageDisplay=this.showMessage(res.errors);
					resolve(res);
					reject(messageDisplay);
				}
				else
				{
					let messageDisplay=this.showMessage(res.data);
					resolve([]);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_categories(data)
	{
		return new Promise((resolve, reject) => 
		{			
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/category",data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_heirstorian_services(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/get_user_serivce/"+data.id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_heirstorian_service_detail(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/uploadservice/"+data.id,data,options)
			.subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	add_update_my_service(data,row_id)
	{
		return new Promise((resolve, reject) => 
		{
			if(row_id > 0)
			{
				let options = this.getHeaderOptions();
				this.http.post(this.api_url + "user/uploadservice/edit/"+row_id,data,options)
				.subscribe((res: any) => 
				{
					if(res.success == true)
					{					
						let messageDisplay=this.showMessage(res.message);		
						resolve(res);										
						reject(messageDisplay);
					}
					if(res.error == true)
					{					
						let messageDisplay=this.showMessage(res.errors);		
						reject(messageDisplay);
					}				
					else
					{
						resolve([]);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });	
	        } 
	        else
	        {
	        	let options = this.getHeaderOptions();
				this.http.post(this.api_url + "user/uploadservice",data,options)
				.subscribe((res: any) => 
				{
					if(res.success == true)
					{					
						let messageDisplay=this.showMessage(res.message);		
						resolve(res);										
						reject(messageDisplay);
					}
					if(res.error == true)
					{					
						let messageDisplay=this.showMessage(res.errors);		
						reject(messageDisplay);
					}				
					else
					{
						resolve([]);
					}				
				},
		        err => 
		        {
					let errorMessage=this.getErrorMessage(err);
					this.showMessage(errorMessage);
					reject(errorMessage);
		        });
	        }       
		});
	}

	remove_my_service(data,row_id)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/uploadservice/delete/"+row_id,data,options)
			.subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);		
					resolve(res);										
					reject(messageDisplay);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	make_my_booking(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/add",data,options)
			.subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);		
					resolve(res);										
					reject(messageDisplay);
				}
				if(res.success == false)
				{					
					let messageDisplay=this.showMessage(res.message);		
					reject(messageDisplay);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_my_booking(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/get/"+data.booking_id,data,options)
			.subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res);										
				}
				else
				{
					resolve([]);
				}
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	cancel_my_booking(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/delete/"+data.booking_id,data,options)
			.subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);		
					resolve(res);										
					reject(messageDisplay);										
				}
				else
				{
					resolve([]);
				}
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_heirstorian_bookings(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/heistorian/"+data.user_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					//resolve(res);
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_heirstorian_booking_payment_information(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/researcher/"+data.heirstorian_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					//resolve(res);
					resolve(res.users);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_user_bookings(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/user/"+data.user_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					//resolve(res);
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	remove_booking(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/delete/"+data.booking_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);
					reject(messageDisplay);					
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	change_booking_status(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/status/"+data.booking_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);
					reject(messageDisplay);					
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	update_payment_information_for_paypal(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/payment/"+data.booking_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					resolve(res);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	save_payment_information_for_paypal(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/payment_response/save",data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage("Payment is successfully made.");	
					resolve(res);
					reject(messageDisplay);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	message_heirstorian(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/add",data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);
					reject(messageDisplay);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	answer_to_question(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/edit/"+data.id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);
					reject(messageDisplay);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_heirstorian_messages(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/heistorian/"+data.user_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					//resolve(res);
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_user_messages(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/user/"+data.user_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					//resolve(res);
					resolve(res.data);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	get_message_thread(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/get/"+data.message_id, data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{	
					resolve(res.message);										
				}
				else
				{
					let messageDisplay=this.showMessage(res.data);
					resolve([]);
					reject(messageDisplay);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	update_message_read_status(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/user_status/"+data.message_id, data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					resolve(res.message);
				}
				else
				{
					let messageDisplay=this.showMessage(res.data);
					resolve([]);
					reject(messageDisplay);
				}

			},	
	        err => 
	        {
	        	let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });        
		});
	}

	remove_message(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/messages/delete/"+data.message_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);
					reject(messageDisplay);					
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	upload_signature_completion_document(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/completion/update/"+data.booking_id,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);
					reject(messageDisplay);					
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	share(packageName: string, appName: string, social: string, message: string, subject: string, 
	image: string, url:string) 
	{		
		return new Promise((reject) => {
		if(social === "facebook")
		{
			this.socialSharing.canShareVia(packageName,message,subject,image,url).then(() => {
				this.socialSharing.shareViaFacebook(message, image, url).catch(err => {
					
					let messageDisplay=this.showMessage("There was a problem please try later");
					reject(messageDisplay);					
				});
			})
			.catch(err => {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(appName+" "+errorMessage);
				reject(errorMessage);				
			});
		} 
		else if(social === "whatsapp")
		{
			this.socialSharing.canShareVia(packageName,message,subject,image,url).then(() => {
				this.socialSharing.shareViaWhatsApp(message, image, url).catch(err => {
					let messageDisplay=this.showMessage("There was a problem please try later");
					reject(messageDisplay);
				});
			})
			.catch(err => {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(appName+" "+errorMessage);
				reject(errorMessage);
			});
		}
		else if (social === "instagram") 
		{
			this.socialSharing.canShareVia(packageName,message,subject,image,url).then(() => {
				this.socialSharing.shareViaInstagram(message, image).catch(err => {
					let messageDisplay=this.showMessage("There was a problem please try later");
					reject(messageDisplay);
				});
			})
			.catch(err => {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(appName+" "+errorMessage);
				reject(errorMessage);
			});
		} 
		else if (social === "twitter")
		{
			this.socialSharing.canShareVia(packageName,message,subject,image,url).then(() => {
				this.socialSharing.shareViaTwitter(message, image, url).catch(err => {
					let messageDisplay=this.showMessage("There was a problem please try later");
					reject(messageDisplay);
				});
			})
			.catch(err => {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(appName+" "+errorMessage);
				reject(errorMessage);
			});
		} 
		else
		{
			this.socialSharing.share(message, subject, image, url).catch(err => {
				let messageDisplay=this.showMessage("There was a problem please try later");
				reject(messageDisplay);
			});
		}
		});
	}

	logout()
	{
		return new Promise((resolve, reject) => 
		{
		  let options = this.getHeaderOptions();
		  let postData = 
		  {
		    1:1
		  }
		  this.http.post(this.api_url + "user/logout", postData, options).subscribe((res: any) => 
		  {
		    if(res.success == true)
		    {  
		      //GOOGLE LOGOUT
		      this.googlePlus.logout().then(res => 
		      {}, 
		      err => 
		      {
		        console.log(err);
		      });
		      //GOOGLE LOGOUT		      

		      localStorage.removeItem("token");
		      localStorage.removeItem("user_id");
		      localStorage.removeItem("first_name");
		      localStorage.removeItem("last_name");
		      localStorage.removeItem("email");
		      localStorage.removeItem("user_type"); 
		      localStorage.removeItem("photo");
		      resolve(res.data);
		      navigator['app'].exitApp();		                         
		    }
		    else
		    {
		      let messageDisplay=this.showMessage(res.message);
		      reject(messageDisplay);
		    }      
		  },
		  err => 
		  {
		    let errorMessage=this.getErrorMessage(err);
		    this.showMessage(errorMessage);
		    reject(errorMessage);
		  });
		});//CALLING API
	}

	invite_all_invitee(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/mail/invite", data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					let messageDisplay=this.showMessage(res.message);	
					resolve(res);										
					reject(messageDisplay);
				}								
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	update_user_profile_photo(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/photo/"+data.user_id, data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					//creating event to show updated data in menu, the same event is created on login
					this.events.publish('user:loggedin',res.data);
					//creating event to show updated data in menu, the same event is created on login
					
					let messageDisplay=this.showMessage("Photo updated successfully!");	
					resolve(res);										
					reject(messageDisplay);
				}								
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	does_user_researcher_has_completed_booking(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/booking/review", data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					//let messageDisplay=this.showMessage(res.message);	
					resolve(res);										
					//reject(messageDisplay);
				}								
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});
	}

	initiate_stripe_payment_for_booking(data)
	{
		return new Promise((resolve, reject) => {
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/stripe/charge", data, options).subscribe((res: any) => 
			{
				if(res.success == true)
				{
					//let messageDisplay=this.showMessage(res.message);	
					resolve(res);										
					//reject(messageDisplay);
				}								
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });
		});	
	}

	remove_payment_method(data)
	{
		return new Promise((resolve, reject) => 
		{
			let options = this.getHeaderOptions();
			this.http.post(this.api_url + "user/remove_payment_option/"+data.userId,data,options).subscribe((res: any) => 
			{
				if(res.success == true)
				{					
					let messageDisplay=this.showMessage("Payment method removed!");	
					resolve(res);
					reject(messageDisplay);
				}				
				else
				{
					resolve([]);
				}				
			},
	        err => 
	        {
				let errorMessage=this.getErrorMessage(err);
				this.showMessage(errorMessage);
				reject(errorMessage);
	        });	        
		});
	}

	getErrorMessage(err)
	{	
		if(err.error == null)
		{
			return err.message;
		}
		else if(err.error.message)
		{
			return err.error.message;
		} 
		else 
		{
			return err.error.status;
		}
	}

	async showMessage(message)
	{
		if(message == 'Token not valid') 
		{
			/*
			let messageDisplay=this.client.showMessage("You have successfully logged out!");
			*/
			localStorage.removeItem("token");
			localStorage.removeItem("user_id");
			localStorage.removeItem("first_name");
			localStorage.removeItem("last_name");
			localStorage.removeItem("email");
			localStorage.removeItem("user_type"); 
			localStorage.removeItem("photo");			
		    this.router.navigate(['/home']);
		} 
		else 
		{
			const alert = await this.alertCtrl.create(
			{
				header: 'MyHeirStory',
				message: message,
				buttons: 
				[
					/*{
						text: 'Cancel',
						role: 'cancel',
						cssClass: 'secondary',
						handler: (blah) => 
						{
							//console.log('Confirm Cancel: blah');
						}
					},*/ 
					{
						text: 'Okay',
						handler: () => 
						{
							//console.log('Confirm Cancel: blah');
						}
					}
				]
			});
			await alert.present();
		}
	}

	async showMessageOnExit(message, loginStatus)
	{	
		const alert = await this.alertCtrl.create(
		{
			header: 'MyHeirStory',
			message: message,
			buttons: 
			[
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => 
					{
						//console.log('Confirm Cancel: blah');
					}
				}, 
				{
					text: 'Okay',
					handler: () => 
					{
						if(loginStatus==1)
						{
							this.logout();
						}
						else
						{
							navigator['app'].exitApp();
						}
						//console.log('Confirm Cancel: blah');
					}
				}
			]
		});
		await alert.present();		
	}
}
