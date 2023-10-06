import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, tap, throwError } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent {

  tableColumns: string[] = ['nome-column','preco-column'
  ,'peso-column','estoque-column','raca-column','categoria-column','especie-column' ,'actions-column'];
  produtos: Produto[] = [];
  total = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarDadosPaginados();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.carregarDadosPaginados())
      )
      .subscribe();

    this.carregarTotal();
  }

  carregarDadosPaginados() {
    this.produtoService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
    .pipe(
      tap(produtos => {this.produtos = produtos,
        this.estadosAtivos = this.produtos.map(produtos => produtos.ativo)
      }),
      catchError( err => {
        console.log("Erro carregando especies");
        alert("Erro carregando especies.");
        return throwError((() => err));
      })
    )
    .subscribe();
  }

  carregarTotal() {
    this.produtoService.count()
    .pipe(
      tap(count => this.total = count),
      catchError( err => {
        console.log("Erro carregando o total de produtos");
        alert("Erro carregando produtos.");
        return throwError((() => err));
      })
    )
    .subscribe()
  }
}
