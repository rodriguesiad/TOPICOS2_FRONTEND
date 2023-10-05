import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {PixRecebimentoService} from "../../../../services/pix-recebimento.service";
import {ConfirmationDialogService} from "../../../../shared/services/confirmation-dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-pix-recebimento-list',
  templateUrl: './pix-recebimento-list.component.html',
  styleUrls: ['./pix-recebimento-list.component.css']
})
export class PixRecebimentoListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['tipo-column', 'chave-column', 'actions-column'];
  metodosPix: PixRecebimento[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  dataSource = new MatTableDataSource<PixRecebimento>(this.metodosPix);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private pixService: PixRecebimentoService,
    private confirmationDialogService: ConfirmationDialogService,
  ) {
  }

  ngOnInit(): void {
    this.carregarMetodosPix();
    this.carregarTotalRegistros();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  carregarMetodosPix() {
    if (this.filtro) {
      this.pixService.findByChave(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.metodosPix = data;
      });
    } else {
      this.pixService.findByInativo(this.pagina, this.pageSize).subscribe(data => {
        this.metodosPix = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.pixService.countByChave(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.pixService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarMetodosPix();
  }

  aplicarFiltro() {
    this.carregarMetodosPix();
    this.carregarTotalRegistros();
  }

  openConfirmationDialog(id: string): void {
    const title = 'Confirmar Exclusão de Método de Recebimento';
    const message = 'Tem certeza de que deseja excluir este método de recebimento?';

    this.confirmationDialogService.openConfirmationDialog(
      title,
      message,
      () => {
        // Ação a ser realizada. Neste caso, a de excluir.
        this.pixService.delete(id).subscribe({
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

  limparFiltro() {
    this.filtro = '';
    this.aplicarFiltro();
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.aplicarFiltro();
    }
  }
}
