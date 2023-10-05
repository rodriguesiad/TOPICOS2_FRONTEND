import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoletoRecebimentoService} from "../../../../services/boleto-recebimento.service";
import {PixRecebimentoService} from "../../../../services/pix-recebimento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../../models/boleto-recebimento.model";

@Component({
  selector: 'app-boleto-recebimento-form',
  templateUrl: './boleto-recebimento-form.component.html',
  styleUrls: ['./boleto-recebimento-form.component.css']
})
export class BoletoRecebimentoFormComponent {
  isCadastro: boolean = false;
  boletoRecebimento: FormGroup;
  isEdicao: boolean = false;

  constructor(private boletoService: BoletoRecebimentoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    const boleto: BoletoRecebimento = this.activatedRoute.snapshot.data['boleto_recebimento'];

    this.boletoRecebimento = formBuilder.group({
      id: [(boleto && boleto.id) ? boleto.id : null],
      nome: [(boleto && boleto.nome) ? boleto.nome : '', Validators.required],
      cnpj: [(boleto && boleto.cnpj) ? boleto.cnpj : '', Validators.required],
      banco: [(boleto && boleto.banco) ? boleto.banco : '', Validators.required],
      agencia: [(boleto && boleto.agencia) ? boleto.agencia : '', Validators.required],
      conta: [(boleto && boleto.conta) ? boleto.conta : '', Validators.required]
    });

    this.isCadastro = this.activatedRoute.snapshot.data['isCadastro'];
    this.isEdicao = this.activatedRoute.snapshot.data['isEdicao'];

    if (!this.isEdicao && !this.isCadastro) {
      this.boletoRecebimento.controls['nome'].disable();
      this.boletoRecebimento.controls['cnpj'].disable();
      this.boletoRecebimento.controls['banco'].disable();
      this.boletoRecebimento.controls['agencia'].disable();
      this.boletoRecebimento.controls['conta'].disable();
    }

  }

  salvarBoletoRecebimento() {
    const boleto = this.boletoRecebimento.value;

    if(boleto.id == null) {
      this.boletoService.save(boleto).subscribe({
        next: () => {
          this.router.navigateByUrl('/metodos-recebimento/show');
        },
        error: (err) => {
          console.log('Erro ao incluir' + JSON.stringify(err));
        }
      });
    } else {
      this.boletoService.update(boleto).subscribe({
        next: () => {
          this.router.navigateByUrl('/metodos-recebimento/list');
        },
        error: (err) => {
          console.log('Erro ao editar' + JSON.stringify(err));
        }
      });
    }
  }

  back() {
    if (this.isCadastro) {
      this.router.navigateByUrl('/metodos-recebimento/show')
    }
    if (this.isEdicao) {
      this.router.navigateByUrl('/metodos-recebimento/list');
    }
  }

}
