import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './asistencia/components/notfound/notfound.component';
import { ProductService } from './asistencia/service/product.service';
import { CountryService } from './asistencia/service/country.service';
import { CustomerService } from './asistencia/service/customer.service';
import { EventService } from './asistencia/service/event.service';
import { IconService } from './asistencia/service/icon.service';
import { NodeService } from './asistencia/service/node.service';
import { PhotoService } from './asistencia/service/photo.service';
import { DocenteService } from './asistencia/service/docente.service';
import { AuthService } from './asistencia/components/auth/service/auth.service';
import { authInterceptorProvider } from './asistencia/components/interceptors/AuthInterceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppLayoutModule,
        AppRoutingModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, DocenteService, AuthService, authInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
