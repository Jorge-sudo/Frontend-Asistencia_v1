import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HasRoleGuard } from '../auth/guard/has-role.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'to_list',
        loadChildren: () =>
          import('./toList/toList.module').then((m) => m.ToListModule),
      },
      {
        path: 'to_register',
        canActivate: [HasRoleGuard],
        loadChildren: () =>
          import('./toRegister/toRegister.module').then(
            (m) => m.ToRegisterModule
          ),
      },
      { path: '**', redirectTo: '/notfound' },
    ]),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
