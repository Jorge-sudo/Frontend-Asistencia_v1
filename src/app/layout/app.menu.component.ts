import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,
                private translate: TranslateService) { }

    ngOnInit() {
      this.initModel();
      this.translate.onLangChange.subscribe((event) => {
        this.initModel();
      });
    }

    initModel(): void{
      this.model = [
        {
            label: this.translate.instant('asistencia.menu.initiation'),
            items: [
                { label: this.translate.instant('asistencia.menu.dashboard'), icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            ]
        },
        {
            label: this.translate.instant('asistencia.menu.table'),
            items: [
                { label: this.translate.instant('asistencia.menu.docente'), icon: 'pi pi-fw pi-users', routerLink: ['/listar/docente'] },
                { label: this.translate.instant('asistencia.menu.supervisor'), icon: 'pi pi-fw pi-users', routerLink: ['/listar/supervisor'] },
                { label: this.translate.instant('asistencia.menu.asignatura'), icon: 'pi pi-fw pi-calendar', routerLink: ['/listar/asignatura'] },
                { label: this.translate.instant('asistencia.menu.materia'), icon: 'pi pi-fw pi-book', routerLink: ['/listar/materia'] },
                { label: this.translate.instant('asistencia.menu.asistencia'), icon: 'pi pi-fw pi-check-square', routerLink: ['/listar/asistencia'] },
                { label: this.translate.instant('asistencia.menu.licencia'), icon: 'pi pi-fw pi-id-card', routerLink: ['/listar/licencia'] },
            ]
        },
        {
            label: this.translate.instant('asistencia.menu.form'),
            items: [
                { label: this.translate.instant('asistencia.menu.docente'), icon: 'pi pi-fw pi-users', routerLink: ['/registrar/docente'] },
                { label: this.translate.instant('asistencia.menu.supervisor'), icon: 'pi pi-fw pi-users', routerLink: ['/registrar/supervisor'] },
                { label: this.translate.instant('asistencia.menu.asignatura'), icon: 'pi pi-fw pi-calendar', routerLink: ['/registrar/asignarMateria'] },
                { label: this.translate.instant('asistencia.menu.licencia'), icon: 'pi pi-fw pi-id-card', routerLink: ['/registrar/licencia'] },
            ]
        },
        {
            label: 'Graficos',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    routerLink: ['/landing']
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/auth/login']
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: ['/auth/error']
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/auth/access']
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/pages/crud']
                },
                {
                    label: 'Timeline',
                    icon: 'pi pi-fw pi-calendar',
                    routerLink: ['/pages/timeline']
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    routerLink: ['/notfound']
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: ['/pages/empty']
                },
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                },
                {
                    label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                }
            ]
        }
    ];
    }
}
