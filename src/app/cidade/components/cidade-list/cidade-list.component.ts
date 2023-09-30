import { Component } from '@angular/core';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css']
})
export class CidadeListComponent {

  tableColumns: string[] = ['id-column', 'nome-column', 'estado-column', 'actions-column'];
  cidades: Cidade[] = [];

  constructor(private cidadeService: CidadeService) {}

  ngOnInit(): void {
    this.cidadeService.findAll().subscribe(data => {
      this.cidades = data;
    });
  }
}
