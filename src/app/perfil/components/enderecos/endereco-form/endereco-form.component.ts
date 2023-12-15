import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "../../../../shared/services/notifier.service";
import {UsuarioLogadoService} from "../../../../services/usuario-logado.service";
import {Estado} from "../../../../models/estado.model";
import {EstadoService} from "../../../../services/estado.service";
import {CidadeService} from "../../../../services/cidade.service";
import {Cidade} from "../../../../models/cidade.model";

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnInit {
  endereco: FormGroup;
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  constructor(public dialogRef: MatDialogRef<EnderecoFormComponent>,
              private formBuilder: FormBuilder,
              private estadoService: EstadoService,
              private cidadeService: CidadeService,
              private notifierService: NotifierService,
              private usuarioLogadoService: UsuarioLogadoService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.endereco = formBuilder.group({
      id: [(data) ? (data.id)? data.id : null: null],
      principal: [(data) ? (data.principal)? data.principal : '' : '', Validators.required],
      logradouro: [(data) ? (data.logradouro) ? data.logradouro : '': '', Validators.required],
      numero: [(data) ? (data.numero) ? data.numero : '': '', Validators.required],
      complemento: [(data) ? (data.complemento) ? data.complemento : '': '', Validators.required],
      bairro: [(data) ? (data.bairro) ? data.bairro : '': '', Validators.required],
      cep: [(data) ? (data.cep) ? data.cep : '': '', Validators.required],
      titulo: [(data) ? (data.titulo) ? data.titulo : '': '', Validators.required],
      cidade: [(data) ? (data.cidade) ? data.cidade : '': '', Validators.required],
      estado: [(data) ? (data.estado) ? data.estado : '': '', Validators.required]
    })
    console.log(this.endereco);
  }

  ngOnInit() {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    });

    this.endereco.get('estado')?.valueChanges.subscribe(novoEstado => {

      this.onEstadoChange(novoEstado);
    });
  }

  onEstadoChange(estado: Estado) {
    this.cidadeService.findByEstado(estado.id.toString()).subscribe(data => {
        this.cidades = data;
      }
    );
  }

  salvar() {
    if (this.endereco.valid) {
      const endereco = this.endereco.value;

      this.usuarioLogadoService.insertEndereco(endereco).subscribe({
        next: () => {
          this.notifierService.showNotification('Endereço cadastrado com sucesso!', 'success');

          this.dialogRef.close();
        },
        error: () => {
          this.notifierService.showNotification('Erro ao cadastrar endereço!', 'error');
        }
      });

    }
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

}
