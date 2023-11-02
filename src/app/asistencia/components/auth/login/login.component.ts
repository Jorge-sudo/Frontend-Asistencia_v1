import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, lastValueFrom, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  
  userForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.authService
        .login(this.userForm.value).pipe(
          tap((response: any) => {
            this.authService.completarIniciarSesión(response.token);
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Inicio de sesión correcto',
            });
            this.userForm.reset();
            this.router.navigate(['/']);
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Usuario o contraseña incorrectos',
            });
            return error;
          })
        ).subscribe();
    }
  }
}
