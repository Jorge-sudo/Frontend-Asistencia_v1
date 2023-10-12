import { Component, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
    providers: [ConfirmationService]
})
export class AppFooterComponent implements OnInit{

  constructor(public layoutService: LayoutService,
              public translate: TranslateService,
              private config: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe((event) => {
      const newLang = event.lang;
      // hacer algo con el nuevo idioma
      this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
    });
  }

  en() {
    this.translate.use('en');
  }

  es() {
    this.translate.use('es');
  }
}
