import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { log } from 'util';
import { Dropbox } from 'dropbox';
import { HeaderComponent } from '../header/header.component';
import { Profile } from 'selenium-webdriver/firefox';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  public myProfile:boolean;
  public addPassword:boolean;
  public randomPassword="";
  public username;
  public userData;
  public message;
  public email;
  public token;
  
  //@ViewChild(HeaderComponent) child;
  constructor() { }

  getUserdata($event) {
    this.userData = $event;
  }

   getToken($event){
    this.token = $event;
  }

  
  // ngAfterViewInit() {
  //   this.message = this.child.message;
  //   console.log("main mmethod ma:"+this.message);
  //   this.userData = this.child.userData;
  //   this.username = this.child.username;
  //   console.log("main  method ma user:"+this.userData);
  //   console.log("main  method ma username:"+this.username);
    
    
  // }

  
  onClick(field){

    // console.log("Profile ma:"+this.userData);
    // console.log("navi rite ma message:"+this.message);
    // console.log("juni rite ma user:"+this.userData);
    console.log("juni rit ma usernu name:"+this.userData.ofa);
    console.log("juni rit ma usernu email:"+this.userData.U3);
    console.log("juni rit  ma token:"+ this.token);
    
    
    

    
    
    
    if(field==="myProfile"){
      this.myProfile=true;
      this.addPassword = false;
    }
    if(field==="addPassword"){
      this.myProfile = false;
      this.addPassword=true;
      
      
    }

    console.log(this.myProfile);
  }

  generatePassword() {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < 12; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    console.log(pass);
    this.randomPassword = pass;
    return pass;
}

  submitData(applicationname, username, password){

    // console.log(applicationname);
    // console.log(username);
    // console.log(password);
    let columns= [
      {
          display: 'Application Name',
          variable: 'applicationname',
          filter: 'text',
      },
      {
          display: 'UserName',
          variable: 'username',
          filter: 'text'
      },
      
      {
          display: 'Password',
          variable: 'password',
          filter: 'text'
      }
    ]
    let data = [

      {
        applicationname:applicationname,
        username:username,
        password:password
      }
    ];
    let collection: any[] = [];
    let exprtcsv: any[] = [];
        (<any[]>JSON.parse(JSON.stringify(data))).forEach(employee => {
            let row = new Object();
            for (let i = 0; i < columns.length; i++) {
                let transfrmValue = ProfileComponent.transform(employee[columns[i].variable], columns[i].filter);
                row[columns[i].display] = transfrmValue;
            }
            exprtcsv.push(row);
            console.log(exprtcsv);
            this.downloadcsv(exprtcsv, "password_wala");
        });
        
  }
   

  public downloadcsv(data: any, exportFileName: string) {
    let csvData = this.convertToCSV(data);
    let blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    console.log("blob su che..."+blob.type)
    

    // File Upload Code
    var fileContent = csvData; // As a sample, upload a text file.
    console.log("fileContent :: " + Object.values(fileContent));
    var file = new Blob([fileContent], {type: 'text/csv'});
    var metadata = {
        'title': 'passwordwala.csv',
        'name': 'passwordwala', // Filename at Google Drive
        'mimeType': 'text/csv', // mimeType at Google Drive
        'parents': ['### folder ID ###'], // Folder ID at Google Drive
    };

    var accessToken = this.token; // Here gapi is used for retrieving the access token.
    console.log("accessToken :: " + accessToken);
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);
    
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'json';
    console.log("XHR :: " + Object.values(xhr));
    xhr.onload = () => {
        console.log(xhr.response.id); // Retrieve uploaded file ID.
    };
    xhr.send(file);
   //xhr.send(form);
    console.log("success for Google Drive.");
   
    
    console.log("Khali Dropbox nu karyu check ahiya...");
    





    // var fileContent = 'sample text'; // As a sample, upload a text file.
    // var file = new Blob([fileContent], {type: 'text/plain'});
    // var metadata = {
    //   'name': 'sampleName', // Filename at Google Drive
    //   'mimeType': 'text/plain', // mimeType at Google Drive
    //   //'parents': ['### folder ID ###'], // Folder ID at Google Drive
    // } ;
    
  //   var accessToken = ;
  //    // Here gapi is used for retrieving the access token.
  //   console.log("accesstoken here:"+accessToken);
    
  //   var form = new FormData();
  //   form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
  //   form.append('file', file);

  // var xhr = new XMLHttpRequest();
  // xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
  // xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  // xhr.responseType = 'json';
  // xhr.onload = () => {
  //   console.log(xhr.response.id); // Retrieve uploaded file ID.
  // };
  // xhr.send(form);


  
  
  
  
//   var uploader = new UploaderForGoogleDrive({
//     file: file.Blob,
//     token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
//     metadata: metadata,
//     onError: onError,
//     onComplete: onComplete,
//     onProgress: onProgress,
//     params: {
//         convert: false,
//         ocr: false
//     }

// });

// uploader.upload();
  // if (navigator.msSaveBlob) { // IE 10+
  //     navigator.msSaveBlob(blob, this.createFileName(exportFileName))
  //   } 
  // else {
  //       let link = document.createElement("a");
  //       if (link.download !== undefined) { // feature detection
  //           // Browsers that support HTML5 download attribute
  //           let url = URL.createObjectURL(blob);
  //           console.log("url..."+url);
            
  //           link.setAttribute("href", url);
  //           link.setAttribute("download", this.createFileName(exportFileName));
  //           //link.style = "visibility:hidden";
  //           document.body.appendChild(link);
  //           link.click();
  //           document.body.removeChild(link);
  //       }
  //   }
}

private convertToCSV(objarray: any) {
    let array = typeof objarray != 'object' ? JSON.parse(objarray) : objarray;
    let str = '';
    let row = "";

    for (let index in objarray[0]) {
        //Now convert each value to string and comma-separated
        row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ','
            line += JSON.stringify(array[i][index]);
        }
        str += line + '\r\n';
    }
    return str;
}

private createFileName(exportFileName: string): string {
    let date = new Date();
    return (exportFileName  + '.csv')
}

public static transform(value: any, filter: any): any {
    if (value == null) { return '' }
    switch (filter) {
        case 'text':
            return value;
        case 'date':
            return new Date(value).toLocaleDateString();
        default:
            return value;
    }
}


  ngOnInit() {
  }

}
