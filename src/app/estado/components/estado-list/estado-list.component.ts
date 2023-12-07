import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, tap, throwError } from 'rxjs';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  tableColumns: string[] = ['nome-column', 'sigla-column','actions-column'];
  estados: Estado[] = [];
  total=0;
  filtro: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private estadoService: EstadoService, private formBuilder:FormBuilder) {
    this.filtro = formBuilder.group({
      nome: ['']
    })
  }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    });
  }

  carregarDadosPaginados() {

    if (this.filtro.value?.nome != '') {
      this.estadoService.findByCampoBusca(this.filtro.value?.nome, this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(estados => {
            this.estados = estados
          }),
          catchError(err => {
            console.log("Erro carregando estados");
            alert("Erro carregando estados.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
    this.estadoService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
    .pipe(
      tap(especies => {this.estados = this.estados
      }),
      catchError( err => {
        console.log("Erro carregando estados");
        alert("Erro carregando estados.");
        return throwError((() => err));
      })
    )
    .subscribe();
  }
}

carregarTotal() {

  if (this.filtro.value?.nome != '' ) {
    this.estadoService.countByCampoBusca(this.filtro.value?.nome)
      .pipe(
        tap(count => this.total = count),
        catchError(err => {
          console.log("Erro carregando o total de estados");
          alert("Erro carregando estados.");
          return throwError((() => err));
        })
      )
      .subscribe()
  } else {this.estadoService.count()
  .pipe(
    tap(count => this.total = count),
    catchError( err => {
      console.log("Erro carregando o total de estados");
      alert("Erro carregando estados.");
      return throwError((() => err));
    })
  )
  .subscribe()
  }
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
