import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class Service3Service {

  constructor(
    public snackbar: MatSnackBar
  ) { }

  openSnackBar(msg: string) {
    this.snackbar.open(msg, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }

}
