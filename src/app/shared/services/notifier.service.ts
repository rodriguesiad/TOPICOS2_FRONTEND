import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifierComponent } from "../components/notifier/notifier.component";

@Injectable({
    providedIn: 'root'
})
export class NotifierService {

    constructor(private snackBar: MatSnackBar) { }

    showNotification(displayMessage: string, messageType: 'error' | 'success' | 'warn') {
        this.snackBar.openFromComponent(NotifierComponent, {
            data: {
                message: displayMessage,
                type: messageType
            },
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: messageType
        });
    }

}