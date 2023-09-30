import { Component } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoletoRecebimentoService} from "../../../services/boleto-recebimento.service";
import {PixRecebimentoService} from "../../../services/pix-recebimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PixRecebimento} from "../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../models/boleto-recebimento.model";

@Component({
  selector: 'app-metodo-recebimento-form',
  templateUrl: './metodo-recebimento-form.component.html',
  styleUrls: ['./metodo-recebimento-form.component.css']
})
export class MetodoRecebimentoFormComponent {
  asyncTabs: Observable<string[]>;
  isCadastro: boolean = false;

  boletoRecebimento: FormGroup;
  pixRecebimento: FormGroup;

  constructor(private boletoService: BoletoRecebimentoService,
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

    this.asyncTabs = new Observable((observer: Observer<string[]>) => {
      setTimeout(() => {
        observer.next([
          'Boleto',
          'Pix'
        ]);
      }, 1000);
    });
  }

  salvarBoletoRecebimento() {
    const boleto = this.boletoRecebimento.value;
    this.boletoService.save(boleto).subscribe({
      next: () => {
        this.router.navigateByUrl('/metodos-recebimento/show');
      },
      error: (err) => {
        console.log('Erro ao incluir' + JSON.stringify(err));
      }
    });
  }

  salvarPixRecebimento() {
    const pix = this.pixRecebimento.value;
    this.pixService.save(pix).subscribe({
      next: () => {
        this.router.navigateByUrl('/metodos-recebimento/show');
      },
      error: (err) => {
        console.log('Erro ao incluir' + JSON.stringify(err));
      }
    });
  }

  novoMetodoRecebimento() {
    this.isCadastro = true;
    this.router.navigate(['/metodos-recebimento/new'])
  }
}
