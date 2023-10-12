"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLicenciaComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var rxjs_1 = require("rxjs");
var ListLicenciaComponent = /** @class */ (function () {
    function ListLicenciaComponent(docenteLicenciaService, messageService, translate) {
        this.docenteLicenciaService = docenteLicenciaService;
        this.messageService = messageService;
        this.translate = translate;
        this.selectionsData = [
            { name: 'Vigentes' },
            { name: 'Antiguos' }
        ];
        this.dataSelected = { name: 'Vigentes' };
        this.loading = true;
        this.docenteLicencias = [];
        this.rows = 10;
        this.numberOfElements = 0;
        this.totalRecords = 0;
        this.totalPages = 0;
        this.order = 1;
        this.sortField = 'docente.nombre';
        this.globalFilter = '';
        this.first = 0;
        this.page = 0;
        this.docenteLicenciaSelected = {};
        this.idFrozen = false;
    }
    ListLicenciaComponent.prototype.initData = function () {
        if (this.dataSelected.name.localeCompare('Vigentes') === 0) {
            this.loadDocenteLicenciaActive().subscribe();
        }
        if (this.dataSelected.name.localeCompare('Antiguos') === 0) {
            this.loadDocenteLicenciaInactive().subscribe();
        }
    };
    ListLicenciaComponent.prototype.ngOnInit = function () {
        this.initData();
    };
    ListLicenciaComponent.prototype.loadData = function (event) {
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'docente.nombre' : event.sortField;
        if (this.globalFilter === '' || this.globalFilter === undefined) {
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            // llamar el servicio pasando page y rows
            this.initData();
        }
        else {
            // Calculamos la página actual
            this.page = Math.floor(this.first / this.rows);
            this.loadDataGlobalFilter().subscribe();
        }
    };
    ListLicenciaComponent.prototype.onGlobalFilter = function (table, event) {
        table.filterGlobal(event.target.value, 'contains');
        this.globalFilter = event.target.value;
        this.loadDataGlobalFilter().subscribe();
    };
    ListLicenciaComponent.prototype.loadDataGlobalFilter = function () {
        var _this = this;
        return this.docenteLicenciaService.getDocenteLicenciasFilterGlobal(this.order, this.page, this.rows, this.sortField, this.globalFilter).pipe((0, rxjs_1.map)(function (result) {
            _this.docenteLicencias = result.data.content;
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
    ListLicenciaComponent.prototype.loadDocenteLicenciaActive = function () {
        var _this = this;
        return this.docenteLicenciaService.getDocenteLicenciasActive(this.order, this.page, this.rows, this.sortField).pipe((0, rxjs_1.map)(function (result) {
            _this.docenteLicencias = result.data.content;
            _this.numberOfElements = result.data.numberOfElements;
            _this.totalRecords = result.data.totalElements;
            _this.totalPages = result.data.totalPages;
            _this.loading = !result.view;
        }), (0, rxjs_1.catchError)(function (error) {
            _this.messageService.add({
                severity: 'error',
                summary: _this.translate.instant('asistencia.message.errorTitle'),
                detail: _this.translate.instant('asistencia.message.errorDataMesage')
            });
            throw error;
        }));
    };
    ListLicenciaComponent.prototype.loadDocenteLicenciaInactive = function () {
        var _this = this;
        return this.docenteLicenciaService.getDocenteLicenciasInactive(this.order, this.page, this.rows, this.sortField).pipe((0, rxjs_1.map)(function (result) {
            _this.docenteLicencias = result.data.content;
            _this.numberOfElements = result.data.numberOfElements;
            _this.totalRecords = result.data.totalElements;
            _this.totalPages = result.data.totalPages;
            _this.loading = !result.view;
        }), (0, rxjs_1.catchError)(function (error) {
            _this.messageService.add({
                severity: 'error',
                summary: _this.translate.instant('asistencia.message.errorTitle'),
                detail: _this.translate.instant('asistencia.message.errorDataMesage')
            });
            throw error;
        }));
    };
    ListLicenciaComponent.prototype.eventSelect = function (event) {
        this.dataSelected = event.value;
        this.initData();
    };
    ListLicenciaComponent.prototype.clear = function (table) {
        this.globalFilter = '';
        this.sortField = 'docente.nombre';
        this.order = 1;
        this.page = 0;
        this.rows = 10;
        this.first = 0;
        this.filter.nativeElement.value = '';
        table.clear();
    };
    __decorate([
        (0, core_1.ViewChild)('filter')
    ], ListLicenciaComponent.prototype, "filter", void 0);
    ListLicenciaComponent = __decorate([
        (0, core_1.Component)({
            templateUrl: './listLicencia.component.html',
            providers: [api_1.MessageService]
        })
    ], ListLicenciaComponent);
    return ListLicenciaComponent;
}());
exports.ListLicenciaComponent = ListLicenciaComponent;
