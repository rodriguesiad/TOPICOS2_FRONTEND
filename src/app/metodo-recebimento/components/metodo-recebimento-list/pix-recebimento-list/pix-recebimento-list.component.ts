import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PixRecebimento} from "../../../../models/pix-recebimento.model";
import {BoletoRecebimento} from "../../../../models/boleto-recebimento.model";
import {PixRecebimentoService} from "../../../../services/pix-recebimento.service";
import {BoletoRecebimentoService} from "../../../../services/boleto-recebimento.service";
import {Observable, Observer} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-pix-recebimento-list',
  templateUrl: './pix-recebimento-list.component.html',
  styleUrls: ['./pix-recebimento-list.component.css']
})
export class PixRecebimentoListComponent implements OnInit, AfterViewInit  {
  tableColumns: string[] = ['tipo-column', 'chave-column', 'actions-column'];
  metodosPix: PixRecebimento[] = [];

  constructor(private pixService: PixRecebimentoService) {
  }

  ngOnInit(): void {
    this.pixService.getByInativo().subscribe(data => {
      this.metodosPix = data;
    });
  }

  dataSource = new MatTableDataSource<PixRecebimento>(this.metodosPix);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
