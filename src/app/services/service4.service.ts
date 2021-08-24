import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service4Service {

  loggedinuser = null

  constructor() {

    if (this.isauthenticated()) {
      this.loggedinuser = this.getcurrentuser().name
    }

  }

  storetoken(token: string): void {
    localStorage.setItem('jwt_token', JSON.stringify(token))
  }

  isauthenticated(): boolean {
    return localStorage.getItem('jwt_token') !== null
  }

  gettoken(): any {
    if (this.isauthenticated()) {
      return JSON.parse(localStorage.getItem('jwt_token')!)
    }
  }

  getcurrentuser(): any {

    return JSON.parse(
      atob(
        this.gettoken().split('.')[1]
      )
    )


  }

}
