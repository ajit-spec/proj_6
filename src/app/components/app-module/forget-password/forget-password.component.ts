import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";
import {Service3Service} from "../../../services/service3.service";
import {MatDialog} from "@angular/material/dialog";
import {Service4Service} from "../../../services/service4.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service2: Service2Service,
    public service3: Service3Service,
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

  onsubmit(): void {
    const request = {
      email: this.form.get('email')?.value
    }

    if (this.form.invalid) {
      return;
    }


    this.service2.forget_password(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
    }, error => {
      console.log(error)
      this.service3.openSnackBar(error.error.msg)

    })

  }


}
