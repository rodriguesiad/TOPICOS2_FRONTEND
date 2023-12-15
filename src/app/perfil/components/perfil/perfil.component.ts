import { Component } from '@angular/core';
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {DadosPessoais} from "../../../models/dados-pessoais.model";
import {tap} from "rxjs";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  defaultProfileImageUrl = '../../../../assets/images/icon_profile.png';
  selectedProfileImageUrl: string = ''; // Atribua um valor inicial aqui
  showImageOptions = false;
  nome: string = '';
  email: string = '';
  constructor(usuarioLogadoService: UsuarioLogadoService) {
    usuarioLogadoService.getDadosPessoais()
      .pipe(
        tap(dados => {
          this.nome = dados.nome;
          this.email = dados.email;
        })
      )
      .subscribe();
  }

  imageOptions = [
    '../../../../assets/images/icon_profile_1.png',
    '../../../../assets/images/icon_profile_2.png',
    '../../../../assets/images/icon_profile_3.jpg',
    '../../../../assets/images/icon_profile_4.png',
  ];

  openImageOptions() {
    this.showImageOptions = !this.showImageOptions;
  }

  selectImage(option: string) {
    this.selectedProfileImageUrl = option;
    this.showImageOptions = false;
  }
}
