import {Component} from 'angular2/core';
import {RouteConfig,Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { MainPageComponent } from 'app/mainpage/mainpage.component';
import { RegisterComponent } from 'app/register/register.component';
import { AddDeoComponent } from 'app/adddeo/adddeo.component';
import { AddServisComponent } from 'app/addservis/addservis.component';
import { LoginComponent}  from 'app/login/login.component';
import { AllDeloviComponent}  from 'app/alldelovi/alldelovi.component';
import { AllServisiComponent}  from 'app/allservisi/allservisi.component';
import {Pipe} from 'angular2/core';

@Component({
    selector: 'moja-aplikacija',
	templateUrl: 'app/router.html',
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path:'/',    name: 'MainPage',   component: MainPageComponent, useAsDefault: true},
  {path:'/register', name:'RegisterPage', component: RegisterComponent},
  {path:'/login', name:'LoginPage', component: LoginComponent},
  {path:'/adddeo', name:'AddDeo', component: AddDeoComponent},
  {path:'/addservis', name:'AddServis', component: AddServisComponent},
  {path:'/alldelovi', name:'AllDelovi', component: AllDeloviComponent},
  {path:'/allservisi', name:'AllServisi', component: AllServisiComponent}
])

export class AppComponent { 
	router: Router;
	isAuth: String;
	
	constructor(router: Router) {
		this.router = router;
		  router.subscribe((val) => {
		  
		  if(localStorage.getItem('token') !== null){
				this.isAuth = "yes";
		  }else{
			    this.isAuth = "no";
		  }
		  });
	}
	
 onLogout(): void {
	localStorage.removeItem("token");
	 this.router.navigate(['./MainPage']);
	if(localStorage.getItem('token') !== null){
		this.isAuth = "yes";
	}else{
		this.isAuth = "no";
	}
 }
}
