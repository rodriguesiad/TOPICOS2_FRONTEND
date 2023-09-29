import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Raca } from 'src/app/models/raca.model';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-raca-form',
  templateUrl: './raca-form.component.html',
  styleUrls: ['./raca-form.component.css']
})
export class RacaFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private racaService: RacaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const raca: Raca = this.activatedRoute.snapshot.data['raca'];

    this.formGroup = formBuilder.group({
      id: [(raca && raca.id) ? raca.id : null],
      nome: [(raca && raca.nome) ? raca.nome : '', Validators.required],
      ativo: [(raca && raca.ativo) ? raca.ativo : null]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const raca = this.formGroup.value;
      if (raca.id == null) {
        this.racaService.save(raca).subscribe({
          next: (racaCadastrada) => {
            this.router.navigateByUrl('/racas/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.racaService.update(raca).subscribe({
          next: (racaCadastrada) => {
            this.router.navigateByUrl('/racas/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    const raca = this.formGroup.value;
    if (raca.id != null) {
      this.racaService.delete(raca).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/racas/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

}