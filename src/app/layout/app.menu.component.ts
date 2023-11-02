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
                { label: this.translate.instant('asistencia.menu.docente'), icon: 'pi pi-fw pi-users', routerLink: ['paginas/listar/docente'] },
                { label: this.translate.instant('asistencia.menu.supervisor'), icon: 'pi pi-fw pi-users', routerLink: ['paginas/listar/supervisor'] },
                { label: this.translate.instant('asistencia.menu.asignatura'), icon: 'pi pi-fw pi-calendar', routerLink: ['paginas/listar/asignatura'] },
                { label: this.translate.instant('asistencia.menu.materia'), icon: 'pi pi-fw pi-book', routerLink: ['paginas/listar/materia'] },
                { label: this.translate.instant('asistencia.menu.asistencia'), icon: 'pi pi-fw pi-check-square', routerLink: ['paginas/listar/asistencia'] },
                { label: this.translate.instant('asistencia.menu.licencia'), icon: 'pi pi-fw pi-id-card', routerLink: ['paginas/listar/licencia'] },
            ]
        },
        {
            label: this.translate.instant('asistencia.menu.form'),
            items: [
                { label: this.translate.instant('asistencia.menu.docente'), icon: 'pi pi-fw pi-users', routerLink: ['paginas/registrar/docente'] },
                { label: this.translate.instant('asistencia.menu.supervisor'), icon: 'pi pi-fw pi-users', routerLink: ['paginas/registrar/supervisor'] },
                { label: this.translate.instant('asistencia.menu.asignatura'), icon: 'pi pi-fw pi-calendar', routerLink: ['paginas/registrar/asignar_materia'] },
                { label: this.translate.instant('asistencia.menu.materia'), icon: 'pi pi-fw pi-book', routerLink: ['paginas/registrar/materia'] },
                { label: this.translate.instant('asistencia.menu.asistencia'), icon: 'pi pi-fw pi-check-square', routerLink: ['paginas/registrar/asistencia'] },
                { label: this.translate.instant('asistencia.menu.licencia'), icon: 'pi pi-fw pi-id-card', routerLink: ['paginas/registrar/licencia'] },
                { label: this.translate.instant('asistencia.menu.horario'), icon: 'pi pi-fw pi-calendar-times', routerLink: ['paginas/registrar/horario'] },
                { label: this.translate.instant('asistencia.menu.aula'), icon: 'pi pi-fw pi-building', routerLink: ['paginas/registrar/aula'] },
            ]
        },
        {
            label: 'Graficos',

        }
    ];
    }
}
