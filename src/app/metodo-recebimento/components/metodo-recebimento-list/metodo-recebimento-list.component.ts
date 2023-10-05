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
import {TabSelectionService} from "../../../shared/services/tab-selection.service";

@Component({
  selector: 'app-metodo-recebimento-list',
  templateUrl: './metodo-recebimento-list.component.html',
  styleUrls: ['./metodo-recebimento-list.component.css']
})
export class MetodoRecebimentoListComponent {
  asyncTabs: Observable<string[]>;
  isEdicao: boolean = false;

  constructor(
    private tabSelectionService: TabSelectionService,
    private activatedRoute: ActivatedRoute
              ) {
    this.asyncTabs = new Observable((observer: Observer<string[]>) => {
      setTimeout(() => {
        observer.next([
          'Boleto',
          'Pix'
        ]);
      }, 1000);
    });

    this.isEdicao = this.activatedRoute.snapshot.data['isEdicao'];
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  getSelectedTabIndex(): number {
    return this.tabSelectionService.getSelectedTabIndex();
  }

  onTabChange(event: any): void {
    // Atualiza o valor de selectedTabIndex com o índice da nova aba selecionada
    this.tabSelectionService.setSelectedTabIndex(event.index);
  }
}
