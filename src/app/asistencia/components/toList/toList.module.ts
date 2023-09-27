import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToRegisterRoutingModule } from './toList-routing.module';
import { ListDocenteModule } from './docente/listDocente.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToRegisterRoutingModule,
        ListDocenteModule
    ]
})
export class ToListModule { }
