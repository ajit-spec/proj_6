import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class Service5Service {

  // API_URL = 'https://peaceful-beyond-72901.herokuapp.com'
  API_URL = 'https://sptnaaevrz.herokuapp.com'

  constructor(
    public http: HttpClient
  ) {
  }

  allposts: PostModel[] = []

  getallposts(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/get_post`,
      data
    )
  }


  addblog(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/add_post`,
      data
    )
  }

  editblog(data: any, id: string): Observable<any> {
    return this.http.put(
      `${this.API_URL}/edit_post/${id}`,
      data
    )
  }

  getsingleposts(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/get_single_post`,
      data
    )
  }

  deleteblog(data: any,id: string): Observable<any> {
    return this.http.post(
      `${this.API_URL}/delete_post/${id}`,
      data
    )
  }

}
