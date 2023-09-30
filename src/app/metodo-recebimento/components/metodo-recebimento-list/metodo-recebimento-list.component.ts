import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Categoria} from "../../../models/categoria.model";
import {CategoriaService} from "../../../services/categoria.service";
import {BoletoRecebimento} from "../../../models/boleto-recebimento.model";
import {PixRecebimento} from "../../../models/pix-recebimento.model";
import {PixRecebimentoService} from "../../../services/pix-recebimento.service";
import {BoletoRecebimentoService} from "../../../services/boleto-recebimento.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Observer} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-metodo-recebimento-list',
  templateUrl: './metodo-recebimento-list.component.html',
  styleUrls: ['./metodo-recebimento-list.component.css']
})
export class MetodoRecebimentoListComponent implements OnInit, AfterViewInit {
  asyncTabs: Observable<string[]>;
  tableColumnsPix: string[] = ['tipo-column', 'chave-column', 'actions-column'];
  tableColumnsBoleto: string[] = ['nome-column', 'cnpj-column', 'banco-column', 'agencia-column', 'conta-column', 'actions-column'];
  metodosPix: PixRecebimento[] = [];
  metodosBoleto: BoletoRecebimento[] = [];

  constructor(
    private pixService: PixRecebimentoService,
    private boletoService: BoletoRecebimentoService
              ) {
    this.asyncTabs = new Observable((observer: Observer<string[]>) => {
      setTimeout(() => {
        observer.next([
          'Boleto',
          'Pix'
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
    this.pixService.getByInativo().subscribe(data => {
      this.metodosPix = data;
    });

    this.boletoService.getByInativo().subscribe(data => {
      this.metodosBoleto = data;
    });
  }

  dataSourcePix = new MatTableDataSource<PixRecebimento>(this.metodosPix);
  dataSourceBoleto = new MatTableDataSource<BoletoRecebimento>(this.metodosBoleto);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSourcePix.paginator = this.paginator;
      this.dataSourceBoleto.paginator = this.paginator;
    }
  }
}
