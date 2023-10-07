export interface Asignatura{
    id?: number;
    materia?: string;
    activo?: boolean;
    sigla?: string;
    carrera?: string;
    aula?: string;
    dia?: string;
    horario?: string;
    turno?: string;
    laboratorio?: boolean;
    nroLaboratorio?: number;
    semestre?: string;
    nombreDocente?: string;
    apellidoDocente?: string;
    base64Image?: string;
}
