import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  error = new Subject<string>();

  postAndStoreData(post: Post) {
    const postData = { title: post.title, content: post.content };
    this.http
      .post(
        'https://master-http-requests-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://master-http-requests-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'hello' }),
          params: new HttpParams().set('print', 'pretty'),
        }
      )
      .pipe(
        map((data) => {
          const array: Post[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              array.push({ ...data[key], id: key });
            }
          }
          return array;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
  deletePosts() {
    return this.http
      .delete(
        'https://master-http-requests-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        { observe: 'events' }
      )
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
