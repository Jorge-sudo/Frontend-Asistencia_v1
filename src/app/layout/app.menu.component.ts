import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../asistencia/components/auth/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  register: any = {};
  grafic: any = {};

  constructor(
    public layoutService: LayoutService,
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initModel();
    this.translate.onLangChange.subscribe((event) => {
      this.initModel();
    });
  }

  async initModel() {
    this.register = {
      label: this.translate.instant('asistencia.menu.form'),
      items: [
        {
          label: this.translate.instant('asistencia.menu.docente'),
          icon: 'pi pi-fw pi-users',
          routerLink: ['pages/to_register/docente'],
        },
        {
          label: this.translate.instant('asistencia.menu.supervisor'),
          icon: 'pi pi-fw pi-users',
          routerLink: ['pages/to_register/supervisor'],
        },
        {
          label: this.translate.instant('asistencia.menu.asignatura'),
          icon: 'pi pi-fw pi-calendar',
          routerLink: ['pages/to_register/asignar_materia'],
        },
        {
          label: this.translate.instant('asistencia.menu.materia'),
          icon: 'pi pi-fw pi-book',
          routerLink: ['pages/to_register/materia'],
        },
        {
          label: this.translate.instant('asistencia.menu.asistencia'),
          icon: 'pi pi-fw pi-check-square',
          routerLink: ['pages/to_register/asistencia'],
        },
        {
          label: this.translate.instant('asistencia.menu.licencia'),
          icon: 'pi pi-fw pi-id-card',
          routerLink: ['pages/to_register/licencia'],
        },
        {
          label: this.translate.instant('asistencia.menu.horario'),
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: ['pages/to_register/horario'],
        },
        {
          label: this.translate.instant('asistencia.menu.aula'),
          icon: 'pi pi-fw pi-building',
          routerLink: ['pages/to_register/aula'],
        },
      ],
    };

    this.grafic = {
      label: 'Graficos',
    };

    this.model = [
      {
        label: this.translate.instant('asistencia.menu.initiation'),
        items: [
          {
            label: this.translate.instant('asistencia.menu.dashboard'),
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: this.translate.instant('asistencia.menu.table'),
        items: [
          {
            label: this.translate.instant('asistencia.menu.docente'),
            icon: 'pi pi-fw pi-users',
            routerLink: ['pages/to_list/docente'],
          },
          {
            label: this.translate.instant('asistencia.menu.supervisor'),
            icon: 'pi pi-fw pi-users',
            routerLink: ['pages/to_list/supervisor'],
          },
          {
            label: this.translate.instant('asistencia.menu.asignatura'),
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['pages/to_list/asignatura'],
          },
          {
            label: this.translate.instant('asistencia.menu.materia'),
            icon: 'pi pi-fw pi-book',
            routerLink: ['pages/to_list/materia'],
          },
          {
            label: this.translate.instant('asistencia.menu.asistencia'),
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['pages/to_list/asistencia'],
          },
          {
            label: this.translate.instant('asistencia.menu.licencia'),
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['pages/to_list/licencia'],
          },
        ],
      },
    ];
    if (await this.authService.isAdmin()) {
      this.model.push(this.register);
    }
    this.model.push(this.grafic);
  }
}
