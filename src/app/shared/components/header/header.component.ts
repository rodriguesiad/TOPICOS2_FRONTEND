import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  qtdItensCarrinho: number = 0;

  constructor(private sidebarService: SidebarService, private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.qtdItensCarrinho = itens.reduce((total, item) => total + item.quantidade, 0);
    });
  }

}
