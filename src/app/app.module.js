"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.MQTT_SERVICE_OPTIONS = exports.HttpLoaderFactory = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var app_layout_module_1 = require("./layout/app.layout.module");
var notfound_component_1 = require("./asistencia/components/notfound/notfound.component");
var docente_service_1 = require("./asistencia/service/docente.service");
var auth_service_1 = require("./asistencia/components/auth/service/auth.service");
var AuthInterceptor_1 = require("./asistencia/components/interceptors/AuthInterceptor");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var http_1 = require("@angular/common/http");
var ngx_mqtt_1 = require("ngx-mqtt");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var button_1 = require("primeng/button");
var environment_1 = require("../environments/environment");
// AoT requires an exported function for factories
function HttpLoaderFactory(httpClient) {
    return new http_loader_1.TranslateHttpLoader(httpClient);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
exports.MQTT_SERVICE_OPTIONS = {
    hostname: environment_1.environment.mqttServiceOptions.hostname,
    port: environment_1.environment.mqttServiceOptions.port,
    protocol: 'ws',
    path: environment_1.environment.mqttServiceOptions.path,
    username: environment_1.environment.mqttServiceOptions.username,
    password: environment_1.environment.mqttServiceOptions.password,
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                notfound_component_1.NotfoundComponent
            ],
            imports: [
                button_1.ButtonModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_1.HttpClient]
                    }
                }),
                app_layout_module_1.AppLayoutModule,
                app_routing_module_1.AppRoutingModule,
                ngx_mqtt_1.MqttModule.forRoot(exports.MQTT_SERVICE_OPTIONS)
            ],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                docente_service_1.DocenteService,
                auth_service_1.AuthService,
                AuthInterceptor_1.authInterceptorProvider,
                ngx_cookie_service_1.CookieService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
