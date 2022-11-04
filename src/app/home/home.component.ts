import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadedPosts = [];
  isFetching: boolean;
  error = null;
  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
    this.postService.error.subscribe((error) => {
      this.isFetching = false;
      this.error = error;
    });
  }

  onCreatePost(postData: Post) {
    this.postService.postAndStoreData(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
    this.postService.error.subscribe((error) => {
      this.isFetching = false;
      this.error = error;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  handleError() {
    this.error = null;
    this.isFetching = false;
  }

}
