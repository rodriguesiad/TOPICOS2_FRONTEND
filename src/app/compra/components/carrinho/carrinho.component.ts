import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemCarrinho } from 'src/app/models/item-carrinho.interface';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  formGroup: FormGroup;
  total: number = 0;
  quantidadeTotal: number = 0;

  constructor(private carrinhoService: CarrinhoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private compraService: CompraService) {
    this.formGroup = this.formBuilder.group({
      quantidade: [1]
    })
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
      this.total = this.calcularTotal();
    });
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }

}
