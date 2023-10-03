import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../../models/boleto-recebimento.model";
import {BoletoRecebimentoService} from "../../../../services/boleto-recebimento.service";
import {Observable, Observer} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-boleto-recebimento-list',
  templateUrl: './boleto-recebimento-list.component.html',
  styleUrls: ['./boleto-recebimento-list.component.css']
})
export class BoletoRecebimentoListComponent implements OnInit, AfterViewInit {
  tableColumns: string[] = ['nome-column', 'cnpj-column', 'banco-column', 'agencia-column', 'conta-column', 'actions-column'];
  metodosBoleto: BoletoRecebimento[] = [];

  constructor(private boletoService: BoletoRecebimentoService) {
  }

  ngOnInit(): void {
    this.boletoService.getByInativo().subscribe(data => {
      this.metodosBoleto = data;
    });
  }

  dataSource = new MatTableDataSource<BoletoRecebimento>(this.metodosBoleto);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
