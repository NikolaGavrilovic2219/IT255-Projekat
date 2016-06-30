System.register(['angular2/core', 'angular2/common', 'angular2/http', 'rxjs/Rx', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, router_1;
    var AddServisComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AddServisComponent = (function () {
                function AddServisComponent(builder, http, router) {
                    var _this = this;
                    this.select = 1;
                    this.http = http;
                    this.router = router;
                    this.addServis = builder.group({
                        opis: ["", common_1.Validators.none],
                        vrsta: ["", common_1.Validators.none],
                        deo_id: [this.select, common_1.Validators.none],
                    });
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    headers.append('token', localStorage.getItem('token'));
                    http.get('http://localhost/php/getdelovi.php', { headers: headers })
                        .map(function (res) { return res.json(); }).share()
                        .subscribe(function (delovi) {
                        _this.delovi = delovi.delovi;
                    }, function (err) {
                        _this.router.parent.navigate(['./MainPage']);
                    });
                }
                AddServisComponent.prototype.onAddServis = function () {
                    var _this = this;
                    var data = "vrsta=" + this.addServis.value.vrsta + "&opis=" + this.addServis.value.opis + "&deo_id=" + this.select;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    headers.append('token', localStorage.getItem('token'));
                    this.http.post('http://localhost/php/addservisservice.php', data, { headers: headers })
                        .map(function (res) { return res; })
                        .subscribe(function (data) { return _this.postResponse = data; }, function (err) {
                        var obj = JSON.parse(err._body);
                        document.getElementsByClassName("alert")[0].style.display = "block";
                        document.getElementsByClassName("alert")[0].innerHTML = obj.error.split("\\r\\n").join("<br/>").split("\"").join("");
                    }, function () {
                        _this.router.parent.navigate(['./AllServisi']);
                    });
                };
                AddServisComponent = __decorate([
                    core_1.Component({
                        selector: 'AddServis',
                        templateUrl: 'app/addservis/servis.html',
                        directives: [common_1.FORM_DIRECTIVES],
                        viewBindings: [common_1.FORM_BINDINGS]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, router_1.Router])
                ], AddServisComponent);
                return AddServisComponent;
            }());
            exports_1("AddServisComponent", AddServisComponent);
        }
    }
});
//# sourceMappingURL=addservis.component.js.map