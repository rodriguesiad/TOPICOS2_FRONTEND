import {Component, OnInit} from '@angular/core';
import {DadosPessoais} from "../../../models/dados-pessoais.model";
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotifierService} from "../../../shared/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioEndereco} from "../../../models/usuario-endereco.model";
import {Telefone} from "../../../models/telefone.model";
import {Endereco} from "../../../models/endereco.model";
import {AlterarSenhaComponent} from "../alterar-senha/alterar-senha.component";
import {EnderecoFormComponent} from "./endereco-form/endereco-form.component";
import {tap} from "rxjs";
import {Raca} from "../../../models/raca.model";
import {ConfirmationDialogService} from "../../../shared/services/confirmation-dialog.service";

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {
  usuarioEnderecos: FormGroup;
  minEnderecos: boolean = false;

  constructor(private usuarioLogadoService: UsuarioLogadoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private confirmationDialogService: ConfirmationDialogService
  ) {
    this.usuarioEnderecos = formBuilder.group({
      listaEnderecos: this.formBuilder.array([])
    });
  }
  ngOnInit() {
    const usuarioEnderecos: UsuarioEndereco = this.activatedRoute.snapshot.data['enderecos'];

    console.log(usuarioEnderecos);

    this.carregarEnderecos(usuarioEnderecos);

  }

  get enderecos(): FormArray {
    return this.usuarioEnderecos.get('listaEnderecos') as FormArray;
  }

  adicionarEndereco(): void {
    const dialogRef = this.dialog.open(EnderecoFormComponent, {
      width: '70%',
      height: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reload();
    });
  }

  reload() {
    this.usuarioLogadoService.getEnderecos().pipe(
      tap(data => this.carregarEnderecos(data))
    )
      .subscribe();
  }

  carregarEnderecos(usuarioEnderecos: UsuarioEndereco) {
    if (usuarioEnderecos) {
      if (usuarioEnderecos && usuarioEnderecos.listaEnderecos && usuarioEnderecos.listaEnderecos.length > 0) {
        this.enderecos.clear();
        usuarioEnderecos.listaEnderecos.forEach((endereco: Endereco) => {
          const newFormGroup = this.formBuilder.group({
            id: [endereco.id, Validators.required],
            principal: [endereco.principal, Validators.required],
            logradouro: [endereco.logradouro, Validators.required],
            numero: [endereco.numero, Validators.required],
            complemento: [endereco.complemento, Validators.required],
            bairro: [endereco.bairro, Validators.required],
            cep: [endereco.cep, Validators.required],
            titulo: [endereco.titulo, Validators.required],
            municipio: [endereco.municipio.nome, Validators.required],
            estado: [endereco.municipio.estado.nome, Validators.required]
          });

          this.enderecos.push(newFormGroup);
        });

        this.minEnderecos = true;
      }
    }
  }

  openConfirmationDialog(endereco: Endereco): void {
    const title = 'Confirmar Exclusão de Endereço';
    const message = 'Tem certeza de que deseja excluir o endereço?';

    this.confirmationDialogService.openConfirmationDialog(
      title,
      message,
      () => {
        this.usuarioLogadoService.deleteEndereco(endereco.id).subscribe({
          next: () => { this.reload() },
          error: (err) => {
            console.log(err);
          }
        })
      }
    );
  }
}
