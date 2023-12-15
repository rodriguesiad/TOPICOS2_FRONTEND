import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DadosPessoais} from "../../../models/dados-pessoais.model";
import {Telefone} from "../../../models/telefone.model";
import {UsuarioService} from "../../../services/usuario.service";
import {DatePipe} from "@angular/common";
import {UsuarioLogadoService} from "../../../services/usuario-logado.service";
import {NotifierService} from "../../../shared/services/notifier.service";
import {MatDialog} from "@angular/material/dialog";
import {AlterarSenhaComponent} from "../alterar-senha/alterar-senha.component";

@Component({
  selector: 'app-informacoes-pessoais',
  templateUrl: './informacoes-pessoais.component.html',
  styleUrls: ['./informacoes-pessoais.component.css']
})
export class InformacoesPessoaisComponent implements OnInit {
  apiResponse: any = null;
  informacoesPessoais: FormGroup;
  isEdicao: boolean = false;
  maxDate = new Date();
  minTelefones: boolean = false;

  constructor(private usuarioLogadoService: UsuarioLogadoService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notifierService: NotifierService,
              public dialog: MatDialog
  ) {
    const dadosPessoais: DadosPessoais = this.activatedRoute.snapshot.data['dadosPessoais'];

    this.informacoesPessoais = formBuilder.group({
      id: [(dadosPessoais && dadosPessoais.id) ? dadosPessoais.id : null],
      nome: [(dadosPessoais && dadosPessoais.nome) ? dadosPessoais.nome : '', Validators.required],
      email: [(dadosPessoais && dadosPessoais.email) ? dadosPessoais.email : '', Validators.required],
      cpf: [(dadosPessoais && dadosPessoais.cpf) ? dadosPessoais.cpf : '', Validators.required],
      dataNascimento: [(dadosPessoais && dadosPessoais.dataNascimento) ? dadosPessoais.dataNascimento : '', Validators.required],
      telefones: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    const dadosPessoais: DadosPessoais = this.activatedRoute.snapshot.data['dadosPessoais'];

    if (dadosPessoais) {
      if (dadosPessoais && dadosPessoais.telefones && dadosPessoais.telefones.length > 0) {
        dadosPessoais.telefones.forEach((telefone: Telefone) => {
          const newFormGroup = this.formBuilder.group({
            codigoArea: [telefone.codigoArea, Validators.required],
            numero: [telefone.numero, Validators.required]
          });

          this.telefones.push(newFormGroup);
        });

        this.minTelefones = true;
      }
    }

    this.isEdicao = this.activatedRoute.snapshot.data['isEdicao'];

    if (!this.isEdicao) {
      this.desabilitarEdicao();
    }
  }

  get telefones(): FormArray {
    return this.informacoesPessoais.get('telefones') as FormArray;
  }

  adicionarTelefone(): void {
    this.minTelefones = true;

    this.telefones.push(
      this.formBuilder.group({
        codigoArea: ['', Validators.required],
        numero: ['', Validators.required],
      })
    );
  }

  removerTelefone(index: number): void {
    this.telefones.removeAt(index);
    this.minTelefones = this.telefones.length > 0;
  }

  habilitarEdicao() {
    this.isEdicao = true;

    const nomeControl = this.informacoesPessoais.get('nome');
    if (nomeControl instanceof FormControl) {
      nomeControl.enable();
    }

    const emailControl = this.informacoesPessoais.get('email');
    if (emailControl instanceof FormControl) {
      emailControl.enable();
    }

    const cpfControl = this.informacoesPessoais.get('cpf');
    if (cpfControl instanceof FormControl) {
      cpfControl.enable();
    }

    const dataNascimentoControl = this.informacoesPessoais.get('dataNascimento');
    if (dataNascimentoControl instanceof FormControl) {
      dataNascimentoControl.enable();
    }
  }

  desabilitarEdicao() {
    this.isEdicao = false;
    this.informacoesPessoais.controls['nome'].disable();
    this.informacoesPessoais.controls['email'].disable();
    this.informacoesPessoais.controls['cpf'].disable();
    this.informacoesPessoais.controls['dataNascimento'].disable();
  }

  salvar() {
    if (this.informacoesPessoais.valid && this.minTelefones) {
      const dadosEditados = this.informacoesPessoais.value;

      const dataFormatada = new DatePipe('pt-BR').transform(dadosEditados.dataNascimento, 'yyyy-MM-dd');
      dadosEditados.dataNascimento = dataFormatada;

      this.usuarioLogadoService.setDadosPessoais(dadosEditados).subscribe({
        next: () => {
          this.notifierService.showNotification('Dados pessoais alterados com sucesso!', 'success');
          this.desabilitarEdicao();
          this.router.navigateByUrl('/admin/perfil/view');
        },
        error: (errorResponse) => {
          this.apiResponse = errorResponse.error;

          const formControls = ['nome', 'email', 'cpf', 'dataNascimento'];
          formControls.forEach(controlName => {
            this.informacoesPessoais.get(controlName)?.setErrors(null);
          });

          if (this.apiResponse && this.apiResponse.errors) {
            this.apiResponse.errors.forEach((error: { fieldName: any; message: any; }) => {
              const fieldName = error.fieldName;
              const errorMessage = error.message;

              if (formControls.includes(fieldName)) {
                this.informacoesPessoais.get(fieldName)?.setErrors({apiError: errorMessage});
              }
            });
          }
          this.notifierService.showNotification('Erro ao alterar dados pessoais!', 'error');
          console.log('Erro ao alterar' + JSON.stringify(errorResponse));
        }
      });
    }
  }

  abrirModalAlterarSenha(): void {
    const dialogRef = this.dialog.open(AlterarSenhaComponent, {
      width: '550px',
      height: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal foi fechado', result);
    });
  }

}
