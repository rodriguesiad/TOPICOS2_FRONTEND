import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/models/endereco.model';
import { ItemCarrinho } from 'src/app/models/item-carrinho.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CompraService } from 'src/app/services/compra.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinhoItens: ItemCarrinho[] = [];
  enderecoCompraForm: FormGroup;
  total: number = 0;
  quantidadeTotal: number = 0;
  usuarioLogado: Usuario | undefined;
  enderecoSelecionado: Endereco | null = null;
  metodoPagamentoSelecionado: number | null = null;
  primeiroEnderecoPrincipal: Endereco | undefined;

  constructor(private carrinhoService: CarrinhoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private compraService: CompraService,
    private usuarioService: UsuarioService,
    private notifierService: NotifierService) {
    this.enderecoCompraForm = this.formBuilder.group({
      logradouro: [''],
      numero: [null],
      complemento: [''],
      cep: [''],
      bairro: [''],
      idMunicipio: [null]
    })

    this.usuarioService.getPerfilUsuario().subscribe(data => {
      this.usuarioLogado = data;

      this.primeiroEnderecoPrincipal = this.usuarioLogado?.enderecos.find(endereco => endereco.principal);

      if (this.enderecoSelecionado === null && this.primeiroEnderecoPrincipal) {
        this.enderecoSelecionado = this.primeiroEnderecoPrincipal;
      }
    });
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
      this.total = this.calcularTotal();
      this.quantidadeTotal = this.calcularTotalItens();
    });
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }

  calcularTotalItens(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade, 0);
  }

  atualizarTotal(): void {
    this.total = this.calcularTotal();
    this.quantidadeTotal = this.calcularTotalItens();
  }

  selecionarEndereco(): void {
    if (this.enderecoSelecionado) {
      console.log(this.enderecoSelecionado)
      this.enderecoCompraForm.patchValue({
        logradouro: this.enderecoSelecionado.logradouro || '',
        numero: this.enderecoSelecionado.numero || '',
        complemento: this.enderecoSelecionado.complemento || '',
        cep: this.enderecoSelecionado.cep || '',
        bairro: this.enderecoSelecionado.bairro || '',
        idMunicipio: this.enderecoSelecionado.municipio.id || null
      });
    }
  }

  finalizarCompra(): void {
    if (this.enderecoSelecionado && this.metodoPagamentoSelecionado && this.carrinhoItens.length > 0) {
      this.selecionarEndereco();
      if (this.enderecoCompraForm.valid) {
        const enderecoCompra = this.enderecoCompraForm.value;

        this.compraService.save(this.carrinhoItens, enderecoCompra).subscribe({
          next: (compraCadastrada) => {
            if (this.metodoPagamentoSelecionado == 1) {
              this.pagarPorPix(compraCadastrada.id);
            } else if (this.metodoPagamentoSelecionado == 2) {
              this.pagarPorBoleto(compraCadastrada.id);
            }
          }
        })
      }

    } else {
      if (!this.enderecoSelecionado) { this.notifierService.showNotification("Escolha pelo menos 1 endereço!", 'warn'); }
      if (!this.metodoPagamentoSelecionado) { this.notifierService.showNotification("Escolha pelo menos 1 método de pagamento!", 'warn'); }
      if (this.carrinhoItens.length <= 0) { this.notifierService.showNotification("O carrinho está vazio!", 'warn'); }
    }
  }

  pagarPorBoleto(idCompra: number) {
    this.compraService.pagarPorBoleto(idCompra).subscribe({
      next: () => {
        this.notifierService.showNotification('Compra realizada com sucesso!', 'success');
        this.carrinhoService.removerTudo();
      },
      error: err => {
        this.notifierService.showNotification('Erro ao realizar pagamento por boleto!', 'error');
        console.log('Erro realizar pagamento por boleto.' + JSON.stringify(err));
      }
    })
  }

  pagarPorPix(idCompra: number) {
    this.compraService.pagarPorPix(idCompra).subscribe({
      next: () => {
        this.notifierService.showNotification('Compra Realizada com sucesso!', 'success');
        this.carrinhoService.removerTudo();
      },
      error: err => {
        this.notifierService.showNotification('Erro ao realizar pagamento por pix!', 'error');
        console.log('Erro realizar pagamento por pix.' + JSON.stringify(err));
      }
    })
  }

}
