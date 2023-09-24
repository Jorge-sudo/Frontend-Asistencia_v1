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
                        loadChildren: () => import('./asistencia/components/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'uikit',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/uikit/uikit.module').then(m => m.UIkitModule)
                    },
                    {
                        path: 'utilities',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/utilities/utilities.module').then(m => m.UtilitiesModule)
                    },
                    {
                        path: 'documentation',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/documentation/documentation.module').then(m => m.DocumentationModule)
                    },
                    {
                        path: 'blocks',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)
                    },
                    {
                        path: 'pages',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/pages/pages.module').then(m => m.PagesModule)
                    },

                    {
                        path: 'listar',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/toList/toList.module').then(m => m.ToListModule)
                    },
                    {
                        path: 'registrar',
                        canActivate: [AuthGuard],
                        loadChildren: () => import('./asistencia/components/toRegister/toRegister.module').then(m => m.ToRegisterModule)
                    },
                ]
            },
            {
                path: 'auth',
                loadChildren: () => import('./asistencia/components/auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'landing',
                loadChildren: () => import('./asistencia/components/landing/landing.module').then(m => m.LandingModule)
            },
            {
                path: 'notfound',
                component: NotfoundComponent
            },
            {
                path: '**',
                redirectTo: '/notfound'
            },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
