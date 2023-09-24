import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers: [
        AuthGuard
    ]
})
export class AuthModule { }
