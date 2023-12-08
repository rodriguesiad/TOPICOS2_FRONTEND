import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  qtdItensCarrinho: number = 0;
  isAdminRoute: boolean = true;

  constructor(private sidebarService: SidebarService, private carrinhoService: CarrinhoService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isAdminRoute = (event.url.includes('/admin'));
      });
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
