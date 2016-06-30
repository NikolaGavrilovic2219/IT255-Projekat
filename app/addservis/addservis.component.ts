import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'AddServis', 
  templateUrl: 'app/addservis/servis.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class AddServisComponent { 

  addServis: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  select: Int = 1;
  delovi: Object[];
  
  constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.addServis = builder.group({
     opis: ["", Validators.none],
     vrsta: ["", Validators.none],
	 deo_id: [this.select, Validators.none],
   });
    var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
   	http.get('http://localhost/php/getdelovi.php',{headers:headers})
		.map(res => res.json()).share()
		.subscribe(delovi => {
			this.delovi = delovi.delovi; 
		},
		err => {
			 this.router.parent.navigate(['./MainPage']);
		}
	);
  }
   
  onAddServis(): void {
	var data = "vrsta="+this.addServis.value.vrsta+"&opis="+this.addServis.value.opis + "&deo_id=" + this.select;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('token', localStorage.getItem('token'));
	this.http.post('http://localhost/php/addservisservice.php',data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => {
		var obj = JSON.parse(err._body);
		document.getElementsByClassName("alert")[0].style.display = "block";
		document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
	},
	() => { 
	    this.router.parent.navigate(['./AllServisi']);
	 }
	);
  }
}
