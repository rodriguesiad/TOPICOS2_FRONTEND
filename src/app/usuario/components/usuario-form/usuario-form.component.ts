import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilEnum } from 'src/app/models/perfil.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

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
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

    this.formGroup = this.formBuilder.group({
      id: [(usuario && usuario.id) ? usuario.id : null],
      nome: [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      email: [(usuario && usuario.email) ? usuario.email : '', Validators.required],
      cpf: [(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
      senha: [(usuario && usuario.senha) ? usuario.senha : '', Validators.required],
      dataNascimento: [(usuario && usuario.dataNascimento) ? usuario.dataNascimento : null],
      telefones: [(usuario && usuario.telefones) ? usuario.telefones : null],
      perfis: [(usuario && usuario.perfis) ? usuario.perfis : null, Validators.required],
      ativo: [(usuario && usuario.ativo) ? usuario.ativo : null]
    });

  }

  salvar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;

      console.log(usuario);
      

      if (usuario.id == null) {
        this.usuarioService.save(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
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
