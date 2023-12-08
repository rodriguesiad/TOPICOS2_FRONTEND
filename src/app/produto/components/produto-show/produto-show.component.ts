import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProdutoService} from "../../../services/produto.service";
import {RacaService} from "../../../services/raca.service";
import {EspecieService} from "../../../services/especie.service";
import {CategoriaService} from "../../../services/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Produto} from "../../../models/produto.model";

type Card = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  urlImagem: string;
  peso: string;
  especie: string;
  raca: string;
  categoria: string;
}

type CardRecomendacao = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-produto-show',
  templateUrl: './produto-show.component.html',
  styleUrls: ['./produto-show.component.css']
})
export class ProdutoShowComponent implements OnInit {
  cards = signal<CardRecomendacao[]>([]);
  card: any = null;
  produtos: Produto[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private produtoService: ProdutoService) {

    const produto: Produto = this.activatedRoute.snapshot.data['produto'];

    this.card = {
      id: produto.id,
      titulo: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      peso: produto.peso,
      especie: produto.especie.nome,
      raca: produto.raca.nome,
      categoria: produto.categoria.nome,
      urlImagem: this.produtoService.getUrlImagem(produto.nomeImagem)
    };
  }

  ngOnInit(): void {
    const produto: Produto = this.activatedRoute.snapshot.data['produto'];

    this.produtoService.getRecomendacoes(produto.raca.id, produto.categoria.id, produto.especie.id).subscribe(data => {
      this.produtos = data;
      this.carregarCards();
    });
  }

  showProduto(id: number) {
    this.router.navigateByUrl('/produtos/show/'+id);
  }

  carregarCards() {
    const cards: CardRecomendacao[] = [];
    this.produtos.forEach(produto => {
      cards.push({
        id: produto.id,
        titulo: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        urlImagem: this.produtoService.getUrlImagem(produto.nomeImagem)
      });
    });
    this.cards.set(cards);
  }
}
