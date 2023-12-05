import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from "@angular/material/slide-toggle";
import { catchError, tap, throwError } from 'rxjs';
import { Perfil } from 'src/app/models/perfil.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SituacaoDialogBoxComponent } from 'src/app/shared/components/situacao-dialog-box/situacao-dialog-box.component';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers: [
    {
      provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
      useValue: { disableToggleValue: true },
    },
  ],
})
export class UsuarioListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'email-column', 'cpf-column', 'perfis-column', 'actions-column'];
  usuarios: Usuario[] = [];
  total = 0;

  ativo = false;
  filtro: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private usuarioService: UsuarioService,
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
    this.carregarTotal();
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
      this.usuarioService.findByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo, this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(usuarios => {
            this.usuarios = usuarios,
              this.estadosAtivos = this.usuarios.map(usuario => usuario.ativo)
          }),
          catchError(err => {
            console.log(err);
            alert("Erro carregando total de usuários.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.usuarioService.findAllPaginado(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? 5)
        .pipe(
          tap(usuarios => {
            this.usuarios = usuarios,
              this.estadosAtivos = this.usuarios.map(usuario => usuario.ativo)
          }),
          catchError(err => {
            console.log(err);
            alert("Erro carregando total de usuários.");
            return throwError((() => err));
          })
        )
        .subscribe();
    }
  }

  carregarTotal() {
    if (this.filtro.value?.nome != '' || this.filtro.value?.ativo != null) {
      this.usuarioService.countByCampoBusca(this.filtro.value?.nome, this.filtro.value?.ativo)
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log(err);
            alert("Erro carregando o total usuários.");
            return throwError((() => err));
          })
        )
        .subscribe();
    } else {
      this.usuarioService.count()
        .pipe(
          tap(count => this.total = count),
          catchError(err => {
            console.log(err);
            alert("Erro carregando o total usuários.");
            return throwError((() => err));
          })
        )
        .subscribe();
    }
  }

  getPerfisLabel(perfis: Perfil[] | undefined | null): string {
    if (!perfis) {
      return '';
    }

    const perfisLabel = perfis.map(perfil => perfil.label);

    return perfisLabel.join(', ');
  }

  openDialog(event: Event, usuario: Usuario) {
    let situacao = usuario.ativo ? 'desativar' : 'ativar';
    let situacaoTitle = usuario.ativo ? 'Desativar' : 'Ativar';

    const dialogRef = this.dialog.open(SituacaoDialogBoxComponent, {
      width: "350px",
      height: "225px",
      data: {
        title: situacaoTitle,
        message: 'Você realmente deseja ' + situacao + ' o usuário  "' + usuario.nome + '"?'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.usuarioService.alterarSituacao(usuario, !usuario.ativo)
          .pipe(
            tap(ca => usuario.ativo = ca.ativo),
            catchError(err => {
              console.log(err);
              alert("Erro ao" + situacao + " usuário.");
              return throwError((() => err));
            })
          )
          .subscribe();
      }
    });
  }

  openConfirmationDialog(usuario: Usuario): void {
    const title = 'Confirmar Exclusão de Usuário';
    const message = 'Tem certeza de que deseja excluir usuário?';

    this.confirmationDialogService.openConfirmationDialog(
      title,
      message,
      () => {
        this.usuarioService.delete(usuario).subscribe({
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
