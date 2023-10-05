import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap, throwError } from 'rxjs';
import { SituacaoDialogBoxComponent } from 'src/app/components/situacao-dialog-box/situacao-dialog-box.component';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilEnum } from 'src/app/models/perfil.enum';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MatPaginator} from "@angular/material/paginator";
import {MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS} from "@angular/material/slide-toggle";

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
export class UsuarioListComponent  implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'email-column', 'cpf-column', 'perfis-column', 'actions-column'];
  usuarios: Usuario[] = [];
  total = 0;

  ativo = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  estadosAtivos: boolean[] = [];

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) { }

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

  carregarTotal() {
    this.usuarioService.count()
      .pipe(
        tap(count => this.total = count),
        catchError(err => {
          console.log(err);
          alert("Erro carregando o total usuários.");
          return throwError((() => err));
        })
      )
      .subscribe()
  }

  getPerfisText(perfis: number[]): string {

    const perfisText = perfis.map(perfil => {
      const perfilObj = PerfilEnum.items.find((item: { text: string; value: number }) => item.value === perfil);
      return perfilObj ? perfilObj.text : '';
    });

    return perfisText.join(', ');
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

}
