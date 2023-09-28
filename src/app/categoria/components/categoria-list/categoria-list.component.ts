import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, tap, throwError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'actions-column'];
  categorias: Categoria[] = [];
  total = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private categoriaService: CategoriaService) {}

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
    this.categoriaService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
    .pipe(
      tap(categorias => this.categorias = categorias),
      catchError( err => {
        console.log("Erro carregando categorias");
        alert("Erro carregando categorias.");
        return throwError((() => err));
      })
    )
    .subscribe();
  }

  carregarTotal() {
    this.categoriaService.count()
    .pipe(
      tap(count => this.total = count),
      catchError( err => {
        console.log("Erro carregando o total de categorias");
        alert("Erro carregando categorias.");
        return throwError((() => err));
      })
    )
    .subscribe()
  }

}
