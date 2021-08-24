import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service2Service} from "../../../services/service2.service";
import {Service3Service} from "../../../services/service3.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service2: Service2Service,
    public service3: Service3Service,
    public activatedroute: ActivatedRoute,
    public router: Router
  ) {
  }

  form = this.formbuilder.group(
    {
      old_password: [
        '',
        Validators.compose(
          [
            Validators.required
          ]
        )
      ],
      password: [
        '',
        Validators.compose(
          [
            Validators.required,
            this.service1.validatepassword
          ]
        )
      ],
      confirm_password: [
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

  geterrormsgforold_password(): any {
    const old_password = this.getformcontrol().old_password
    if (old_password.hasError('required')) {
      return 'Old Password is req';
    }
  }

  geterrormsgforpassword(): any {
    const password = this.getformcontrol().password
    if (password.hasError('required')) {
      return 'Password is req';
    } else if (password.hasError('notvalidpassword')) {
      return 'Password must be atleast 8 characters long and must contain uppercase, lowercase, digit, and special characters'
    }
  }

  geterrormsgforconfirm_password(): any {
    const confirm_password = this.getformcontrol().confirm_password
    if (confirm_password.hasError('required')) {
      return 'Confirm Password is req';
    } else if (confirm_password.hasError('passwordnotmatch')) {
      return 'Password does not match'
    }
  }

  checkpasswordmatch(): void {
    const password = this.form.get('password')?.value;
    const confirm_password = this.form.get('confirm_password')?.value

    if (password !== confirm_password) {
      this.getformcontrol().confirm_password.setErrors({'passwordnotmatch': true});
    }
  }

  onsubmit(): void {

    console.log(this.form)

    const request = {
      old_password: this.form.get('old_password')?.value,
      password: this.form.get('password')?.value,
      confirm_password: this.form.get('confirm_password')?.value,
    }

    if (this.form.invalid) {
      return;
    }

    this.service2.change_password(request).subscribe(value => {
      console.log(value)
      if (value.status === 1) {
        this.service3.openSnackBar(value.msg)
        setTimeout(() => {
          this.router.navigate(['/', 'blogs'])
        }, 4000)
      }
    }, error => {
      console.log(error)
      const error_object = error.error.errors[0]
      const error_msg = (Object.values(error_object)[0]) as string
      this.service3.openSnackBar(error_msg)

    })


  }

  ngOnDestroy(): void {
    this.service3.snackbar.dismiss()
  }


}
