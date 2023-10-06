import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap, throwError } from 'rxjs';
import { SituacaoDialogBoxComponent } from 'src/app/components/situacao-dialog-box/situacao-dialog-box.component';

import { Raca } from 'src/app/models/raca.model';
import { RacaService } from 'src/app/services/raca.service';
import {MatPaginator} from "@angular/material/paginator";
import {MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS} from "@angular/material/slide-toggle";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-raca-list',
  templateUrl: './raca-list.component.html',
  styleUrls: ['./raca-list.component.css'],
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    },
  ],
})
export class RacaListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'actions-column'];
  racas: Raca[] = [];
  total = 0;

  ativo = false;
  filtro: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private racaService: RacaService, public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.filtro = formBuilder.group({
      nome: [''],
      ativo: [true]
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
      this.racaService.findByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo, this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(racas => {
            this.racas = racas,
              this.estadosAtivos = this.racas.map(raca => raca.ativo)
          }),
          catchError(err => {
            console.log("Erro carregando racas");
            alert("Erro carregando racas.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.racaService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(racas => {
            this.racas = racas,
              this.estadosAtivos = this.racas.map(raca => raca.ativo)
          }),
          catchError(err => {
            console.log("Erro carregando racas");
            alert("Erro carregando racas.");
            return throwError((() => err));
          })
        )
        .subscribe();
    }
  }

  carregarTotal() {
    if (this.filtro.value?.nome != '' || this.filtro.value?.ativo != null) {
      this.racaService.countByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo)
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log("Erro carregando o total de racas");
            alert("Erro carregando racas.");
            return throwError((() => err));
          })
        )
        .subscribe()
    } else {
      this.racaService.count()
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log("Erro carregando o total de racas");
            alert("Erro carregando racas.");
            return throwError((() => err));
          })
        )
        .subscribe()
    }

  }

  openDialog(event: Event, raca: Raca) {
    let situacao = raca.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = raca.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: "350px",
      height: "225px",
      data: {
        title: situacaoTitle,
        message: 'Você realmente deseja ' + situacao + ' a raça  "' + raca.nome + '"?'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.racaService.alterarSituacao(raca, !raca.ativo)
          .pipe(
            tap(ca => raca.ativo = ca.ativo),
            catchError(err => {
              console.log("Erro ao" + situacao + " raca.");
              alert("Erro ao" + situacao + " raca.");
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
