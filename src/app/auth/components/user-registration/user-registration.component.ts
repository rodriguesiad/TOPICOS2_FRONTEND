import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';
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

  constructor(private formBuilder: FormBuilder, private estadoService: EstadoService, private cidadeService: CidadeService,
    private notifierService: NotifierService) {
    this.formGroup = this.formBuilder.group({
      nome: [''],
      email: [''],
      dataNascimento: [null],
      cpf: [''],
      senha: [''],
      confirmarSenha: [''],
    })

    this.formEndereco = this.formBuilder.group({
      cep: [''],
      bairro: [''],
      logradouro: [''],
      estado: [null],
      cidade: [null],
      numero: [''],
      complemento: ['']
    })

  }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
      this.cidadeService.findAll().subscribe(data => {
        this.cidades = data;
        this.inicializeForm();
        this.validarConfirmacaoSenha();
      })
    });
  }

  inicializeForm(): void {
    this.formGroup = this.formBuilder.group({
      nome: [''],
      email: [''],
      dataNascimento: [null],
      cpf: [''],
      senha: [''],
      confirmarSenha: ['']
    });

    this.formEndereco = this.formBuilder.group({
      cep: [''],
      bairro: [''],
      logradouro: [''],
      estado: [null],
      cidade: [null],
      numero: [''],
      complemento: ['']
    });
  }

  validarConfirmacaoSenha() {
    this.formGroup.get('senha')?.valueChanges.subscribe(() => {
      this.formGroup.get('confirmarSenha')?.updateValueAndValidity();
    });

    this.formGroup.get('confirmarSenha')?.valueChanges.subscribe(() => {
      this.formGroup.get('confirmarSenha')?.updateValueAndValidity();
    });
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
    if (this.formGroup.valid) {
      const usuarioNovo = {
        ...this.formGroup.value,
        endereco: this.formEndereco.value
      };
      const dataFormatada = new DatePipe('pt-BR').transform(usuarioNovo.dataNascimento, 'yyyy-MM-dd');
      usuarioNovo.dataNascimento = dataFormatada;

      console.log(usuarioNovo);
    } else {
      this.notifierService.showNotification('O formulário está inválido', 'warn');
    }
  }

}
