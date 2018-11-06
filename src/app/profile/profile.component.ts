import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { log } from 'util';
import { Dropbox } from 'dropbox';
import { HeaderComponent } from '../header/header.component';
import { Profile } from 'selenium-webdriver/firefox';
import { Driver } from 'selenium-webdriver/safari';
import { parseCommandLine } from 'typescript';
//import { token_dropbox} from './../../assets/js/index'
declare var secrets:any;




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  public myProfile:boolean;
  public addPassword:boolean;
  public showPassword:boolean;
  public randomPassword="";
  public username;
  public userData;
  public message;
  public email;
  public token;
  public token_db;
  public dataFromDrive="";
  public dataFromDropbox="";
  

  
  
  //@ViewChild(HeaderComponent) child;
  print(){
      console.log("profile ni method...");
      

      
  }
  x = this.print();

   
  constructor() {

    
    
   }
   ngOnInit() {

     
     const demo = token_dropbox;
     console.log("Profile ts ma db nu token:" + demo);
     this.token_db = demo;

   }

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
      this.showPassword = false;
    }
    if(field==="addPassword"){
      this.myProfile = false;
      this.addPassword=true; 
      this.showPassword = false;
      
    }
    if(field=="showPassword"){
        this.showPassword = true;
        this.addPassword = false;
        this.myProfile = false;


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
    

  showPasswordMethod(){
    
    var accessToken = this.token;
    var accessToken_db = this.token_db;
    var demo = "";
    console.log("before the get request...");
    var fileID;
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://www.googleapis.com/drive/v3/files/');
    console.log("111");
    
    xhr1.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    console.log("22");
    xhr1.responseType = 'text';
    console.log("33");
    xhr1.onload = () => {
        console.log("44");
        console.log("Inside file data:"+xhr1.responseText); // Retrieve uploaded file ID.
        var exctractedJSON = JSON.parse(xhr1.responseText);
        var group = xhr1.responseText;
        console.log("Posts :: " + exctractedJSON.files[0]);
        var keys = Object.keys(exctractedJSON);
        keys.forEach(function(key) {
            if(key == 'files')
            {
                console.log("person is files :: " + exctractedJSON[key] );
                var items = Object.keys(exctractedJSON[key]);
                console.log("1");
                items.forEach(function(item) {
                  console.log("2" + item);
                  var value = exctractedJSON[key][item];
                  console.log("3" + value);
                  console.log("Final " + key+': '+item+' = '+value);
                  console.log("4" + value.name);
                  if(value.name == "passwordwala.csv")
                  {
                    console.log("5555");
                    fileID = value.id;
                    console.log("Passwordwala FileID :: " + fileID);
                      
                  }
                  console.log("6666");
                });
                console.log("7777");
            }
            console.log("8888");
          });



          console.log("Getting File data....... ");

          var xhr2 = new XMLHttpRequest();
          console.log("99");
          xhr2.open('GET', 'https://www.googleapis.com/drive/v3/files/'+fileID+'?alt=media');
          console.log("101010");
          xhr2.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          console.log("1111");
          xhr2.responseType = 'text';
          console.log("1212");
          
          xhr2.onload = () => {
              console.log("1313");
              console.log("Getting file data from passwordwala:"+xhr2.response); 
              this.dataFromDrive = xhr2.response;
              demo = xhr2.response;
              console.log("dataFromDrive variable in onload method: "+this.dataFromDrive);
              console.log("type of returned thing:"+ typeof this.dataFromDrive);
              
              console.log("demo in onload method:"+ demo);
              // Code to Extract data from the String got from Drive.....
                var password="";
                var applicationname = "";
                var username = "";
              var lines = demo.split('\n');
              for(var i = 1;i < lines.length;i++){
                //code here using lines[i] which will give you each line
                var words = lines[i].split(',');
                for(var j = 0;j < words.length;j++){
                    if(j==0){
                        applicationname = words[j];
                        console.log("Application name::"+applicationname);
                        
                    }
                    else if(j==1){
                        username = words[j];
                        console.log("User name::"+username);
                    }
                    else if(j==2){
                        password = words[j];      
                        console.log("Password here::::" +password);               
                    }

                }
                
            }
          }
          console.log("1414");
          xhr2.send();
          console.log("onload ni bahar...dataFromDrive"+ this.dataFromDrive);
          console.log("demo outside:"+ demo);
          
        
    };
    console.log("1515");
    xhr1.send();
    
    console.log("done downloading .." + xhr1.responseText);
    console.log("dataFromDrive: " + this.dataFromDrive);

    //Get From Dropbox
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';

    xhr.onload = () => {
    
    if (xhr.status === 200) {
    //   var blob = new Blob([xhr.response], {type: ’application/octet-stream’});
    //   FileSaver.saveAs(blob, file.name, true);
      
      console.log("Got file from dropbox");
      console.log("Response ma su aave che:"+xhr.response);
      this.dataFromDropbox = xhr.response;
      
    }
    
    else {
      var errorMessage = xhr.response || 'Unable to download file';
      // Upload failed. Do something here with the error.
      console.log("Error getting from dropbox:"+errorMessage);
      
    }
  };
  
  xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
  xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken_db);
  xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
    path: '/passwordwala.csv'
  }));
  xhr.send();

  }

  submitData(applicationname, username, password){

    // console.log(applicationname);
    // console.log(username);
    // console.log(password);
    var passwordHex = secrets.str2hex(password); 
    var shares = secrets.share(passwordHex,2,2);
    var password1 = shares[0];
    var password2 = shares[1];
    console.log("Share Number 1:"+shares[0]);
    console.log("Share Number 2:" + shares[1]);

    var comb = secrets.combine( shares.slice(0,2) );
    comb = secrets.hex2str(comb);
    console.log("Combine thaine::"+comb);
    
    
    
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
    var fileContent = csvData; // As a sample, upload a text file.
    var file = new Blob([fileContent], {type: 'text/csv'});
    var oldData:String ="";
    var metadata = {
      'name': 'passwordwala.csv', // Filename at Google Drive
      'mimeType': 'text/csv', // mimeType at Google Drive
      //'parents': ['### folder ID ###'], // Folder ID at Google Drive
    } ;
    
    var accessToken = this.token ;
    var accessToken_db = this.token_db;
     // Here gapi is used for retrieving the access token.
    console.log("accesstoken google after click:"+accessToken);
    console.log("dropbox access token after click:"+accessToken_db);
    
    

    // //first getting the file from google drive if exists any...
    // console.log("before the get request...");
    // var fileID;
    // var oldData:String;
    // var xhr1 = new XMLHttpRequest();

    // xhr1.open('GET', 'https://www.googleapis.com/drive/v3/files/');
    // xhr1.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    // xhr1.responseType = 'text';
    // xhr1.onload = () => {
        
    //     console.log("Inside file data:"+xhr1.responseText); // Retrieve uploaded file ID.
    //     var exctractedJSON = JSON.parse(xhr1.responseText);
    //     var group = xhr1.responseText;
    //     console.log("Posts :: " + exctractedJSON.files[0]);
    //     var keys = Object.keys(exctractedJSON);
    //     keys.forEach(function(key) {
    //         if(key == 'files')
    //         {
    //             console.log("person is files :: " + exctractedJSON[key] );
    //             var items = Object.keys(exctractedJSON[key]);
               
    //             items.forEach(function(item) {
    //                 console.log("2" + item);
    //               var value = exctractedJSON[key][item];
    //               console.log("3" + value);
    //               console.log("Final " + key+': '+item+' = '+value);
    //               console.log("4" + value.name);
    //               if(value.name == "passwordwala.csv")
    //               {
                    
    //                   fileID = value.id;
    //                   console.log("Passwordwala FileID :: " + fileID);
    //               }
                
    //             });
               
    //         }
            
    //       });

    //       console.log("Getting File data....... ");

    //       var xhr2 = new XMLHttpRequest();
    
    //       xhr2.open('GET', 'https://www.googleapis.com/drive/v3/files/'+fileID+'?alt=media');
    //       xhr2.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    //       xhr2.responseType = 'text';
    //       xhr2.onload = () => {
    //           console.log("Getting file data from passwordwala:"+xhr2.response); 
    //           oldData = xhr2.response;
    //       }
    //       xhr2.send();
    //       console.log("onload ni bahar...");
    // };
    // console.log("1515");
    // xhr1.send();

    
    // console.log("done downloading .." + xhr1.responseText);
   
    // Upload to Google Drive....
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', file);
    
    
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = 'text';
    xhr.onload = () => {
        console.log("Inside onload of Post :: ");
        console.log("Inside id:"+xhr.response.id); // Retrieve uploaded file ID.
    };
    
    console.log("uploaded File Id :: " + xhr.response.id);
    xhr.send(form);
    console.log("done drive uploading.."+ xhr.response.id);

    
   
    
    //Upload to Dropbox...
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            var fileInfo = JSON.parse(xhr.response);
            console.log("Upload sucees DropBox:"+fileInfo);
            
            
            // Upload succeeded. Do something here with the file info.
        }
        else {
            var errorMessage = xhr.response || 'Unable to upload file';
            // Upload failed. Do something here with the error.
            console.log("Dropbox upload error:" +errorMessage);
            
        }
    };
    
    xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken_db);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
        path: '/' +  'passwordwala.csv',
        mode: 'add',
        autorename: true,
        mute: false
    }));
    xhr.send(file);

  


  
  
  
  
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


  

}
