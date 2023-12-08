import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/compra.model';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.css']
})
export class CompraListComponent implements OnInit{
  compras: Compra[] = [];
  totalRegistros = 0;
  size = 5;
  page = 0

  constructor(private service: CompraService) {
  }

  ngOnInit(): void {
      this.service.findAllPaginado(this.page, this.size).subscribe(data => {
        this.compras = data;
      })
  }

}
