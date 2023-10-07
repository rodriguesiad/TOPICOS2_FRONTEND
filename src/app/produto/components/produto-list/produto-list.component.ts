import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, tap, throwError } from 'rxjs';
import { SituacaoDialogBoxComponent } from 'src/app/components/situacao-dialog-box/situacao-dialog-box.component';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent {

  tableColumns: string[] = ['nome-column','preco-column'
  ,'peso-column','estoque-column','raca-column','categoria-column','especie-column','actions-column'];
  produtos: Produto[] = [];
  total = 0;
  filtro: FormGroup;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private produtoService: ProdutoService, public dialog:MatDialog, private formBuilder:FormBuilder) {
    this.filtro = formBuilder.group({
      nome: [''],
      ativo: [null]
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
      this.produtoService.findByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo, this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(produtos => {
            this.produtos = produtos,
              this.estadosAtivos = this.produtos.map(produto => produto.ativo)
          }),
          catchError(err => {
            console.log("Erro carregando produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
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
}

  carregarTotal() {
    if (this.filtro.value?.nome != '' || this.filtro.value?.ativo != null) {
      this.produtoService.countByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo)
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log("Erro carregando o total de produtos");
            alert("Erro carregando produtos.");
            return throwError((() => err));
          })
        )
        .subscribe()
    } else {
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

openDialog(event: Event, produto: Produto) {
  let situacao = produto.ativo ? 'desativar' : 'ativar';
  let situacaoTitle = produto.ativo ? 'Desativar' : 'Ativar';

  const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
    width: "350px",
    height: "225px",
    data: {
      title: situacaoTitle,
      message: 'Você realmente deseja ' + situacao + ' o produto  "' + produto.nome + '"?'
    }
  })
  
  dialogRef.afterClosed().subscribe(result => {
    if (result == true) {
      this.produtoService.alterarSituacao(produto, !produto.ativo)
        .pipe(
          tap(ca => produto.ativo = ca.ativo),
          catchError(err => {
            console.log("Erro ao" + situacao + " produto.");
            alert("Erro ao" + situacao + " produto.");
            return throwError((() => err));
          })
        )
        .subscribe();
    }
  });
}

aplicarFiltro() {
  this.carregarDadosPaginados();
  this.carregarTotal();
}

limparFiltro() {
  this.filtro = this.formBuilder.group({
    nome: [''],
    ativo: [null]
  })

  this.aplicarFiltro();
}

onEnterKey(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    this.aplicarFiltro();
  }
}
}
