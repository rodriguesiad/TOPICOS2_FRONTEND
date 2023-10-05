import {Component, ViewChild} from '@angular/core';
import {Cidade} from 'src/app/models/cidade.model';
import {CidadeService} from 'src/app/services/cidade.service';
import {ConfirmationDialogService} from "../../../shared/services/confirmation-dialog.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css']
})
export class CidadeListComponent {

  tableColumns: string[] = ['id-column', 'nome-column', 'estado-column', 'actions-column'];
  cidades: Cidade[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  dataSource = new MatTableDataSource<Cidade>(this.cidades);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private cidadeService: CidadeService,
              private confirmationDialogService: ConfirmationDialogService,) {
  }


  ngOnInit(): void {
    this.carregarCidades();
    this.carregarTotalRegistros();
  }

  carregarCidades(): void {
    if (this.filtro) {
      this.cidadeService.findByNome(this.filtro).subscribe(data => {
        this.cidades = data;
      });
    } else {
      this.cidadeService.findAll().subscribe(data => {
        this.cidades = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.cidadeService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.cidadeService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarCidades();
  }

  aplicarFiltro() {
    this.carregarCidades();
    this.carregarTotalRegistros();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  limparFiltro() {
    this.filtro = '';
    this.aplicarFiltro();
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.aplicarFiltro();
    }
  }

  openConfirmationDialog(id: string): void {
    const title = 'Confirmar Exclusão de Cidade';
    const message = 'Tem certeza de que deseja excluir esta cidade?';

    this.confirmationDialogService.openConfirmationDialog(
      title,
      message,
      () => {
        // Ação a ser realizada. Neste caso, a de excluir.
        this.cidadeService.delete(id).subscribe({
          next: () => {
            window.location.reload()
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    );
  }
}
