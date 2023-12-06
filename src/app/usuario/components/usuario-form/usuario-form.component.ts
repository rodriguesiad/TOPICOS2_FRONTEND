import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil.model';
import { Telefone } from 'src/app/models/telefone.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class UsuarioFormComponent implements OnInit {
  formGroup: FormGroup;
  maxDate = new Date();
  apiResponse: any = null;
  perfis: Perfil[] = [];
  minTelefones: boolean = false;
  usuario: Usuario;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService) {

    this.usuario = this.activatedRoute.snapshot.data['usuario'];

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      dataNascimento: [null],
      perfis: [null, Validators.required],
      telefones: this.formBuilder.array([]),
      ativo: [null]
    })

  }

  ngOnInit(): void {
    this.usuarioService.findPerfis().subscribe(data => {
      this.perfis = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      id: [(this.usuario && this.usuario.id) ? this.usuario.id : null],
      nome: [(this.usuario && this.usuario.nome) ? this.usuario.nome : '', Validators.required],
      email: [(this.usuario && this.usuario.email) ? this.usuario.email : '', Validators.required],
      cpf: [(this.usuario && this.usuario.cpf) ? this.usuario.cpf : '', Validators.required],
      senha: [(this.usuario && this.usuario.senha) ? 'Visualização indisponível. Se deseja alterar, escreva uma nova senha.' : ''],
      dataNascimento: [(this.usuario && this.usuario.dataNascimento) ? this.usuario.dataNascimento : null],
      perfis: [null, Validators.required],
      telefones: this.formBuilder.array([]),
      ativo: [(this.usuario && this.usuario.ativo) ? this.usuario.ativo : null]
    });

    if (this.usuario?.id !== null) {
      this.formGroup?.get('senha')?.clearValidators();
    } else {
      this.formGroup?.get('senha')?.setValidators([Validators.required]);
    }

    if (this.usuario) {
      if (this.usuario && this.usuario.telefones && this.usuario.telefones.length > 0) {
        this.usuario.telefones.forEach((telefone: Telefone) => {
          const newFormGroup = this.formBuilder.group({
            codigoArea: [telefone.codigoArea, Validators.required],
            numero: [telefone.numero, Validators.required]
          });

          this.telefones.push(newFormGroup);
        });

        this.minTelefones = true;
      }

      if (this.usuario?.perfis && this.usuario.perfis.length > 0) {
        const perfisSelecionados = this.perfis.filter(perfil =>
          this.usuario.perfis.some(usuarioPerfil => usuarioPerfil.id === perfil.id)
        );

        this.formGroup.get('perfis')?.setValue(perfisSelecionados);
      }
    }

    this.formGroup?.get('senha')?.updateValueAndValidity();

    if (this.usuario?.id == null) { this.adicionarTelefone(); }
  }

  get telefones(): FormArray {
    return this.formGroup.get('telefones') as FormArray;
  }

  adicionarTelefone(): void {
    this.minTelefones = true;

    this.telefones.push(
      this.formBuilder.group({
        codigoArea: ['', Validators.required],
        numero: ['', Validators.required],
      })
    );
  }

  removerTelefone(index: number): void {
    this.telefones.removeAt(index);
    this.minTelefones = this.telefones.length > 0;
  }

  salvar() {
    if (this.formGroup.valid && this.minTelefones) {
      const usuarioNovo = this.formGroup.value;

      const dataFormatada = new DatePipe('pt-BR').transform(usuarioNovo.dataNascimento, 'yyyy-MM-dd');
      usuarioNovo.dataNascimento = dataFormatada;

      if (usuarioNovo.senha == 'Visualização indisponível. Se deseja alterar, escreva uma nova senha.') {
        usuarioNovo.senha = this.usuario.senha;
      }

      if (usuarioNovo.id == null) {
        this.usuarioService.save(usuarioNovo).subscribe({
          next: (usuarioCadastrado) => {
            this.notifierService.showNotification('Usuário cadastrado com sucesso!', 'success');
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (errorResponse) => {
            this.apiResponse = errorResponse.error;

            const formControls = ['nome', 'email', 'cpf', 'senha', 'dataNascimento', 'perfis'];
            formControls.forEach(controlName => {
              this.formGroup.get(controlName)?.setErrors(null);
            });

            if (this.apiResponse && this.apiResponse.errors) {
              this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
                const fieldName = error.fieldName;
                const errorMessage = error.message;

                if (formControls.includes(fieldName)) {
                  this.formGroup.get(fieldName)?.setErrors({ apiError: errorMessage });
                }
              });
            }
            this.notifierService.showNotification('Erro ao inserir usuário!', 'error');
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        })
      } else {
        this.usuarioService.update(usuarioNovo).subscribe({
          next: (usuarioCadastrado) => {
            this.notifierService.showNotification('Usuário alterado com sucesso!', 'success');
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (errorResponse) => {
            this.apiResponse = errorResponse.error;

            const formControls = ['nome', 'email', 'cpf', 'senha', 'dataNascimento', 'perfis'];
            formControls.forEach(controlName => {
              this.formGroup.get(controlName)?.setErrors(null);
            });

            if (this.apiResponse && this.apiResponse.errors) {
              this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
                const fieldName = error.fieldName;
                const errorMessage = error.message;

                if (formControls.includes(fieldName)) {
                  this.formGroup.get(fieldName)?.setErrors({ apiError: errorMessage });
                }
              });
            }
            this.notifierService.showNotification('Erro ao alterar usuário!', 'error');
            console.log('Erro ao alterar' + JSON.stringify(errorResponse));
          }
        });
      }
    } else {
      if (!this.minTelefones) {
        this.notifierService.showNotification('Adicione pelo menos 1 telefone para o usuário.', 'warn');
      } else {
        this.notifierService.showNotification('O formulário está inválido', 'warn');
      }
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

}
