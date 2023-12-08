import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoletoPagamento } from 'src/app/models/boleto-pagamento.model';
import { Compra } from 'src/app/models/compra.model';
import { PixPagamento } from 'src/app/models/pix-pagamento.model';
import { StatusCompra } from 'src/app/models/status-compra.model';
import { CompraService } from 'src/app/services/compra.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-compra-view',
  templateUrl: './compra-view.component.html',
  styleUrls: ['./compra-view.component.css']
})
export class CompraViewComponent implements OnInit {
  compra: Compra;
  statusCompra: StatusCompra[] = [];
  currentStep: number = 0;
  metodoPagamento: BoletoPagamento | PixPagamento | null = null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private compraService: CompraService,
    private produtoService: ProdutoService) {
    this.compra = this.activatedRoute.snapshot.data['compra'];
    this.currentStep = this.compra.statusCompra.id;
  }

  ngOnInit(): void {
    this.compraService.findStatusCompra().subscribe(data => {
      this.statusCompra = data;
      this.statusCompra = this.statusCompra.filter(status => status.id !== 3);
      this.obterMetodoPagamento(this.compra.id);
    })
  }

  obterMetodoPagamento(idCompra: number): void {
    this.compraService.getMetodoPagamento(idCompra).subscribe( data => {
      this.metodoPagamento = data;
      console.log(data)
    });
  }

  getImagem(nomeImagem: string): string {
    return this.produtoService.getUrlImagem(nomeImagem);
  }

}
