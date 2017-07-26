import { Injectable } from '@angular/core';

import { ConnectionBackend, Response, Headers, RequestOptions,Http,Request,RequestOptionsArgs } from '@angular/http';

import {Observable} from 'rxjs/Observable';

import { config } from '../app/config';

import 'rxjs/Rx';

@Injectable()
export class CustomHttp extends Http {

  public token:any;
  public endpoint:any;

  constructor (backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
    this.endpoint = config.endpoint;
    this.getApiToken();    
  }

  getApiToken () {        
    return this.token = window.localStorage.getItem('token'); 
  }

 

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

          this.getApiToken();                

          if (typeof url !== 'string' && typeof url.url != 'undefined') {

            if (url.url.indexOf('http') < 0) {
              url.url = config.buildPath(url.url);
            }

            if (url.url.indexOf('?') > 0 && url.url.indexOf('token') < 0) {
              url.url = url.url + '&token=' + this.token;
            } else if(url.url.indexOf('token') < 0) {
              url.url = url.url + '?token=' + this.token;
            }
          } else if (typeof url == 'string' && url.indexOf('http') < 0) {

            url = config.buildPath(url);           

          }                     

           return super.request(url, options);         
    
  }
  
}