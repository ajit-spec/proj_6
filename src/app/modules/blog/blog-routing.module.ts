import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogsComponent} from "../../components/blog-module/blogs/blogs.component";
import {AddBlogComponent} from "../../components/blog-module/add-blog/add-blog.component";

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent
  },
  {
    path: 'add-blog',
    component: AddBlogComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
