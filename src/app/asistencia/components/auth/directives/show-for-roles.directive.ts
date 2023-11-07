import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { distinctUntilChanged, map, Observable, Subscription, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[akoShowForRole]',
})
export class ShowForRolesDirective implements OnInit, OnDestroy {
  @Input('akoShowForRole') allowedRole?: string;
  private sub?: Subscription;

  constructor(private authService: AuthService,
              private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>) {}

  ngOnInit(): void {
    this.sub = this.authService.user$
      .pipe(
        map((user) => Boolean(user && this.allowedRole === user.role)),
        distinctUntilChanged(),
        tap((hasRole) => {
          console.log('hasRole', hasRole);
          hasRole
            ? this.viewContainerRef.createEmbeddedView(this.templateRef)
            : this.viewContainerRef.clear()
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
