import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Especie } from 'src/app/models/especie.model';
import { Produto } from 'src/app/models/produto.model';
import { Raca } from 'src/app/models/raca.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EspecieService } from 'src/app/services/especie.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RacaService } from 'src/app/services/raca.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
  formGroup: FormGroup;
  racas: Raca[] = [];
  categorias: Categoria[] = [];
  especies: Especie[] = [];
  produtoTeste: Produto;

  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private racaService: RacaService,
    private especieService: EspecieService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.produtoTeste = this.activatedRoute.snapshot.data['produto'];

    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null],
      peso: [null],
      porteAnimal: [null],
      estoque: [null],
      raca: [null],
      categoria: [null],
      especie: [null],
    })
  }
  ngOnInit(): void {
    this.racaService.findAll().subscribe(data => {
      this.racas = data;
      this.initializeForm();
    });

    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
      this.initializeForm();
    });

    this.especieService.getAll().subscribe(data => {
      this.especies = data;
      this.initializeForm();
    });
  }

  initializeForm() {

    const produto: Produto = this.activatedRoute.snapshot.data['produto'];
    const raca = this.racas.find(raca => raca.id === (produto?.raca?.id || null));
    const categoria = this.categorias.find(categoria => categoria.id === (produto?.categoria?.id || null));
    const especie = this.especies.find(especie => especie.id === (produto?.especie?.id || null));

    if (produto && produto.nomeImagem) {
      this.imagePreview = this.produtoService.getUrlImagem(produto.nomeImagem);
      this.fileName = produto.nomeImagem;
    }

    this.formGroup = this.formBuilder.group({
      id: [(produto && produto.id) ? produto.id : null],
      nome: [(produto && produto.nome) ? produto.nome : '', Validators.required],
      descricao: [(produto && produto.descricao) ? produto.descricao : '', Validators.required],
      preco: [(produto && produto.preco) ? produto.preco : Validators.required],
      estoque: [(produto && produto.estoque) ? produto.estoque : Validators.required],
      peso: [(produto && produto.peso) ? produto.peso : Validators.required],
      raca: [raca],
      porteAnimal: [(produto && produto.porteAnimal) ? produto.porteAnimal : Validators.required],
      categoria: [categoria],
      especie: [especie],
      ativo: [(produto && produto.ativo) ? produto.ativo : true]
    })

  }

  salvar() {
    if (this.formGroup.valid) {
      const produto = this.formGroup.value;
      if (produto.id == null) {
        this.produtoService.save(produto).subscribe({
          next: (produtoCadastrado) => {
            this.uploadImage(produtoCadastrado.id);
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.produtoService.update(produto).subscribe({
          next: (produtoAtualizado) => {
            this.uploadImage(produtoAtualizado.id);
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    const produto = this.formGroup.value;
    if (produto.id != null) {
      this.produtoService.delete(produto).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/produtos/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private uploadImage(produtoId: number) {
    if (this.selectedFile) {
      this.produtoService.uploadImagem(produtoId, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('produtos/list');
          },
          error: err => {
            console.log('Erro ao cadastrar imagem.' + JSON.stringify(err));
          }
        })
    } else {
      this.router.navigateByUrl('produtos/list');
    }
  }

}

