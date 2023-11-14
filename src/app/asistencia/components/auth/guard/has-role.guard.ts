import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Inject, Injectable } from '@angular/core';
import { Role } from '../api/Role';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivateChild: CanActivateChildFn = (
    rutaHija: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    // Verifica si el usuario tiene un token válido
    return this.authService.user$.pipe(

      // 1. Mapeamos el observable user$ a true o false
      map((user) => {
        if (user && user.role === 'ADMIN' as Role) {
          return true;
        }
        return false;
      }),

      // 2. Usamos tap para ejecutar un efecto secundario
      tap((isAllowed) => {
        if (!isAllowed) {

          // 3. Redirigimos al usuario si no está permitido
          this.router.navigate(['/autenticación/acceso_denegado']).then();
        }
      })

    );
  }

  canActivate: CanActivateFn = ( ruta: ActivatedRouteSnapshot, estado: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree => {
    return this.authService.user$.pipe(
      map((user) => {
        if (user && user.role === 'ADMIN' as Role) {
          return true;
        }
        return false;
      }),
      tap((isAllowed) => {
        if (!isAllowed) {
          // redirigir al usuario no autorizado
          this.router.navigate(['/autenticación/acceso_denegado']).then();
        }
      })
    );
  };
}
