import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'AddDeo', 
  templateUrl: 'app/adddeo/deo.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class AddDeoComponent { 

  addDeo: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  
  constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.addDeo = builder.group({
     naziv: ["", Validators.none],
     proizvodjac: ["", Validators.none]
   });
  }
  
  onAddDeo(): void {
	var data = "naziv="+this.addDeo.value.naziv+"&proizvodjac="+this.addDeo.value.proizvodjac;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
	this.http.post('http://localhost/php/adddeoservice.php',data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => {
		var obj = JSON.parse(err._body);
		document.getElementsByClassName("alert")[0].style.display = "block";
		document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
	},
	() => { 
	    this.router.parent.navigate(['./AllDelovi']);
	 }
	);
  }
}
