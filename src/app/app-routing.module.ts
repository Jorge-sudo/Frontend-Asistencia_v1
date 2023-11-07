import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './asistencia/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './asistencia/components/auth/guard/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        canActivate: [AuthGuard],
                        redirectTo: 'panel',
                    },
                    {
                        path: 'panel',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'pages',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/pages/pages.module').then(m => m.PagesModule)
                    }
                ]
            },
            {
                path: 'auth',
                loadChildren: () => import('./asistencia/components/auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'not_found',
                component: NotfoundComponent
            },
            {
                path: '**',
                redirectTo: '/not_found'
            },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
