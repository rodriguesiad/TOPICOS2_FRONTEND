import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Raca } from 'src/app/models/raca.model';
import { RacaService } from 'src/app/services/raca.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-raca-form',
  templateUrl: './raca-form.component.html',
  styleUrls: ['./raca-form.component.css']
})
export class RacaFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;

  constructor(private formBuilder: FormBuilder,
    private racaService: RacaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService) {

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
            this.notifierService.showNotification('Raça cadastrada com sucesso!', 'success');
            this.router.navigateByUrl('/racas/list');
          },
          error: (errorResponse) => {
            this.apiResponse = errorResponse.error;

            const formControls = ['nome'];
            formControls.forEach(controlName => {
              this.formGroup.get(controlName)?.setErrors(null);
            });

            if (this.apiResponse && this.apiResponse.errors) {
              this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
                const fieldName = error.fieldName;
                const errorMessage = error.message;

                if (formControls.includes(fieldName)) {
                  this.formGroup.get(fieldName)?.setErrors({ apiError: errorMessage });
                }
              });
            }
            this.notifierService.showNotification('Erro ao incluir raça!', 'error');
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.racaService.update(raca).subscribe({
          next: (racaCadastrada) => {
            this.notifierService.showNotification('Raça alterada com sucesso!', 'success');
            this.router.navigateByUrl('/racas/list');
          },
          error: (errorResponse) => {
            this.apiResponse = errorResponse.error;

            const formControls = ['nome'];
            formControls.forEach(controlName => {
              this.formGroup.get(controlName)?.setErrors(null);
            });

            if (this.apiResponse && this.apiResponse.errors) {
              this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
                const fieldName = error.fieldName;
                const errorMessage = error.message;

                if (formControls.includes(fieldName)) {
                  this.formGroup.get(fieldName)?.setErrors({ apiError: errorMessage });
                }
              });
            }

            this.notifierService.showNotification('Erro ao alterar raça!', 'error');
            console.log('Erro ao alterar' + JSON.stringify(errorResponse));
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

  getErrorMessage(fieldName: string): string {
    if (this.apiResponse && this.apiResponse.errors) {
      const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
      return error ? error.message : '';
    } else {
      return '';
    }
  }

}