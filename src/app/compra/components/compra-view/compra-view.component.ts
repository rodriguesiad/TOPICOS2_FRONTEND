import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/models/compra.model';
import { StatusCompra } from 'src/app/models/status-compra.model';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-compra-view',
  templateUrl: './compra-view.component.html',
  styleUrls: ['./compra-view.component.css']
})
export class CompraViewComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;
  compra: Compra;
  statusCompra: StatusCompra[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private compraService: CompraService) {
    this.compra = this.activatedRoute.snapshot.data['compra'];
    console.log(this.compra)
  }

  ngOnInit(): void {
    this.compraService.findStatusCompra().subscribe(data => {
      this.statusCompra = data;
    })
  }

  ngAfterViewInit() {
    if (this.compra && this.compra.statusCompra && this.compra.statusCompra.id) {
      const statusId = this.compra.statusCompra.id;

      this.stepper._steps.forEach((step, index) => {
        const statusPasso = this.statusCompra[index];

        step.label = statusPasso.label;
        step.completed = statusPasso.id <= statusId;

        if (step.completed) {
          this.stepper.selectedIndex = index;
        }
      });
    }
  }

}
