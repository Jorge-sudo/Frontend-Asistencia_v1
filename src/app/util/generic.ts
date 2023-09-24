import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class Generic {

  public static localStorageSetItem = (key: string, data: any): void => {
    if (typeof data === 'string') {
      return localStorage.setItem(key, data);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static localStorageGetItem = (key: string): any => {
    return localStorage.getItem(key);
  }

  public static removeLocalStorageItem = (key: string): void => {
    localStorage.removeItem(key);
  }

  public static validateAllFormFields = (abstractControl: AbstractControl): void => {
    if (abstractControl instanceof FormControl) {
      abstractControl.markAsTouched();
      abstractControl.updateValueAndValidity();
      return;
    }
    for (const field in (abstractControl as FormGroup).controls) {
      const control = abstractControl.get(field);
      if (!(control instanceof FormControl)) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else if (control instanceof FormArray) {
          for (const auxControl of control.controls) {
            if (auxControl instanceof FormControl) {
              control.updateValueAndValidity();
            } else if (auxControl instanceof FormGroup) {
              this.validateAllFormFields(auxControl);
            }
          }
        }
      } else {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    }
  }

  public static decodedToken = (): any => {
    const token = Generic.localStorageGetItem('token');
    if (!token) {
      return null;
    }
    const parts = token.split('.');
    return JSON.parse(Generic.decodedBase64(parts[1]));
  }

  public static decodedBase64 = (base64: string): string => {
    return atob(base64);
  }

  public static encodedBase64 = (data: string): string => {
    return btoa(data);
  }
}
