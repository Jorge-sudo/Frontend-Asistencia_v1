"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAsistenciaComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var rxjs_1 = require("rxjs");
var ListAsistenciaComponent = /** @class */ (function () {
    function ListAsistenciaComponent(asistenciaService, messageService, translate) {
        this.asistenciaService = asistenciaService;
        this.messageService = messageService;
        this.translate = translate;
        this.loading = true;
        this.asistencias = [];
        this.rows = 10;
        this.numberOfElements = 0;
        this.totalRecords = 0;
        this.totalPages = 0;
        this.order = 1;
        this.sortField = 'horaEntrada';
        this.globalFilter = '';
        this.first = 0;
        this.page = 0;
        this.asistenciaSelected = {};
        this.idFrozen = false;
    }
    ListAsistenciaComponent.prototype.loadInit = function (date) {
        var _this = this;
        this.asistenciaService.getAsistenciasFindAllByDate(this.order, this.page, this.rows, this.sortField, date).pipe((0, rxjs_1.tap)(function (result) {
            _this.asistencias = result.data.content;
            _this.numberOfElements = result.data.numberOfElements;
            _this.totalRecords = result.data.totalElements;
            _this.totalPages = result.data.totalPages;
            _this.loading = !result.view;
        })).subscribe();
    };
    ListAsistenciaComponent.prototype.ngOnInit = function () {
        this.loadInit(this.getDateToday());
    };
    ListAsistenciaComponent.prototype.loadData = function (event) {
        var _this = this;
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'horaEntrada' : event.sortField;
        var date = this.dateSearch == undefined || this.dateSearch == null
            ? this.getDateToday()
            : this.getDateSearchFormat(this.dateSearch);
        if (this.globalFilter === '' || this.globalFilter === undefined) {
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            // llamar el servicio pasando page y rows
            this.asistenciaService.getAsistenciasFindAllByDate(this.order, this.page, this.rows, this.sortField, date).pipe((0, rxjs_1.tap)(function (result) {
                _this.asistencias = result.data.content;
                _this.numberOfElements = result.data.numberOfElements;
                _this.totalRecords = result.data.totalElements;
                _this.totalPages = result.data.totalPages;
                _this.loading = !result.view;
            }), (0, rxjs_1.catchError)(function (error) {
                _this.messageService.add({ severity: 'error',
                    summary: _this.translate.instant('asistencia.message.errorTitle'),
                    detail: _this.translate.instant('asistencia.message.errorDataMesage') });
                throw error;
            })).subscribe();
        }
        else {
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            this.loadDataGlobalFilter().subscribe();
        }
    };
    ListAsistenciaComponent.prototype.onGlobalFilter = function (table, event) {
        table.filterGlobal(event.target.value, 'contains');
        this.globalFilter = event.target.value;
        this.loadDataGlobalFilter().subscribe();
    };
    ListAsistenciaComponent.prototype.loadDataGlobalFilter = function () {
        var _this = this;
        return this.asistenciaService.getAsistenciasFilter(this.order, this.page, this.rows, this.sortField, this.globalFilter).pipe((0, rxjs_1.tap)(function (result) {
            _this.asistencias = result.data.content;
            _this.numberOfElements = result.data.numberOfElements;
            _this.totalRecords = result.data.totalElements;
            _this.totalPages = result.data.totalPages;
            _this.loading = !result.view;
        }), (0, rxjs_1.catchError)(function (error) {
            _this.messageService.add({ severity: 'error',
                summary: _this.translate.instant('asistencia.message.errorTitle'),
                detail: _this.translate.instant('asistencia.message.errorDataMesage') });
            throw error;
        }));
    };
    ListAsistenciaComponent.prototype.onSelect = function (event) {
        console.log('focus ' + this.dateSearch);
        this.loadInit(this.getDateSearchFormat(this.dateSearch));
        console.log(event);
    };
    ListAsistenciaComponent.prototype.getDateToday = function () {
        var fecha = new Date(); // Obtener la fecha actual
        var año = fecha.getFullYear(); // Obtener el año (ejemplo: 2023)
        var mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtener el mes (ejemplo: 10) y asegurarse de que tenga dos dígitos
        var dia = String(fecha.getDate()).padStart(2, '0'); // Obtener el día (ejemplo: 04) y asegurarse de que tenga dos dígitos
        return "".concat(año, "-").concat(mes, "-").concat(dia);
    };
    ListAsistenciaComponent.prototype.getDateSearchFormat = function (dateSearch) {
        var año = dateSearch.getFullYear(); // Obtener el año (ejemplo: 2023)
        var mes = String(dateSearch.getMonth() + 1).padStart(2, '0'); // Obtener el mes (ejemplo: 10) y asegurarse de que tenga dos dígitos
        var dia = String(dateSearch.getDate()).padStart(2, '0'); // Obtener el día (ejemplo: 04) y asegurarse de que tenga dos dígitos
        return "".concat(año, "-").concat(mes, "-").concat(dia);
    };
    ListAsistenciaComponent.prototype.clear = function (table) {
        this.globalFilter = '';
        this.sortField = 'horaEntrada';
        this.order = 1;
        this.page = 0;
        this.rows = 10;
        this.first = 0;
        this.filter.nativeElement.value = '';
        table.clear();
    };
    __decorate([
        (0, core_1.ViewChild)('filter')
    ], ListAsistenciaComponent.prototype, "filter", void 0);
    ListAsistenciaComponent = __decorate([
        (0, core_1.Component)({
            templateUrl: './listAsistencia.component.html',
            providers: [api_1.MessageService]
        })
    ], ListAsistenciaComponent);
    return ListAsistenciaComponent;
}());
exports.ListAsistenciaComponent = ListAsistenciaComponent;
