import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
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
  isAuthenticated:boolean;
  constructor(
    private postService: PostService,private authService:AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(
      (user)=>{
        console.log(`user: ${user}`);
        this.isAuthenticated=!!user;
      }
    )

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

  logout(){
    this.authService.onLogout();
  }

}
