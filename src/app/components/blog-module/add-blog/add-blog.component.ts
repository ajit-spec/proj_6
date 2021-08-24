import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service3Service} from "../../../services/service3.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Service5Service} from "../../../services/service5.service";
import {Service4Service} from "../../../services/service4.service";
import {PostModel} from "../../../models/post.model";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {


  constructor(
    public formbuilder: FormBuilder,
    public router: Router,
    public service5: Service5Service,
    public service3: Service3Service,
    public service4: Service4Service,
    public activatedroute: ActivatedRoute
  ) {
  }

  form = this.formbuilder.group(
    {
      title: [
        '',
        Validators.compose(
          [
            Validators.required
          ]
        )
      ],
      description: [
        '',
        Validators.compose(
          [
            Validators.required
          ]
        )
      ]
    }
  )

  isedit = false
  blog: PostModel | undefined

  ngOnInit(): void {

    this.activatedroute.queryParams.subscribe(value => {
      console.log(value)
      if (value.blog_id) {
        this.isedit = true

        this.service5.getsingleposts({blog_id: value.blog_id, jwt_token: this.service4.gettoken()}).subscribe(value1 => {
          this.blog = value1.post
          console.log(this.blog)

          this.form.patchValue(
            {
              title: this.blog?.title,
              description: this.blog?.description
            }
          )
        })

      }
    }, error => {
      console.log(error)
    })

  }

  getformcontrol(): any {
    return this.form.controls
  }

  geterrormsgfortitle(): any {
    const title = this.getformcontrol().title
    if (title.hasError('required')) {
      return 'title is req';
    }
  }

  geterrormsgfordescription(): any {
    const description = this.getformcontrol().description
    if (description.hasError('required')) {
      return 'description is req';
    }
  }

  onsubmit(): void {

    console.log(this.form)

    const request = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      jwt_token: this.service4.gettoken()
    }

    if (this.form.invalid) {
      return;
    }

    if (this.isedit) {
      this.service5.editblog(request, this.blog?._id).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        setTimeout(() => {
          this.router.navigate(['/', 'blogs'])
        }, 4000)
      }, error => {
        console.log(error)
      })
    } else {
      this.service5.addblog(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        setTimeout(() => {
          this.router.navigate(['/', 'blogs'])
        }, 4000)
      }, error => {
        console.log(error)
      })
    }


  }


}
