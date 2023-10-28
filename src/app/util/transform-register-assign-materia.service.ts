import { Injectable } from '@angular/core';
import { MateriaCarreraSemestre } from '../asistencia/api/materiaCarreraSemestre';
import { Aula } from '../asistencia/api/aula';
import { Horario } from '../asistencia/api/horario';

@Injectable({
  providedIn: 'root'
})
export class TransformRegisterAssignMateriaService {

  constructor() { }

  transformTime(value: string | undefined): string {
    if (value) {
      return new Date(value).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
    }
    return '';
  }

  materiaCarreraSemestreToOptionsMateria(materiaCarreraSemestres: any[]): any[] {
    let options: any[] = [];
    materiaCarreraSemestres.forEach((materiaCarreraSemestre: MateriaCarreraSemestre) => {
      options.push(
        {
          code: materiaCarreraSemestre.idMateriaCarreraSemestre,
          name: `${materiaCarreraSemestre.materia}-${materiaCarreraSemestre.carrera}-${materiaCarreraSemestre.semestre}`
        });
    });
    return options;
  }

  aulaToOptionsAula(aulas: any[]): any[] {
    let options: any[] = [];
    aulas.forEach((aula: Aula) => {
      options.push(
        {
          code: aula.id,
          name: `${aula.paralelo}-${aula.aula}-${aula.piso}-${aula.bloque}`
        });
    });
    return options;
  }

  horarioToOptionsHorario(horarios: any[]): any[] {
    let options: any[] = [];
    horarios.forEach((horario: Horario) => {
      options.push(
        {
          code: horario.idHorario,
          name: horario.diaSemana + '-' +
                this.transformTime(horario.horaInicio) + '-'+
                this.transformTime(horario.horaFin) + '-'+
                horario.turno
        });
    });
    return options;
  }

}
