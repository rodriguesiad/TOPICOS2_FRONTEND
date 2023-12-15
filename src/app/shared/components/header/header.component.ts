import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  qtdItensCarrinho: number = 0;
  isAdminRoute: boolean = true;
  filtro: string = "";
  isAdmin: boolean = false;
  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  constructor(private sidebarService: SidebarService, private carrinhoService: CarrinhoService,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isAdminRoute = (event.url.includes('/admin'));
      });
    this.obterQtdItensCarrinho();
    this.getUserLoggerIn();
    this.isAdmin = this.authService.isUserAdmin();
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
    this.router.navigateByUrl('compras/home/' + this.filtro);
  }

  getUserLoggerIn() {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  navigateToHome() {
    this.router.navigate(['/compras/home']);
  }

}
