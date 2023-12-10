import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    hide = true;
    loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private notifier: NotifierService) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            login: ['', [Validators.required]],
            senha: ['', [Validators.required]]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const login = this.loginForm.get('login')!.value;
            const senha = this.loginForm.get('senha')!.value;
            this.authService.login(login, senha).subscribe({
                next: (resp) => {
                    this.router.navigateByUrl('/produtos/list');
                },
                error: (err) => {
                    console.log(err);
                    this.notifier.showNotification('Login ou senha inválidos', 'error');
                }
            });
        } else {
            this.notifier.showNotification('Dados inválidos', 'error');
        }
    }

}
