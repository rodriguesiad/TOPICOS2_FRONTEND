import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class UserRegistrationComponent implements OnInit {
  formGroup: FormGroup;
  formEndereco: FormGroup;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  maxDate = new Date();
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder, private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private notifierService: NotifierService,
    private usuarioService: UsuarioService,
    private router: Router) {
    this.formGroup = this.formBuilder.group({
      id: null,
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNascimento: [null],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
    })

    this.formEndereco = this.formBuilder.group({
      id: null,
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      estado: [null, Validators.required],
      municipio: [null, Validators.required],
      numero: ['', Validators.required],
      complemento: ['']
    })
  }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
      this.cidadeService.findAll().subscribe(data => {
        this.cidades = data;
        this.inicializeForm();
      })
    });
  }

  inicializeForm() {
    this.formGroup.get('confirmarSenha')?.valueChanges.subscribe(() => {
      this.validarConfirmacaoSenha();
    });
  }

  validarConfirmacaoSenha() {
    const senha = this.formGroup.get('senha')?.value;
    const confirmarSenha = this.formGroup.get('confirmarSenha')?.value;

    if (senha !== confirmarSenha) {
      this.formGroup.get('confirmarSenha')?.setErrors({ senhaNaoCorresponde: true });
    } else {
      this.formGroup.get('confirmarSenha')?.setErrors(null);
    }
  }

  getErrorMessage(fieldName: string): string {
    if (this.apiResponse && this.apiResponse.errors) {
      const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
      return error ? error.message : '';
    } else {
      return '';
    }
  }

  salvar() {
    if (this.formGroup.valid && this.formEndereco.valid) {
      const usuarioNovo = this.formGroup.value;
      const endereco = this.formEndereco.value;
      const dataFormatada = new DatePipe('pt-BR').transform(usuarioNovo.dataNascimento, 'yyyy-MM-dd');
      usuarioNovo.dataNascimento = dataFormatada;

      this.usuarioService.savePublic(usuarioNovo, endereco).subscribe({
        next: (usuarioCadastrado) => {
          console.log(usuarioCadastrado);
          this.notifierService.showNotification('Usuario cadastrado com sucesso!', 'success');
          this.router.navigateByUrl('/auth/login');
        },
        error: (errorResponse) => {
          this.apiResponse = errorResponse.error;

          const formControls = ['nome', 'email', 'dataNascimento', 'cpf', 'senha', 'cep', 'municipio', 'numero', 'complemento', 'bairro', 'logradouro'];
          formControls.forEach(controlName => {
            this.formGroup.get(controlName)?.setErrors(null);
          });

        

          if (this.apiResponse && this.apiResponse.errors) {
            console.log(this.apiResponse.errors)
            this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
              const fieldName = error.fieldName;
              const errorMessage = error.message;

              if (formControls.includes(fieldName)) {
                this.formGroup.get(fieldName)?.setErrors({ apiError: errorMessage });
              }
            });
          }

          this.notifierService.showNotification('Erro ao cadastrar usuário!', 'error');
          console.log('Erro ao cadastrar' + JSON.stringify(errorResponse));
        }
      })

      console.log(usuarioNovo);
    } else {
      this.notifierService.showNotification('O formulário está inválido', 'error');
    }
  }

}
