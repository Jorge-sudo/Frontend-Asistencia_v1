import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription, catchError, tap } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from '../../service/dashboard.service';
import { DashboardCard } from '../../api/dashboardCard';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService],
})
export class DashboardComponent implements OnInit {

    dashboard: DashboardCard = {};

    constructor( public layoutService: LayoutService,
                 private dashboardService: DashboardService,
                 private messageService: MessageService) {
    }

    ngOnInit() {
      this.dashboardService.getDashboard().pipe(
        tap((data: any) => {
          this.dashboard = data.data;
        }),
        catchError((error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar el dashboard'
          });
          return error;
        })
      ).subscribe();
    }

}
