import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoletoRecebimentoService} from "../../../../services/boleto-recebimento.service";
import {PixRecebimentoService} from "../../../../services/pix-recebimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../../models/boleto-recebimento.model";
import {MetodoRecebimentoFormComponent} from "../metodo-recebimento-form.component";

@Component({
  selector: 'app-pix-recebimento-form',
  templateUrl: './pix-recebimento-form.component.html',
  styleUrls: ['./pix-recebimento-form.component.css']
})
export class PixRecebimentoFormComponent {
  isCadastro: boolean = false;
  pixRecebimento: FormGroup;

  @Input() valor: boolean = false;

  constructor(private pixService: PixRecebimentoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    const pix: PixRecebimento = this.activatedRoute.snapshot.data['pix_recebimento'];

    this.pixRecebimento = formBuilder.group({
      id: [(pix && pix.id) ? pix.id : null],
      chave: [(pix && pix.chave) ? pix.chave : '', Validators.required],
      tipoChavePix: [(pix && pix.tipoChavePix) ? pix.tipoChavePix : '', Validators.required],
    });

    this.isCadastro = this.activatedRoute.snapshot.data['isCadastro'];
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

}
