import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Service4Service} from "./service4.service";
import {Service3Service} from "./service3.service";

@Injectable({
  providedIn: 'root'
})
export class Service2Service {

  // API_URL = 'https://peaceful-beyond-72901.herokuapp.com'
  API_URL = 'https://sptnaaevrz.herokuapp.com'

  constructor(
    public http: HttpClient,
    public router: Router,
    public service4: Service4Service,
    public service3: Service3Service
  ) {
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/register`,
      data
    )
  }

  //
  // verifyotp(data: any): Observable<any> {
  //   return this.http.post(
  //     `${this.API_URL}/verify_otp`,
  //     data
  //   )
  // }
  //
  // resendotp(data: any): Observable<any> {
  //   return this.http.post(
  //     `${this.API_URL}/resend_otp`,
  //     data
  //   )
  // }

  login(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/login`,
      data
    )
  }

  forget_password(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/forget_password`,
      data
    )
  }

  reset_password(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/reset_password`,
      data
    )
  }

  change_password(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/change_password`,
      data
    )
  }


  logout(): void {
    localStorage.removeItem('jwt_token')
    this.router.navigate(['/', 'login'])

  }

}
