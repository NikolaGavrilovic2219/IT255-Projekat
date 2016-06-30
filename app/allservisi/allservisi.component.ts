import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'AllServisi', 
  templateUrl: 'app/allservisi/allservisi.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class AllServisiComponent { 

  loginForm: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  
   	servisi: Object[];
	
	constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
	http.get('http://localhost/php/getservis.php',{headers:headers})
		.map(res => res.json()).share()
		.subscribe(servisi => {
			this.servisi = servisi.servisi; 
			setInterval(function(){
				$('table').DataTable();
			},200);
		},
		err => {
			 this.router.parent.navigate(['./MainPage']);
		}
	);
  }
  
  public removeServis(item: Number) {
      console.log("Remove: ", item);
	  var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('token', localStorage.getItem('token'));
	  this.http.get('http://localhost/php/deleteservis.php?id='+item,{headers:headers})  .subscribe( data => this.postResponse = data);
	 location.reload();
   }
}
