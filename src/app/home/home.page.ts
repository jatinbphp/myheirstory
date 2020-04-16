import {IonSlides}          from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { Routes } from '@angular/router';
import { ClientService } from '../providers/client.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})

export class HomePage 
{
	@ViewChild('mySlider', {static: true}) IonSlides;
	sliderOpts = 
	{
	    autoplay: true,
	    speed: 1000,
	    zoom: 
	    {
	    	maxRatio: 5
	    }
    };
	constructor(public client: ClientService)
	{		
	}
}
