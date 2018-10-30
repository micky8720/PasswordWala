import { Injectable } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

import { Router } from '@angular/router';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LogindataService {

  public userData;
constructor(private socialAuthService: AuthService) {} 



  getUserData(socialPlatform){

    let socialPlatformProvider;
    
     if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

      
    } 
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log("just checking...");
        console.log(socialPlatform+" sign in data : " , userData);
        console.log(userData.name);
        this.userData = userData;
      }
     
    );
    return this.userData;
  }

}
