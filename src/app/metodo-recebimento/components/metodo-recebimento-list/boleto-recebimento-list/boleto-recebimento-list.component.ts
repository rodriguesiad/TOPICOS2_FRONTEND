import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../../models/boleto-recebimento.model";
import {BoletoRecebimentoService} from "../../../../services/boleto-recebimento.service";
import {Observable, Observer} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConfirmationDialogService} from "../../../../shared/services/confirmation-dialog.service";

@Component({
  selector: 'app-boleto-recebimento-list',
  templateUrl: './boleto-recebimento-list.component.html',
  styleUrls: ['./boleto-recebimento-list.component.css']
})
export class BoletoRecebimentoListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'cnpj-column', 'banco-column', 'agencia-column', 'conta-column', 'actions-column'];
  metodosBoleto: BoletoRecebimento[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = "";

  dataSource = new MatTableDataSource<BoletoRecebimento>(this.metodosBoleto);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private boletoService: BoletoRecebimentoService,
              private confirmationDialogService: ConfirmationDialogService,) {
  }

  ngOnInit(): void {
    this.carregarMetodosBoleto();
    this.carregarTotalRegistros();
  }

  carregarMetodosBoleto() {
    if (this.filtro) {
      this.boletoService.findByCNPJ(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.metodosBoleto = data;
      });
    } else {
      this.boletoService.findByInativo(this.pagina, this.pageSize).subscribe(data => {
        this.metodosBoleto = data;
      });
    }
  }

  carregarTotalRegistros() {
    // se existe dados no filtro
    if (this.filtro) {
      this.boletoService.countByCNPJ(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.boletoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarMetodosBoleto();
  }

  aplicarFiltro() {
    this.carregarMetodosBoleto();
    this.carregarTotalRegistros();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openConfirmationDialog(id: string): void {
    const title = 'Confirmar Exclusão de Método de Recebimento';
    const message = 'Tem certeza de que deseja excluir este método de recebimento?';

    this.confirmationDialogService.openConfirmationDialog(
      title,
      message,
      () => {
        // Ação a ser realizada. Neste caso, a de excluir.
        this.boletoService.delete(id).subscribe({
          next: () => {window.location.reload()},
          error: (err) => {
            console.log(err);
          }
        })}
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
