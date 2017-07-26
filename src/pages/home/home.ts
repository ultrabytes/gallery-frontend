import { Component } from '@angular/core';

import { Http } from '@angular/http';

import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomePage {

	public image:any;

	constructor(public http:Http, private router: Router) {

	}
	
	ngOnInit() {

		if (window.localStorage.getItem('token')) {
			this.router.navigate(['/gallery']);
		}

		this.http.get('http://www.splashbase.co/api/v1/images/random')
		.map(res => res.json())
		.subscribe(data => {

			if (data && data.url) {
				this.image = data.url;
			}

		}, error => {})
		
	}

}
