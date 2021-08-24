import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PostModel} from "../../../models/post.model";
import {Service4Service} from "../../../services/service4.service";
import {Router} from "@angular/router";
import {Service5Service} from "../../../services/service5.service";
import {Service3Service} from "../../../services/service3.service";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  constructor(
    public service4: Service4Service,
    public router: Router,
    public service5: Service5Service,
    public service3: Service3Service
  ) {
  }

  @Input('post') post: PostModel | undefined;
  @Output('updatedposts') updatedposts = new EventEmitter()

  ngOnInit(): void {
  }

  editblog(): void {
    this.router.navigate(['/', 'blogs', 'add-blog'], {queryParams: {blog_id: this.post?._id}, fragment: 'edit'})
  }

  deleteblog(): void {

    this.service5.deleteblog({jwt_token: this.service4.gettoken()}, this.post?._id).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      this.updatedposts.emit()

    }, error => {
      console.log(error)
    })

  }

}
