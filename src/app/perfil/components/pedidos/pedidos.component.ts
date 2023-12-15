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
export class PedidosComponent implements OnInit {
  pedidos?: Pedido[];

  constructor(private usuarioLogadoService: UsuarioLogadoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private confirmationDialogService: ConfirmationDialogService
  ) {
    this.usuarioLogadoService.getPedidos().subscribe(
      data => {this.pedidos = data;}
    )
  }

  ngOnInit() {
    console.log(this.pedidos);
  }

}
