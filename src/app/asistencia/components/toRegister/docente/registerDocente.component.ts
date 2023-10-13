import { Component } from '@angular/core';

@Component({
    templateUrl: './registerDocente.component.html'
})
export class RegisterDocenteComponent {
  value4: number = 50;
  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];
  selectedState: any = null;
}
