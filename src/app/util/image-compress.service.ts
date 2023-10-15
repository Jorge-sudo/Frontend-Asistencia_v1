import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root',
})
export class ImageCompressService {

  maxWidth:number = 350;
  maxHight:number = 350;

  constructor(private imageCompress: NgxImageCompressService) {}

  async compressFile(image: File, nameFile: string): Promise<File | undefined> {
    if (!image) {
      return new Promise(resolve => {
        resolve(undefined);
      });
    }
    const dataURL = await this.fileToDataURL(image);
    const compressedImage = await this.imageCompress.compressFile(dataURL, 2, 50, 50, this.maxWidth, this.maxHight);
    return this.dataURLtoFile(compressedImage, nameFile, image.type);
  }

  dataURLtoFile(dataURL: string, fileName: string, fileType: string): File {
    // Obtener el tipo de archivo del encabezado proporcionado
    const type = fileType;

    // Dividir la URL de datos en los datos base64
    const base64 = dataURL.split(',')[1];

    // Decodificar la cadena base64 en un ArrayBuffer
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Crear un objeto Blob a partir del ArrayBuffer
    const blob = new Blob([bytes], { type });

    // Crear un objeto File a partir del Blob
    return new File([blob], fileName, { type });
  }

  fileToDataURL(file: File): Promise<string> {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          resolve(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    });
  }
}
