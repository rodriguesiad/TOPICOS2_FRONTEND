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
  apiResponse: any = null;


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
          
            console.log('Erro ao incluir' + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.especieService.update(especie).subscribe({
          next: (especieCadastrada) => {
            this.router.navigateByUrl('/especies/list');
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
          
            console.log('Erro ao alterar' + JSON.stringify(errorResponse));
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

  getErrorMessage(fieldName: string): string {
    if (this.apiResponse && this.apiResponse.errors) {
      const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
      return error ? error.message : '';
    } else {
      return '';
    }
  }

}
