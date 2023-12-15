import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  qtdItensCarrinho: number = 0;
  isAdminRoute: boolean = true;
  filtro: string = "";

  constructor(private sidebarService: SidebarService, private carrinhoService: CarrinhoService,
              private router: Router, private authService: AuthService, private confirmationService: ConfirmationDialogService) { }

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

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.aplicarFiltro();
    }
  }

  aplicarFiltro() {
    this.router.navigateByUrl('compras/home/'+ this.filtro);
  }

  deslogar(){

    this.authService.removeToken();
    this.authService.removeUsuarioLogado()
    this.carrinhoService.removerTudo();
    this.router.navigate(['/login'], { replaceUrl: true })  
  }
 }