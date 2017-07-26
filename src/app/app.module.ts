import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {CustomHttp} from '../providers/CustomHttp';
import { 

  HttpModule, 
  Http, 
  XHRBackend, ResponseOptions, RequestOptions, 
  XSRFStrategy, BrowserXhr, BaseRequestOptions, 
  BaseResponseOptions 
} from '@angular/http';


export function customHttp(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new CustomHttp(backend, defaultOptions)
}

/* pages */
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { GalleryPage } from '../pages/gallery/gallery';
import { HomePage } from '../pages/home/home';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'gallery',
    component: GalleryPage
  },
  {
    path: 'home',
    component: HomePage
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    GalleryPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    {
      provide:Http, 
      useFactory:customHttp,
      deps: [XHRBackend, RequestOptions]
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
