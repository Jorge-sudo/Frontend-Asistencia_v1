export interface Asistencia {
    idAsistencia?: number;
    horaEntrada?: string;
    cantidadEstudiantes?: number;
    fecha?: string;
    estadoAsistencia?: string;
    aula?: string;
    paralelo?: string;
    piso?: string;
    bloque?: string;
    nroLaboratorio?: number;
    laboratorio?: boolean;
    horaInicio?: string;
    horaFin?: string;
    diaSemana?: string;
    turno?: string;
    sigla?: string;
    nombreMateria?: string;
    nombreDocente?: string;
    apellidoDocente?: string;
    base64ImagenDocente?: string;
}
