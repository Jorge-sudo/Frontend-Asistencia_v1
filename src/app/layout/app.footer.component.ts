import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    providers: [ConfirmationService]
})
export class AppFooterComponent {

  constructor(public layoutService: LayoutService,
              public translate: TranslateService) {
  }

  en() {
    this.translate.use('en');
  }

  es() {
    this.translate.use('es');
  }
}
