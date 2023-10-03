import {Component} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-metodo-recebimento-form',
  templateUrl: './metodo-recebimento-form.component.html',
  styleUrls: ['./metodo-recebimento-form.component.css']
})
export class MetodoRecebimentoFormComponent {
  asyncTabs: Observable<string[]>;

  constructor(private formBuilder: FormBuilder,
              private router: Router
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
}
