import {Component, OnInit} from '@angular/core';
import {Service5Service} from "../../../services/service5.service";
import {Service4Service} from "../../../services/service4.service";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(
    public service5: Service5Service,
    public service4: Service4Service
  ) {
  }

  ngOnInit(): void {

    this.getallpost()
  }

  getallpost(): void {

    const request = {
      jwt_token: this.service4.gettoken()
    }

    this.service5.getallposts(request).subscribe(value => {
      console.log(value)
      this.service5.allposts = value.posts
    }, error => {
      console.log(error)
    })
  }

}
