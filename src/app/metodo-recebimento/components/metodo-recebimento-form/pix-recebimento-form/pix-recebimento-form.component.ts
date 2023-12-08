import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoletoRecebimentoService} from "../../../../services/boleto-recebimento.service";
import {PixRecebimentoService} from "../../../../services/pix-recebimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../../models/boleto-recebimento.model";
import {MetodoRecebimentoFormComponent} from "../metodo-recebimento-form.component";
import {TipoChavePix} from "../../../../models/tipo-chave-pix";

@Component({
  selector: 'app-pix-recebimento-form',
  templateUrl: './pix-recebimento-form.component.html',
  styleUrls: ['./pix-recebimento-form.component.css']
})
export class PixRecebimentoFormComponent {
  isCadastro: boolean = false;
  isEdicao: boolean = false;
  pixRecebimento: FormGroup;

  @Input() valor: boolean = false;

  constructor(private pixService: PixRecebimentoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    const pix: PixRecebimento = this.activatedRoute.snapshot.data['pix_recebimento'];
    console.log(pix);

    this.pixRecebimento = formBuilder.group({
      id: [(pix && pix.id) ? pix.id : null],
      chave: [(pix && pix.chave) ? pix.chave : '', Validators.required],
      tipoChavePix: [(pix && pix.tipoChavePix) ? pix.tipoChavePix.id : '', Validators.required],
    });

    this.isCadastro = this.activatedRoute.snapshot.data['isCadastro'];
    this.isEdicao = this.activatedRoute.snapshot.data['isEdicao'];

    if (!this.isEdicao && !this.isCadastro) {
      this.pixRecebimento.controls['chave'].disable();
      this.pixRecebimento.controls['tipoChavePix'].disable();
    }
  }

  salvarPixRecebimento() {
    const pix = this.pixRecebimento.value;

    if(pix.id == null) {
      this.pixService.save(pix).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/metodos-recebimento/show');
        },
        error: (err) => {
          console.log('Erro ao incluir' + JSON.stringify(err));
        }
      });
    } else {
      this.pixService.update(pix).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/metodos-recebimento/list');
        },
        error: (err) => {
          console.log('Erro ao editar' + JSON.stringify(err));
        }
      });
    }
  }

  back() {
    if (this.isCadastro) {
      this.router.navigateByUrl('/admin/metodos-recebimento/show')
    }
    if (this.isEdicao) {
      this.router.navigateByUrl('/admin/metodos-recebimento/list');
    }

  }

}
