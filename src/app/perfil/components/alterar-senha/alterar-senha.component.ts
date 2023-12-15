import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {NotifierService} from "../../../shared/services/notifier.service";

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  senhas: FormGroup;
  mostrarSenha1 = false;
  mostrarSenha2 = false;

  constructor(public dialogRef: MatDialogRef<AlterarSenhaComponent>,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService,
              private usuarioLogadoService: UsuarioLogadoService) {
    this.senhas = formBuilder.group({
      senhaAtual: ['', Validators.required],
      novaSenha: ['', Validators.required],
    })
  }

  alterarSenha(): void {
    if (this.senhas.valid) {
      this.usuarioLogadoService.alterarSenha(this.senhas.value).subscribe({
        next: () => {
          this.notifierService.showNotification('Senha alterada com sucesso!', 'success');
          this.dialogRef.close();
        },
        error: () => {
          this.notifierService.showNotification('Erro ao alterar a senha!', 'error');
          this.senhas.reset();
        }
      });
    }
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  toggleMostrarSenha(campo: number): void {
    if (campo == 1) {
      this.mostrarSenha1 = !this.mostrarSenha1;
    } else {
      this.mostrarSenha2 = !this.mostrarSenha2;
    }
  }

}
