import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap, throwError } from 'rxjs';
import { SituacaoDialogBoxComponent } from 'src/app/shared/components/situacao-dialog-box/situacao-dialog-box.component';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from "@angular/material/slide-toggle";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';

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

  filtro: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService) {
    this.filtro = formBuilder.group({
      nome: [''],
      ativo: ['Todos']
    })
  }

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
    if (this.filtro.value?.nome != '' || this.filtro.value?.ativo != null) {
      this.categoriaService.findByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo, this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
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
    } else {
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
  }

  carregarTotal() {
    if (this.filtro.value?.nome != '' || this.filtro.value?.ativo != null) {
      this.categoriaService.countByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo)
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log("Erro carregando o total de categorias");
            alert("Erro carregando categorias.");
            return throwError((() => err));
          })
        )
        .subscribe()
    } else {
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

  }

  openDialog(event: Event, categoria: Categoria) {
    let situacao = categoria.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = categoria.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: "350px",
      height: "225px",
      data: {
        title: situacaoTitle,
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

  openConfirmationDialog(categoria: Categoria): void {
    const title = 'Confirmar Exclusão de Categoria';
    const message = 'Tem certeza de que deseja excluir esta categoria?';

    this.confirmationDialogService.openConfirmationDialog(
      title,
      message,
      () => {
        this.categoriaService.delete(categoria).subscribe({
          next: () => { this.ngOnInit() },
          error: (err) => {
            console.log(err);
          }
        })
      }
    );
  }

  aplicarFiltro() {
    this.carregarDadosPaginados();
    this.carregarTotal();
  }

  limparFiltro() {
    this.filtro = this.formBuilder.group({
      nome: [''],
      ativo: ['Todos']
    })

    this.aplicarFiltro();
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.aplicarFiltro();
    }
  }

}
