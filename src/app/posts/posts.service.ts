//this service handles storing the post data, avoid event binding

/* ANGULAR NOTES: Obervables

  Observables are basically a way of handling async ops
    - angular uses these "observables" to handle HTTP method calls
      - http.get('/api') :: returns an observable object

    - subscribing to the observable is important as thats how the observer acc recieves the info

*/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Subject } from "rxjs"; //type of observable, that allows values to be sent to many observers (like an eventEmitter)
import { map } from 'rxjs/operators'

import { Post } from "./post.model";

@Injectable({providedIn: 'root'}) //provides this service on the root level findable for ng, (can also instead just add this class to providers in app.module)
export class PostsService {

    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    
    //inject the HttpClinet class
    constructor(private http: HttpClient) {}

    getPosts() {
        this.http
          .get<{ message: string; posts: any[] }>(
            "http://localhost:3000/api/posts"
          )
          //transform data for front end use
          .pipe(map((postData) => {
            return postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id
              };
            });
          }))
          //send the data to the call
          .subscribe(transformedPosts => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
          });
      }
   
    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string){
        const post: Post = {id: "", title: title, content: content};
        this.http
            .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
            .subscribe(resData => {
                //from the app.post "save.then()" method, we pass info about the db created post id in the http response to assign to our frontend id post
                const id = resData.postId;
                post.id = id; //we overwrite the id

                //we will only push to local if we actually have a successfult res from server by putting the below in this method
                this.posts.push(post); //update posts
                this.postsUpdated.next([...this.posts]); //send a fresh copy of the lists of posts
            });
    }    

    deletePost(postId: string){
      this.http.delete("http://localhost:3000/api/posts/" + postId)
        .subscribe( () => { //need to subscribe inorder to recieve a response
          // uses the js filter method on posts[], uses a function that if true keeps if false filters
          const updatedPosts = this.posts.filter( post => post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts])
        });
    }
}
