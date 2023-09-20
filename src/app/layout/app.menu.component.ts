import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Tablas',
                items: [
                    { label: 'Docente', icon: 'pi pi-fw pi-users', routerLink: ['/listar/docente'] },
                    { label: 'Supervisor', icon: 'pi pi-fw pi-users', routerLink: ['/listar/supervisor'] },
                    { label: 'Materias Asignadas', icon: 'pi pi-fw pi-calendar', routerLink: ['/listar/asignarMateria'] },
                    { label: 'Materia', icon: 'pi pi-fw pi-book', routerLink: ['/listar/materia'] },
                    { label: 'Asistencia', icon: 'pi pi-fw pi-check-square', routerLink: ['/listar/asistencia'] },
                    { label: 'Licencia', icon: 'pi pi-fw pi-id-card', routerLink: ['/listar/licencia'] },
                ]
            },
            {
                label: 'Formularios',
                items: [
                    { label: 'Docente', icon: 'pi pi-fw pi-users', routerLink: ['/registrar/docente'] },
                    { label: 'Supervisor', icon: 'pi pi-fw pi-users', routerLink: ['/registrar/supervisor'] },
                    { label: 'Asignar Materia', icon: 'pi pi-fw pi-calendar', routerLink: ['/registrar/asignarMateria'] },
                    { label: 'Licencia', icon: 'pi pi-fw pi-id-card', routerLink: ['/registrar/licencia'] },
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
