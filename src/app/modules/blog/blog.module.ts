import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogsComponent} from '../../components/blog-module/blogs/blogs.component';
import {BlogCardComponent} from "../../components/blog-module/blog-card/blog-card.component";
import {SharedModule} from "../shared/shared.module";
import { AddBlogComponent } from '../../components/blog-module/add-blog/add-blog.component';


@NgModule({
  declarations: [
    BlogsComponent,
    BlogCardComponent,
    AddBlogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule {
}
