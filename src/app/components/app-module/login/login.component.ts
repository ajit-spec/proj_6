import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";
import {Service3Service} from "../../../services/service3.service";
import {Router} from "@angular/router";
import {Service4Service} from "../../../services/service4.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service2: Service2Service,
    public service3: Service3Service,
    public router: Router,
    public service4: Service4Service
  ) {
  }

  form = this.formbuilder.group(
    {
      email: [
        '',
        Validators.compose(
          [
            Validators.required,
            this.service1.validateemail
          ]
        )
      ],
      password: [
        '',
        Validators.compose(
          [
            Validators.required
          ]
        )
      ]
    }
  )

  ngOnInit(): void {
  }

  getformcontrol(): any {
    return this.form.controls
  }

  geterrormsgforemail(): any {
    const email = this.getformcontrol().email
    if (email.hasError('required')) {
      return 'Email is req';
    } else if (email.hasError('notvalidemail')) {
      return 'Pls enter valid email'
    }
  }

  geterrormsgforpassword(): any {
    const password = this.getformcontrol().password
    if (password.hasError('required')) {
      return 'Password is req';
    }
  }

  onsubmit(): void {
    const request = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    if (this.form.invalid) {
      return;
    }

    this.service2.login(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)

      setTimeout(() => {
        this.service4.storetoken(value.token)
        this.router.navigate(['/', 'blogs'])
      }, 4000)
    }, error => {
      console.log(error)
      this.service3.openSnackBar(error.error.msg)

    })

  }

}
