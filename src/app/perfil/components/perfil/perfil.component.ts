import {Component, OnInit} from '@angular/core';
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {DadosPessoais} from "../../../models/dados-pessoais.model";
import {tap} from "rxjs";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  defaultProfileImageUrl = '';
  selectedProfileImageUrl: string = ''; // Atribua um valor inicial aqui
  showImageOptions = false;
  nome: string = '';
  email: string = '';
  iconProfile?: number;

  constructor(public usuarioLogadoService: UsuarioLogadoService) {
    usuarioLogadoService.getDadosPessoais()
      .pipe(
        tap(dados => {
          this.nome = dados.nome;
          this.email = dados.email;
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.usuarioLogadoService.getIconProfile()
      .pipe(
        tap(dado => {
          this.iconProfile = dado
        })
      )
      .subscribe();

    console.log(this.iconProfile);

    if (this.iconProfile == null) {
      this.defaultProfileImageUrl = '../../../../assets/images/icon_profile.png';
    } else {
      if (this.iconProfile == 1) {
        this.defaultProfileImageUrl = '../../../../assets/images/icon_profile_1.png'
      } else if (this.iconProfile == 2) {
        this.defaultProfileImageUrl = '../../../../assets/images/icon_profile_2.png'
      } else if (this.iconProfile == 3) {
        this.defaultProfileImageUrl = '../../../../assets/images/icon_profile_3.jpg'
      } else if (this.iconProfile == 4) {
        this.defaultProfileImageUrl = '../../../../assets/images/icon_profile_4.png'
      } else {
        this.defaultProfileImageUrl = '../../../../assets/images/icon_profile.png';
      }
    }

  }

  imageOptions = [
    { id: 1, src: '../../../../assets/images/icon_profile_1.png' },
    { id: 2, src: '../../../../assets/images/icon_profile_2.png' },
    { id: 3, src: '../../../../assets/images/icon_profile_3.jpg' },
    { id: 4, src: '../../../../assets/images/icon_profile_4.png' },
  ];

  openImageOptions() {
    this.showImageOptions = !this.showImageOptions;
  }

  selectImage(option: any) {
    this.selectedProfileImageUrl = option.src;
    this.showImageOptions = false;
    console.log(option.id);
    this.usuarioLogadoService.setIconProfile(option.id).subscribe();

  }
}
