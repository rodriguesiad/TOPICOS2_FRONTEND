import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogService} from "../../../shared/services/confirmation-dialog.service";
import {Pedido} from "../../../models/pedido.model";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos?: Pedido[];

  constructor(private usuarioLogadoService: UsuarioLogadoService,
              public dialog: MatDialog
  ) {
    this.usuarioLogadoService.getPedidos().subscribe(
      data => {this.pedidos = data;}
    )
  }

}
