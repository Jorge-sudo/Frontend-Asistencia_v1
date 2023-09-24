import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, lastValueFrom, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService]
})
export class LoginComponent {

    userForm: FormGroup = {} as FormGroup;
    isFormSubmitted = false;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(private formBuilder: FormBuilder, private router: Router,
                private authService: AuthService, private service: MessageService) {
        this.initForm();
    }

    private initForm(): void{
        this.userForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            contrasenia: ['', Validators.required]
        });
    }

    protected submitForm(): void {
        if (this.userForm.valid) {
            this.isFormSubmitted = true;
            this.authService.login(this.userForm.value)
                .pipe(
                    tap((response: any) => {
                        this.authService.completarIniciarSesión(response.token);
                        this.userForm.reset();
                        this.router.navigate(['/']);
                    })
                ).subscribe();
        }
    }


}
