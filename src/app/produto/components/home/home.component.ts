import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { Produto } from "../../../models/produto.model";
import { ProdutoService } from "../../../services/produto.service";

type Card = {
  id: number,
  titulo: string;
  descricao: string;
  preco: number;
  raca: string,
  categoria: string,
  especie: string,
  porte: number,
  peso: number,
  estoque: number,
  urlImagem: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  cards = signal<Card[]>([]);
  produtos: Produto[] = [];
  filtro: string = "";
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Produto>(this.produtos);

  constructor(private produtoService: ProdutoService,
    private notifierService: NotifierService,
    private carrinhoService: CarrinhoService) {
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarTotalRegistros();
    this.carregarCards();
  }

  carregarProdutos() {
    if (this.filtro) {
      this.produtoService.findByCampoBusca(this.filtro, true, this.pagina, this.pageSize)
        .subscribe(data => {
          this.produtos = data;
        });
    } else {
      this.produtoService.getAll(this.pagina, this.pageSize).subscribe(data => {
        this.produtos = data;
        this.carregarCards();
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.produtoService.countByCampoBusca(this.filtro, true)
        .subscribe(data => {
          this.totalRegistros = data;
        })
    } else {
      this.produtoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  carregarCards() {
    const cards: Card[] = [];
    this.produtos.forEach(produto => {
      cards.push({
        id: produto.id,
        titulo: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        raca: produto.raca.nome,
        categoria: produto.categoria.nome,
        especie: produto.especie.nome,
        porte: produto.porteAnimal,
        peso: produto.peso,
        estoque: produto.estoque,
        urlImagem: this.produtoService.getUrlImagem(produto.nomeImagem)
      });
    });
    this.cards.set(cards);
  }

  aplicarFiltro() {
    this.ngOnInit();
  }

  limparFiltro() {
    this.filtro = '';
    this.aplicarFiltro();
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.aplicarFiltro();
    }
  }

  adicionarAoCarrinho(card: Card) {
    this.carrinhoService.adicionar({
      id: card.id,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
      raca: card.raca,
      categoria: card.categoria,
      especie: card.especie,
      porte: card.porte,
      peso: card.peso,
      estoque: card.estoque,
      urlImagem: card.urlImagem,
    })

    this.notifierService.showNotification('Produto adicionado ao carrinho!', 'success');
  }

}
