import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAsistenciaRoutingModule } from './listAsistencia-routing.module';
import { ListAsistenciaComponent } from './listAsistencia.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        ListAsistenciaRoutingModule,
        FormsModule,
    		TableModule,
    		RatingModule,
    		ButtonModule,
    		SliderModule,
    		InputTextModule,
    		ToggleButtonModule,
    		RippleModule,
    		MultiSelectModule,
    		DropdownModule,
    		ProgressBarModule,
    		ToastModule,
        CalendarModule,
        TranslateModule
    ],
    declarations: [ListAsistenciaComponent]
})
export class ListAsistenciaModule { }
