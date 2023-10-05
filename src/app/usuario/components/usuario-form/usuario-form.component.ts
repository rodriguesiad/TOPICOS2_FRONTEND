import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilEnum } from 'src/app/models/perfil.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class UsuarioFormComponent implements OnInit {
  formGroup: FormGroup;
  maxDate = new Date();

  perfis = PerfilEnum.items.map(item => ({
    value: item.value,
    text: item.text
  }));

  selectedPerfil = this.perfis[1].value;

  usuario: Usuario;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.usuario = this.activatedRoute.snapshot.data['usuario'];

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
      dataNascimento: [null],
      telefones: [null],
      perfis: [null, Validators.required],
      ativo: [null]
    })

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      id: [(this.usuario && this.usuario.id) ? this.usuario.id : null],
      nome: [(this.usuario && this.usuario.nome) ? this.usuario.nome : '', Validators.required],
      email: [(this.usuario && this.usuario.email) ? this.usuario.email : '', Validators.required],
      cpf: [(this.usuario && this.usuario.cpf) ? this.usuario.cpf : '', Validators.required],
      senha: [(this.usuario && this.usuario.senha) ? 'Visualização indisponível. Se deseja alterar, escreva uma nova senha.' : ''],
      dataNascimento: [(this.usuario && this.usuario.dataNascimento) ? this.usuario.dataNascimento : null],
      telefones: [(this.usuario && this.usuario.telefones) ? this.usuario.telefones : null],
      perfis: [(this.usuario && this.usuario.perfis) ? this.usuario.perfis : null, Validators.required],
      ativo: [(this.usuario && this.usuario.ativo) ? this.usuario.ativo : null]
    });

    if (this.usuario?.id !== null) {
      this.formGroup?.get('senha')?.clearValidators();
    } else {
      this.formGroup?.get('senha')?.setValidators([Validators.required]);
    }

    this.formGroup?.get('senha')?.updateValueAndValidity();

  }

  salvar() {
    if (this.formGroup.valid) {
      const usuarioNovo = this.formGroup.value;

      const dataFormatada = new DatePipe('pt-BR').transform(usuarioNovo.dataNascimento, 'yyyy-MM-dd');
      usuarioNovo.dataNascimento = dataFormatada;

      if(usuarioNovo.senha == 'Visualização indisponível. Se deseja alterar, escreva uma nova senha.'){
        usuarioNovo.senha = this.usuario.senha ;
      }

      if (usuarioNovo.id == null) {
        this.usuarioService.save(usuarioNovo).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.usuarioService.update(usuarioNovo).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }

}
