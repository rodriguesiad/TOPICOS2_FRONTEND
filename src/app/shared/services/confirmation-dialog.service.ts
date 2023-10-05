import { Injectable } from '@angular/core';
import {ConfirmationDialogComponent} from "../components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(title: string, message: string, confirmAction?: () => void): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: "600px",
      height: "270px",
      data: { title, message, confirmAction},
    });
  }
}
