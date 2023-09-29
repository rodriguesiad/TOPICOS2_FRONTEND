import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { catchError, tap, throwError } from 'rxjs';
import { SituacaoDialogBoxComponent } from 'src/app/components/situacao-dialog-box/situacao-dialog-box.component';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import {
  MatSlideToggleModule,
  MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css'],
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    },
  ],
})
export class CategoriaListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'actions-column'];
  categorias: Categoria[] = [];
  total = 0;

  ativo = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private categoriaService: CategoriaService, public dialog: MatDialog) { }

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
        tap(categorias => {
          this.categorias = categorias,
            this.estadosAtivos = this.categorias.map(categoria => categoria.ativo)
        }),
        catchError(err => {
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
        catchError(err => {
          console.log("Erro carregando o total de categorias");
          alert("Erro carregando categorias.");
          return throwError((() => err));
        })
      )
      .subscribe()
  }

  openDialog(event: Event, categoria: Categoria) {
    let situacao = categoria.ativo ? 'desativar' : 'ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: "350px",
      height: "225px",
      data: {
        message: 'Você realmente deseja ' + situacao + ' a categoria  "' + categoria.nome + '"?'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.categoriaService.alterarSituacao(categoria, !categoria.ativo)
          .pipe(
            tap(ca => categoria.ativo = ca.ativo),
            catchError(err => {
              console.log("Erro ao" + situacao + " categoria.");
              alert("Erro ao" + situacao + " categoria.");
              return throwError((() => err));
            })
          )
          .subscribe();


      }
    });
  }

}
