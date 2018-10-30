import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MainSectionProfilepageComponent } from './main-section-profilepage/main-section-profilepage.component';


const routes: Routes = [

  {path:"", component:HomeComponent },
  // {path:"homepage", component:HomeComponent},
  {path: "profilepage", component:ProfileComponent},
  { path: 'main-section-profilepage', component: MainSectionProfilepageComponent, outlet: 'main-section-profilepage'},
  {path: 'main-section-profilepage', component:MainSectionProfilepageComponent},
  {path:"profilepage/mainsection",component:MainSectionProfilepageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
