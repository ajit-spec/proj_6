import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor() {
  }

  validateemail(control: AbstractControl): ValidationErrors | null {
    const email = control.value
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (
      !(regex.test(email))
    ) {
      return (
        {
          notvalidemail: true
        }
      )
    }

    return null

  }

  validatepassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

    if (
      !(regex.test(password))
    ) {
      return (
        {
          notvalidpassword: true
        }
      )
    }

    return null

  }

}
