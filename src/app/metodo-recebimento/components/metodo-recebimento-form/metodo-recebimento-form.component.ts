import {Component} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TabSelectionService} from "../../../shared/services/tab-selection.service";

@Component({
  selector: 'app-metodo-recebimento-form',
  templateUrl: './metodo-recebimento-form.component.html',
  styleUrls: ['./metodo-recebimento-form.component.css']
})
export class MetodoRecebimentoFormComponent {
  asyncTabs: Observable<string[]>;
  isEdicao: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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

  getSelectedTabIndex(): number {
    return this.tabSelectionService.getSelectedTabIndex();
  }

  onTabChange(event: any): void {
    // Atualiza o valor de selectedTabIndex com o índice da nova aba selecionada
    this.tabSelectionService.setSelectedTabIndex(event.index);
  }
}
