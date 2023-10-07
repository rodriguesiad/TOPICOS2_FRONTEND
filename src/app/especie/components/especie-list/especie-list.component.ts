import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, tap, throwError } from 'rxjs';
import { SituacaoDialogBoxComponent } from 'src/app/shared/components/situacao-dialog-box/situacao-dialog-box.component';
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
  filtro: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private especieService: EspecieService, public dialog:MatDialog, private formBuilder:FormBuilder) {
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
      this.especieService.findByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo, this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(especies => {
            this.especies = especies,
              this.estadosAtivos = this.especies.map(especie => especie.ativo)
          }),
          catchError(err => {
            console.log("Erro carregando especies");
            alert("Erro carregando especies.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
    this.especieService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
    .pipe(
      tap(especies => {this.especies = especies,
        this.estadosAtivos = this.especies.map(especies => especies.ativo)
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
      this.especieService.countByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo)
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log("Erro carregando o total de espécies");
            alert("Erro carregando espécies.");
            return throwError((() => err));
          })
        )
        .subscribe()
    } else {this.especieService.count()
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

  openDialog(event: Event, especie: Especie) {
    let situacao = especie.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = especie.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: "350px",
      height: "225px",
      data: {
        title: situacaoTitle,
        message: 'Você realmente deseja ' + situacao + ' a especie  "' + especie.nome + '"?'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.especieService.alterarSituacao(especie, !especie.ativo)
          .pipe(
            tap(ca => especie.ativo = ca.ativo),
            catchError(err => {
              console.log("Erro ao" + situacao + " especie.");
              alert("Erro ao" + situacao + " especie.");
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
