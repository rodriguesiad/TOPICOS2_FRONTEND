import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, tap, throwError } from 'rxjs';
import { Especie } from 'src/app/models/especie.model';
import { EspecieService } from "src/app/services/especie.service";

@Component({
  selector: 'app-especie-list',
  templateUrl: './especie-list.component.html',
  styleUrls: ['./especie-list.component.css']
})
export class EspecieListComponent implements OnInit, AfterViewInit {

  tableColumns: string[] = ['nome-column', 'actions-column'];
  especies: Especie[] = [];
  total = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private especieService: EspecieService) {}

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
    this.especieService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
    .pipe(
      tap(especies => this.especies = especies),
      catchError( err => {
        console.log("Erro carregando especies");
        alert("Erro carregando especies.");
        return throwError((() => err));
      })
    )
    .subscribe();
  }

  carregarTotal() {
    this.especieService.count()
    .pipe(
      tap(count => this.total = count),
      catchError( err => {
        console.log("Erro carregando o total de especies");
        alert("Erro carregando especies.");
        return throwError((() => err));
      })
    )
    .subscribe()
  }
}
