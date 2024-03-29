import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './asistencia/components/notfound/notfound.component';
import { DocenteService } from './asistencia/service/docente.service';
import { AuthService } from './asistencia/components/auth/service/auth.service';
import { authInterceptorProvider } from './asistencia/components/interceptors/AuthInterceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqttServiceOptions.hostname,
  port: environment.mqttServiceOptions.port,
  protocol: 'ws', // Utiliza 'wss' si tu broker soporta SSL/TLS, de lo contrario utiliza 'ws'
  path: environment.mqttServiceOptions.path,
  username: environment.mqttServiceOptions.username,
  password: environment.mqttServiceOptions.password,
};


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent
    ],
    imports: [
      ButtonModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      }),
      AppLayoutModule,
      AppRoutingModule,
      MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        DocenteService,
        AuthService,
        authInterceptorProvider,
        CookieService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
