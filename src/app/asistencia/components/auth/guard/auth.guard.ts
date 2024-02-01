import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate: CanActivateFn = (
    ruta: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    // Verifica si el usuario tiene un token válido
    if(!this.authService.isValidUser()) {
      // Si el token no es válido, redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/auth/acceso']).then();
      // Retorna false para evitar que el usuario acceda a la ruta protegida
      return false;
    }
    // Si el token es válido, permite que el usuario acceda a la ruta protegida
    return true;
  }

  canActivateChild: CanActivateChildFn = (
    rutaHija: ActivatedRouteSnapshot,
    estado: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    // Verifica si el usuario tiene un token válido
    if(!this.authService.isValidUser()) {
      // Si el token no es válido, redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/auth/acceso']).then();
      // Retorna false para evitar que el usuario acceda a la ruta protegida
      return false;
    }
    // Si el token es válido, permite que el usuario acceda a la ruta protegida
    return true;
  }

}
