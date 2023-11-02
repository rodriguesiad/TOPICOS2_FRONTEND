import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especie } from 'src/app/models/especie.model';
import { EspecieService } from 'src/app/services/especie.service';

@Component({
  selector: 'app-especie-form',
  templateUrl: './especie-form.component.html',
  styleUrls: ['./especie-form.component.css']
})
export class EspecieFormComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private especieService: EspecieService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const especie: Especie = this.activatedRoute.snapshot.data['especie'];

    this.formGroup = formBuilder.group({
      id:[(especie && especie.id) ? especie.id : null],
      nome:[(especie && especie.nome) ? especie.nome : '', Validators.required],
      ativo:[(especie && especie.ativo) ? especie.ativo : null]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const especie = this.formGroup.value;
      if (especie.id == null) {
        this.especieService.save(especie).subscribe({
          next: (especieCadastrada) => {
            this.router.navigateByUrl('/especies/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
        }
      });
      } else {
        this.especieService.update(especie).subscribe({
          next: (especieCadastrada) => {
            this.router.navigateByUrl('/especies/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });        
      }
    }
  }

  excluir() {
    const especie = this.formGroup.value;
    if (especie.id != null) {
      this.especieService.delete(especie).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/especies/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }      
  }

}
