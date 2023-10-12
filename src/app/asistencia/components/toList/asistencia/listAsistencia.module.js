"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAsistenciaModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var listAsistencia_routing_module_1 = require("./listAsistencia-routing.module");
var listAsistencia_component_1 = require("./listAsistencia.component");
var table_1 = require("primeng/table");
var button_1 = require("primeng/button");
var inputtext_1 = require("primeng/inputtext");
var togglebutton_1 = require("primeng/togglebutton");
var ripple_1 = require("primeng/ripple");
var multiselect_1 = require("primeng/multiselect");
var dropdown_1 = require("primeng/dropdown");
var progressbar_1 = require("primeng/progressbar");
var toast_1 = require("primeng/toast");
var slider_1 = require("primeng/slider");
var rating_1 = require("primeng/rating");
var forms_1 = require("@angular/forms");
var calendar_1 = require("primeng/calendar");
var core_2 = require("@ngx-translate/core");
var ListAsistenciaModule = /** @class */ (function () {
    function ListAsistenciaModule() {
    }
    ListAsistenciaModule = __decorate([
        (0, core_1.NgModule)({
            imports: [
                common_1.CommonModule,
                listAsistencia_routing_module_1.ListAsistenciaRoutingModule,
                forms_1.FormsModule,
                table_1.TableModule,
                rating_1.RatingModule,
                button_1.ButtonModule,
                slider_1.SliderModule,
                inputtext_1.InputTextModule,
                togglebutton_1.ToggleButtonModule,
                ripple_1.RippleModule,
                multiselect_1.MultiSelectModule,
                dropdown_1.DropdownModule,
                progressbar_1.ProgressBarModule,
                toast_1.ToastModule,
                calendar_1.CalendarModule,
                core_2.TranslateModule
            ],
            declarations: [listAsistencia_component_1.ListAsistenciaComponent]
        })
    ], ListAsistenciaModule);
    return ListAsistenciaModule;
}());
exports.ListAsistenciaModule = ListAsistenciaModule;
