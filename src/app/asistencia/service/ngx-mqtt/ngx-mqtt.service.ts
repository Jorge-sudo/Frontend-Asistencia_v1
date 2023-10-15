import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { MqttMessage } from '../../api/mqtt/mqttMessage';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root'
})
export class NgxMqttService {

  subscriptionDocenteRegister: Subscription;
  messageDocenteRegister: MqttMessage = {codigoRfid: 'Vacio'};
  docenteRegistrar = 'rfid/registrar/docente';
  tarjetaRfidCargado: boolean = false;

  constructor(private _mqttService: MqttService) {
    this.subscriptionDocenteRegister = this._mqttService.observe(this.docenteRegistrar).subscribe((message: IMqttMessage) => {
      this.messageDocenteRegister = JSON.parse(message.payload.toString());
      console.log(this.messageDocenteRegister.idAula);
      console.log(this.messageDocenteRegister.codigoRfid);
      this.tarjetaRfidCargado = true;
    });
  }
  public publicar(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.subscriptionDocenteRegister.unsubscribe();
  }
}
