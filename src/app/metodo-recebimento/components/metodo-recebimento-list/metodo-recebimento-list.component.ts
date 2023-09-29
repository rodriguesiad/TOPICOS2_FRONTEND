import {Component} from '@angular/core';
import {Categoria} from "../../../models/categoria.model";
import {CategoriaService} from "../../../services/categoria.service";
import {BoletoRecebimento} from "../../../models/boleto-recebimento.model";
import {PixRecebimento} from "../../../models/pix-recebimento.model";
import {PixRecebimentoService} from "../../../services/pix-recebimento.service";
import {BoletoRecebimentoService} from "../../../services/boleto-recebimento.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Observer} from "rxjs";

export interface ExampleTab {
  label: string;
}

@Component({
  selector: 'app-metodo-recebimento-list',
  templateUrl: './metodo-recebimento-list.component.html',
  styleUrls: ['./metodo-recebimento-list.component.css']
})
export class MetodoRecebimentoListComponent {
  asyncTabs: Observable<ExampleTab[]>;

  boletoRecebimento: FormGroup;
  pixRecebimento: FormGroup;

  constructor(private categoriaService: CategoriaService,
              private boletoService: BoletoRecebimentoService,
              private pixService: PixRecebimentoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    const pix: PixRecebimento = this.activatedRoute.snapshot.data['pix_recebimento'];
    const boleto: BoletoRecebimento = this.activatedRoute.snapshot.data['boleto_recebimento'];

    this.boletoRecebimento = formBuilder.group({
      id: [(boleto && boleto.id) ? boleto.id : null],
      nome: [(boleto && boleto.nome) ? boleto.nome : '', Validators.required],
      cnpj: [(boleto && boleto.cnpj) ? boleto.cnpj : '', Validators.required],
      banco: [(boleto && boleto.banco) ? boleto.banco : '', Validators.required],
      agencia: [(boleto && boleto.agencia) ? boleto.agencia : '', Validators.required],
      conta: [(boleto && boleto.conta) ? boleto.conta : '', Validators.required]
    });

    this.pixRecebimento = formBuilder.group({
      id: [(pix && pix.id) ? pix.id : null],
      chave: [(pix && pix.chave) ? pix.chave : '', Validators.required],
      tipoChavePix: [(pix && pix.tipoChavePix) ? pix.tipoChavePix : '', Validators.required],
    });

    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: 'Boleto'},
          {label: 'Pix'}
        ]);
      }, 1000);
    });
  }

  salvarBoletoRecebimento() {

  }

  salvarPixRecebimento() {

  }
}
