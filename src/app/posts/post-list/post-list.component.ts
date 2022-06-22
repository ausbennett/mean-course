import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from "../post.model"; //import the Post type
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  //we'll use angular directives, to output this in a template forloop
  // posts = [
  //   {title: 'First Post', content: 'some conent for 1'},
  //   {title: 'Second Post', content: 'some conent for 2'},
  //   {title: 'Thirst Post', content: 'some conent for 3'}
  // ];

  posts: Post[] = []; //make this property binded to the app.component.ts, from the outside (parent)
  private postsSub: Subscription | undefined;

  //this will create an instance of this service
  constructor(public postsService: PostsService) {}

  //automatically called when this component is created

  //figure out whats going on here
  ngOnInit(): void {
    this.postsService.getPosts(); //initial fetch

    //continuous updating
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postsToRecieve: Post[])=> {
      this.posts = postsToRecieve;
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId); //send request to backend delete  
  }

  ngOnDestroy(): void {
      this.postsSub?.unsubscribe(); //prevents mem leaks when object doesn't exist
  }
}
