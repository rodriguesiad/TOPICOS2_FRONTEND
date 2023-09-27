import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'sigla-column'];
  estados: Estado[] = [];

  constructor(private estadoService: EstadoService) {}

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    });
  }

}
