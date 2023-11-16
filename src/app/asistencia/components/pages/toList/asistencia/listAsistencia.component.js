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
var file_saver_1 = require("file-saver");
var ListAsistenciaComponent = /** @class */ (function () {
    function ListAsistenciaComponent(asistenciaService, messageService, translate, semestreService, carreraService) {
        this.asistenciaService = asistenciaService;
        this.messageService = messageService;
        this.translate = translate;
        this.semestreService = semestreService;
        this.carreraService = carreraService;
        this.semestres = [];
        this.carreras = [];
        this.exportColumns = [];
        this.carreraSelected = { id: 0 };
        this.semestreSelected = { id: 0 };
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
    ListAsistenciaComponent.prototype.loadInit = function () {
        var _this = this;
        this.loadSemestres().pipe((0, rxjs_1.concatMap)(function () { return _this.loadCarreras(); }), (0, rxjs_1.finalize)(function () {
            _this.messageService.add({
                severity: 'info',
                summary: _this.translate.instant('asistencia.message.infoTitle'),
                detail: _this.translate.instant('asistencia.toList.asistencia.initInfo'),
            });
            _this.loading = false;
        })).subscribe();
    };
    ListAsistenciaComponent.prototype.ngOnInit = function () {
        this.loadInit();
        this.initColumns();
    };
    ListAsistenciaComponent.prototype.loadSemestres = function () {
        var _this = this;
        return this.semestreService.getSemestres().pipe((0, rxjs_1.map)(function (result) {
            _this.semestres = result.data;
        }), (0, rxjs_1.catchError)(function (error) {
            _this.messageService.add({
                severity: 'error',
                summary: _this.translate.instant('asistencia.message.errorTitle'),
                detail: _this.translate.instant('asistencia.toList.asignatura.error.messageSemestre'),
            });
            throw error;
        }));
    };
    ListAsistenciaComponent.prototype.loadCarreras = function () {
        var _this = this;
        return this.carreraService.getCarreras().pipe((0, rxjs_1.map)(function (result) {
            _this.carreras = result.data;
        }), (0, rxjs_1.catchError)(function (error) {
            _this.messageService.add({
                severity: 'error',
                summary: _this.translate.instant('asistencia.message.errorTitle'),
                detail: _this.translate.instant('asistencia.toList.asignatura.error.messageCarrera'),
            });
            throw error;
        }));
    };
    ListAsistenciaComponent.prototype.loadAsistencias = function () {
        var _this = this;
        if (this.carreraSelected.id !== 0 && this.semestreSelected.id !== 0) {
            return this.asistenciaService.getAsistenciasFindAll(this.order, this.page, this.rows, this.sortField, this.carreraSelected.id, this.semestreSelected.id, this.getDateSearchFormat(this.dateSearch), this.globalFilter).pipe((0, rxjs_1.tap)(function (result) {
                _this.asistencias = result.data.content;
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
        }
        else {
            if (this.carreraSelected.id === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: this.translate.instant('asistencia.message.warningTitle'),
                    detail: this.translate.instant('asistencia.toList.asistencia.valid.messageCarrera'),
                });
            }
            if (this.semestreSelected.id === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: this.translate.instant('asistencia.message.warningTitle'),
                    detail: this.translate.instant('asistencia.toList.asistencia.valid.messageSemestre'),
                });
            }
            return (0, rxjs_1.of)(null);
        }
    };
    ListAsistenciaComponent.prototype.loadData = function (event) {
        this.first = Number(event.first);
        this.rows = Number(event.rows);
        this.order = event.sortOrder === undefined ? 1 : event.sortOrder;
        this.sortField = event.sortField === undefined || event.sortField === null ? 'horaEntrada' : event.sortField;
        // Calculamos la página actual
        this.page = Math.floor(this.first / this.rows);
        this.loadAsistencias().subscribe();
    };
    ListAsistenciaComponent.prototype.onGlobalFilter = function (table, event) {
        table.filterGlobal(event.target.value, 'contains');
        this.globalFilter = event.target.value;
    };
    ListAsistenciaComponent.prototype.onSelect = function (event) {
        this.loadAsistencias().subscribe();
    };
    ListAsistenciaComponent.prototype.eventSelectCarrera = function (event) {
        this.carreraSelected = event.value;
    };
    ListAsistenciaComponent.prototype.eventSelectSemestre = function (event) {
        this.semestreSelected = event.value;
    };
    ListAsistenciaComponent.prototype.getDateSearchFormat = function (dateSearch) {
        var año = dateSearch.getFullYear(); // Obtener el año (ejemplo: 2023)
        var mes = String(dateSearch.getMonth() + 1).padStart(2, '0'); // Obtener el mes (ejemplo: 10) y asegurarse de que tenga dos dígitos
        var dia = String(dateSearch.getDate()).padStart(2, '0'); // Obtener el día (ejemplo: 04) y asegurarse de que tenga dos dígitos
        return "".concat(año, "-").concat(mes, "-").concat(dia);
    };
    ListAsistenciaComponent.prototype.exportPdf = function () {
        var _this = this;
        Promise.resolve().then(function () { return require('jspdf'); }).then(function (jsPDF) {
            Promise.resolve().then(function () { return require('jspdf-autotable'); }).then(function (x) {
                var _a;
                var doc = new jsPDF.default('p', 'px', 'a4');
                // Obtener fecha/hora actual
                var today = new Date();
                var date = today.toLocaleDateString();
                var time = today.toLocaleTimeString();
                var dateSearch = (_a = _this.dateSearch) === null || _a === void 0 ? void 0 : _a.toLocaleDateString();
                // Calcular posición de texto centrado
                var pageWidth = doc.internal.pageSize.getWidth();
                var textWidth = doc.getTextWidth('Reporte de Asistencias');
                var x1 = (pageWidth - textWidth) / 2;
                var data = _this.dataForExport();
                // Agregar título centrado
                doc.text('Reporte de Asistencias', x1, 20);
                doc.setFontSize(8);
                // Agregar fecha y hora
                doc.text("Fecha de Reporte: ".concat(date, " "), x1, 30);
                doc.text("Hora de Reporte: ".concat(time), x1, 40);
                // Agregar fecha de búsqueda
                doc.text("Fecha de Asistencia: ".concat(dateSearch), 30, 50);
                // Agregar carrera y semestre
                doc.text("Carrera: ".concat(_this.carreraSelected.nombre), 30, 60);
                doc.text("Semestre: ".concat(_this.semestreSelected.nombre), 30, 70);
                // Agregar cantidad de asistencias
                doc.text("Cantidad de Asistencias:  ".concat(_this.numberOfElements, " de ").concat(_this.totalRecords, "(total)"), 30, 80);
                doc.autoTable({
                    startY: 90,
                    columns: _this.exportColumns,
                    body: data,
                    //agregamos el tamaño de texto
                    styles: { fontSize: 7 }
                });
                doc.save("Asistencia_".concat(_this.carreraSelected.nombre, "_").concat(_this.semestreSelected.nombre, "_").concat(dateSearch, ".pdf"));
            });
        });
    };
    ListAsistenciaComponent.prototype.exportExcel = function () {
        var _this = this;
        var _a;
        var data = this.dataForExport();
        var today = new Date();
        var date = today.toLocaleDateString();
        var time = today.toLocaleTimeString();
        var dateSearch = (_a = this.dateSearch) === null || _a === void 0 ? void 0 : _a.toLocaleDateString();
        Promise.resolve().then(function () { return require('xlsx'); }).then(function (xlsx) {
            // Crear un libro vacío
            var workbook = xlsx.utils.book_new();
            // Crear un arreglo bidimensional con el texto del encabezado y el pie de página
            var headerFooter = [
                ["Reporte de Asistencias", "", "", "", "", "", "Fecha de Reporte: " + date],
                ["", "", "", "", "", "", "Hora de Reporte: " + time],
                ["Fecha de Asistencia: " + dateSearch, "", "", "", "", "", ""],
                ["Carrera: " + _this.carreraSelected.nombre, "", "", "", "", "", ""],
                ["Semestre: " + _this.semestreSelected.nombre, "", "", "", "", "", ""],
                ["Cantidad de Asistencias:  " + _this.numberOfElements + " de " + _this.totalRecords + "(total)", "", "", "", "", "", ""],
                ["", "", "", "", "", "", ""],
                _this.exportColumns // Agregar los títulos de las columnas
            ];
            // Crear una hoja de trabajo con el arreglo bidimensional
            var ws = xlsx.utils.aoa_to_sheet(headerFooter);
            // Agregar los datos JSON a la hoja de trabajo a partir de la fila 9
            xlsx.utils.sheet_add_json(ws, data, { origin: "A9" });
            // Agregar la hoja de trabajo al libro con el nombre "data"
            xlsx.utils.book_append_sheet(workbook, ws, "data");
            // Escribir el libro en un buffer
            var excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            // Guardar el archivo Excel
            _this.saveAsExcelFile(excelBuffer, "Asistencia_".concat(_this.carreraSelected.nombre, "_").concat(_this.semestreSelected.nombre, "_").concat(dateSearch, ".xlsx"));
        });
    };
    ListAsistenciaComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        var EXCEL_EXTENSION = '.xlsx';
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        file_saver_1.saveAs.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
    ListAsistenciaComponent.prototype.dataForExport = function () {
        var id = 1;
        return this.asistencias.map(function (asistencia) { return ({
            id: id++,
            nombreDocente: asistencia.nombreDocente,
            apellidoDocente: asistencia.apellidoDocente,
            horaEntrada: asistencia.horaEntrada,
            fecha: asistencia.fecha,
            cantidadEstudiantes: asistencia.cantidadEstudiantes,
            estadoAsistencia: asistencia.estadoAsistencia,
            laboratorio: asistencia.laboratorio ? 'Si' : 'No',
            aula: "".concat(asistencia.paralelo, " - ").concat(asistencia.aula, " - ").concat(asistencia.piso, " - ").concat(asistencia.bloque),
            horario: "".concat(asistencia.horaInicio, " - ").concat(asistencia.horaFin),
            nombreMateria: "".concat(asistencia.sigla, " - ").concat(asistencia.nombreMateria)
        }); });
    };
    ListAsistenciaComponent.prototype.clear = function (table) {
        this.globalFilter = '';
        this.sortField = 'horaEntrada';
        this.elementInputDate.writeValue(null);
        this.elementSelectCarrera.writeValue(null);
        this.elementSelectSemestre.writeValue(null);
        this.order = 1;
        this.page = 0;
        this.rows = 10;
        this.first = 0;
        this.filter.nativeElement.value = '';
        table.clear();
    };
    ListAsistenciaComponent.prototype.initColumns = function () {
        this.exportColumns = [
            {
                title: 'Nro',
                dataKey: 'id'
            },
            {
                title: 'Apellido',
                dataKey: 'apellidoDocente'
            },
            {
                title: 'Hora de Entrada',
                dataKey: 'horaEntrada'
            },
            {
                title: 'Fecha',
                dataKey: 'fecha'
            },
            {
                title: 'Cantidad de Estudiantes',
                dataKey: 'cantidadEstudiantes'
            },
            {
                title: 'Estado de Asistencia',
                dataKey: 'estadoAsistencia'
            },
            {
                title: 'Aula',
                dataKey: 'aula'
            },
            {
                title: 'Laboratorio',
                dataKey: 'laboratorio'
            },
            {
                title: 'Horario',
                dataKey: 'horario'
            },
            {
                title: 'Materia',
                dataKey: 'nombreMateria'
            }
        ];
    };
    __decorate([
        (0, core_1.ViewChild)('filter')
    ], ListAsistenciaComponent.prototype, "filter", void 0);
    __decorate([
        (0, core_1.ViewChild)('inputDate')
    ], ListAsistenciaComponent.prototype, "elementInputDate", void 0);
    __decorate([
        (0, core_1.ViewChild)('selectCarrera')
    ], ListAsistenciaComponent.prototype, "elementSelectCarrera", void 0);
    __decorate([
        (0, core_1.ViewChild)('selectSemestre')
    ], ListAsistenciaComponent.prototype, "elementSelectSemestre", void 0);
    ListAsistenciaComponent = __decorate([
        (0, core_1.Component)({
            templateUrl: './listAsistencia.component.html',
            providers: [api_1.MessageService]
        })
    ], ListAsistenciaComponent);
    return ListAsistenciaComponent;
}());
exports.ListAsistenciaComponent = ListAsistenciaComponent;
