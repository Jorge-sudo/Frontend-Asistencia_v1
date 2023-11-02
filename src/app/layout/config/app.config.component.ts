import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { MenuService } from '../app.menu.service';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Generic } from 'src/app/util/generic';

@Component({
  selector: 'app-config',
  templateUrl: './app.config.component.html',
})
export class AppConfigComponent implements OnInit {

  defectTheme: string = 'lara-light-blue';
  defectColorScheme: string = 'light';

  @Input() minimal: boolean = false;

  scales: number[] = [12, 13, 14, 15, 16];

  constructor(
    public layoutService: LayoutService,
    public menuService: MenuService,
    public translate: TranslateService,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.onLangChange.subscribe((event) => {
      const newLang = event.lang;
      // hacer algo con el nuevo idioma
      this.translate
        .get('primeng')
        .subscribe((res) => this.config.setTranslation(res));
    });
    //this.themeLocalStorage();
  }

  themeLocalStorage(): void {
    console.log(Generic.localStorageGetItem('theme'));
    console.log(Generic.localStorageGetItem('colorScheme'));
    if(Generic.localStorageGetItem('theme') === null){
      Generic.localStorageSetItem('theme', this.defectTheme);
      this.layoutService.config.theme = this.defectTheme;
    } else{
      this.layoutService.config.theme = Generic.localStorageGetItem('theme');
      console.log(this.layoutService.config.theme)
    }

    if(Generic.localStorageGetItem('colorScheme') === null){
      Generic.localStorageSetItem('colorScheme', this.defectColorScheme);
      this.layoutService.config.colorScheme = this.defectColorScheme;
    }else{
      this.layoutService.config.colorScheme = Generic.localStorageGetItem('colorScheme');
    }
    this.layoutService.onConfigUpdate();
  }


  en() {
    this.translate.use('en');
  }

  es() {
    this.translate.use('es');
  }

  get visible(): boolean {
    return this.layoutService.state.configSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.configSidebarVisible = _val;
  }

  get scale(): number {
    return this.layoutService.config.scale;
  }

  set scale(_val: number) {
    this.layoutService.config.scale = _val;
  }

  get menuMode(): string {
    return this.layoutService.config.menuMode;
  }

  set menuMode(_val: string) {
    this.layoutService.config.menuMode = _val;
  }

  get inputStyle(): string {
    return this.layoutService.config.inputStyle;
  }

  set inputStyle(_val: string) {
    this.layoutService.config.inputStyle = _val;
  }

  get ripple(): boolean {
    return this.layoutService.config.ripple;
  }

  set ripple(_val: boolean) {
    this.layoutService.config.ripple = _val;
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  changeTheme(theme: string, colorScheme: string) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink
      .getAttribute('href')!
      .replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme;
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  applyScale() {
    document.documentElement.style.fontSize = this.scale + 'px';
  }
}
