import { Component,ViewChild } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';

import { config } from '../../app/config';

import { Router } from '@angular/router';


@Component({
  selector: 'gallery-page',
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class GalleryPage {

	public imageToUpload:any;

	public gallery:any = [];

	public viewImage:any;

	@ViewChild('model') model;

	constructor(public http:Http, private router: Router) {

	}


	ngOnInit() {

		if (!window.localStorage.getItem('token')) {
			this.router.navigate(['/login']);
		}

		this.loadGallery();
	}

	logout() {
		window.localStorage.removeItem('token');
		this.router.navigate(['/login']);

	}

	loadGallery() {
		
		this.http.get('gallery')
		.map(res => res.json())
		.subscribe(data => {
			if (data.media) {
				this.gallery = data.media;
			}
		}, error => {
		});

	}

	showModal(row) {
		this.viewImage = this.buildPath(row._id);
		this.model.nativeElement.style.display = 'block';
		this.model.nativeElement.className += ' in';
	}

	closeModal() {

		this.model.nativeElement.className = 'modal fade';
		setTimeout(() => {
			this.model.nativeElement.style.display = 'none';
		}, 250);
	}

	buildPath(name) {
		let token = window.localStorage.getItem('token');
	  	return config.buildPath('gallery/' + name + '?token=' + token);
	 }


	fileSelected(e) {

		this.imageToUpload = null;

		let fileList: FileList = e.target.files;

		if(fileList.length > 0) {
		    this.imageToUpload = fileList[0];	    
	       
	    }

	}
	
	upload() {

		if (!this.imageToUpload || ! this.imageToUpload.name) {
			return alert('Please select image to upload.');
		}
		
		let form:FormData = new FormData();
		form.append('image', this.imageToUpload, this.imageToUpload.name);

		this.http.post('upload', form)
		.map(res => res.json())
		.subscribe(
			data => {
				window.location.reload();
			},
			error => {
				return alert('Unable to upload image.');
			});
		
	}

}
