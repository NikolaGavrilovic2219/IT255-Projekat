System.register(['angular2/core', 'angular2/router', 'app/mainpage/mainpage.component', 'app/register/register.component', 'app/adddeo/adddeo.component', 'app/addservis/addservis.component', 'app/login/login.component', 'app/alldelovi/alldelovi.component', 'app/allservisi/allservisi.component'], function(exports_1, context_1) {
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
    var core_1, router_1, mainpage_component_1, register_component_1, adddeo_component_1, addservis_component_1, login_component_1, alldelovi_component_1, allservisi_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (mainpage_component_1_1) {
                mainpage_component_1 = mainpage_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (adddeo_component_1_1) {
                adddeo_component_1 = adddeo_component_1_1;
            },
            function (addservis_component_1_1) {
                addservis_component_1 = addservis_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (alldelovi_component_1_1) {
                alldelovi_component_1 = alldelovi_component_1_1;
            },
            function (allservisi_component_1_1) {
                allservisi_component_1 = allservisi_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    var _this = this;
                    this.router = router;
                    router.subscribe(function (val) {
                        if (localStorage.getItem('token') !== null) {
                            _this.isAuth = "yes";
                        }
                        else {
                            _this.isAuth = "no";
                        }
                    });
                }
                AppComponent.prototype.onLogout = function () {
                    localStorage.removeItem("token");
                    this.router.navigate(['./MainPage']);
                    if (localStorage.getItem('token') !== null) {
                        this.isAuth = "yes";
                    }
                    else {
                        this.isAuth = "no";
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'moja-aplikacija',
                        templateUrl: 'app/router.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'MainPage', component: mainpage_component_1.MainPageComponent, useAsDefault: true },
                        { path: '/register', name: 'RegisterPage', component: register_component_1.RegisterComponent },
                        { path: '/login', name: 'LoginPage', component: login_component_1.LoginComponent },
                        { path: '/adddeo', name: 'AddDeo', component: adddeo_component_1.AddDeoComponent },
                        { path: '/addservis', name: 'AddServis', component: addservis_component_1.AddServisComponent },
                        { path: '/alldelovi', name: 'AllDelovi', component: alldelovi_component_1.AllDeloviComponent },
                        { path: '/allservisi', name: 'AllServisi', component: allservisi_component_1.AllServisiComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map