import { Component } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';

import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage {

	public email:any;
	public password:any; 

	public constructor(public http:Http, private router: Router) {

	}

	ngOnInit() {

		if (window.localStorage.getItem('token')) {
			this.router.navigate(['/gallery']);
		}
	}

	login() {

		

		let form:FormData = new FormData();
		form.append('email', this.email);
		form.append('password', this.password);     
		
		this.http.post('auth/login', form).map(res => res.json()).subscribe(
		data => {
			
			if (data.status != 200) {
				alert(data.statusText);

			} else {
				window.localStorage.setItem('token', data.user.token);
				this.router.navigate(['/gallery']);
			}

		},
		error => {

		});

	
		
	}

}
