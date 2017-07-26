import { Component } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';

import { Router } from '@angular/router';

@Component({
  selector: 'register-page',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterPage {

	public model:any = {};

	public constructor(public http:Http, private router: Router) {

	}

	ngOnInit() {

		if (window.localStorage.getItem('token')) {
			this.router.navigate(['/gallery']);
		}
	}

	register() {

		/*let headers = new Headers({
			     'Content-Type': 'application/x-www-form-urlencoded',
			     'Accept': 'application/json'});

		let options = new RequestOptions({ headers: headers });*/

		let form:FormData = new FormData();
		form.append('email', this.model.email);
		form.append('password', this.model.password);     
		
		this.http.post('auth/register', form).map(res => res.json()).subscribe(
		data => {
			
			if (data.status != 200) {
				alert(data.statusText);
			} else {
				alert('Account created.');
				this.router.navigate(['/login']);
			}
		},
		error => {

		});

	}

}
