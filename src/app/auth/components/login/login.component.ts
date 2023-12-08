import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login = this.loginForm.get('login')!.value;
      const senha = this.loginForm.get('senha')!.value;
      this.authService.login(login, senha).subscribe( {
        next: (resp) => {
          this.showSnackbarTopPosition(this.authService.getToken(), 'Fechar', 1500);
          this.router.navigateByUrl('/produtos/list');
        },
        error: (err) => {
          console.log(err);
          this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 1500);
        }
      });   
    } else {
      this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 1500);
    }
  }

  showSnackbarTopPosition(content:any, action:any, duration:any) {
    this.snackBar.open(content, action, {
      duration: 1500,
      verticalPosition: "top",
      horizontalPosition: "right" 
    });
  }


}
