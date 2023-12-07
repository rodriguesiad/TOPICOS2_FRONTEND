import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemCarrinho } from 'src/app/models/item-carrinho.interface';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  carrinhoItens: ItemCarrinho[] = [];
  formGroup: FormGroup;
  quantidadeTeste: number[] = [1, 2, 3, 4, 5];

  constructor(private carrinhoService: CarrinhoService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      quantidade: [1]
    })
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
    });
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }
}
