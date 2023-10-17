import { Injectable } from '@angular/core';
import { Subscription, map, tap } from 'rxjs';
import { MqttMessage } from '../../api/mqtt/mqttMessage';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { AulaService } from '../aula.service';
import { Aula } from '../../api/aula';

@Injectable({
  providedIn: 'root'
})
export class NgxMqttService {

  subscriptionDocenteRegister: Subscription;
  messageDocenteRegister: MqttMessage = {};
  docenteRegistrar = 'rfid/registrar/docente';
  cardRfidLoad: boolean = false;
  aula: Aula = {};

  constructor(private _mqttService: MqttService,
             private aulaService: AulaService) {

    this.subscriptionDocenteRegister = this._mqttService.observe(this.docenteRegistrar).subscribe(async (message: IMqttMessage) => {
      this.messageDocenteRegister = JSON.parse(message.payload.toString());
      if(this.messageDocenteRegister.idAula !== undefined){
        this.getAulaById(this.messageDocenteRegister.idAula);
        this.cardRfidLoad = true;
      }

    });
  }

  getAulaById(id: number){
    this.aulaService.getAulaById(id).pipe(
      tap((aula: any) => {
        this.aula = aula.data;
      })
    ).subscribe();
  }

  public publish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.subscriptionDocenteRegister.unsubscribe();
  }
}
