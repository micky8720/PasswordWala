import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MiddleComponent } from './middle/middle.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "angular-6-social-login";
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainSectionProfilepageComponent } from './main-section-profilepage/main-section-profilepage.component';




export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1059775354418-4gca3e3gfct19m9g8nd0j4n6niladib6.apps.googleusercontent.com")
        },
          
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MiddleComponent,
    ProfileComponent,
    HomeComponent,
    SidebarComponent,
    MainSectionProfilepageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    RouterModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
