import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';

import { Router } from '@angular/router';
import { log } from 'util';
import { LogindataService } from '../logindata.service';
import { longStackSupport } from 'q';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  @Input() public isUserLoggedIn: boolean = false;
  public username = "";
  public socialPlatform;
  public userData;
  public email;
  
 // @Output() public childEvent = new EventEmitter();
  @Output() sendUserdata = new EventEmitter<object>();
  @Output() sendToken = new EventEmitter();
 
  public message = "Testing";  
  
  constructor(private socialAuthService: AuthService,private router:Router) {

    gapi.load('auth2', function () {
      gapi.auth2.init()
   });
   }
  //constructor(private router:Router,private _loginDataService:LogindataService) { }
  ngOnInit() {

  }

  googleLogin() {
    let googleAuth = gapi.auth2.getAuthInstance();
    console.log("googleAuth ni type:"+typeof(googleAuth));
    console.log("GoogleAuth here:"+googleAuth);
    
    
    googleAuth.then(() => {
       googleAuth.signIn({scope:'https://www.googleapis.com/auth/drive'}).then(googleUser => {
          console.log(googleUser.getBasicProfile());
          console.log("token aa rahyu:"+googleUser.getAuthResponse().access_token);
          this.sendUserdata.emit(googleUser.getBasicProfile());
          this.sendToken.emit(googleUser.getAuthResponse().access_token);
          this.router.navigate(['./profilepage']);
          this.isUserLoggedIn=true;
          console.log("isUserLoogIN:"+this.isUserLoggedIn);
          
          this.username = googleUser.getBasicProfile().ig;
          
       });
    });
    
    
 }

 
 

  logOut(){


   
  }

  
  // public onClick(sp){

  //   console.log("In Method");
  //   this.socialSignIn(sp);
  //   if(this.username!=null){

  //      console.log("Loggedin Successfull...");
  //      this.isUserLoggedIn = true;
  //      console.log("sachu ke khotu...");
       
  //      //console.log(this.isUserLoggedIn);
  //      //this.childEvent.emit("Parcel aayu che bhai...");
  //      this.router.navigate(['./profilepage']);
  //   }
    

  // }

  // public socialSignIn(socialPlatform : string) {
   
  //   let socialPlatformProvider;
    
  //    if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

      
  //   } 
    
  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log("just checking...");
  //       console.log(socialPlatform+" sign in data : " , userData);
       
  //       this.userData=userData;
  //       this.username=userData.name;
  //       this.email=userData.email;
  //       this.sendUserdata.emit(this.userData);
  //       console.log("header ma userdata:"+this.userData);
  //       console.log(typeof userData);
        
  //      // console.log("This thayu::"+this.userData.name);
        
  //       // Now sign-in with userData
  //       // ...
         
  //     }
     
  //   );

    

   
    
  //   // this.router.navigate(['./profilepage']);
  //   // this.isUserLoggedIn=true;
  // }
  
  
  
 

}
