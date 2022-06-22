import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";


//routes, pretty much define for what URLs what components will be presented

//array of JS objects
const paths: Routes = [
    { path: '', component: PostListComponent }, //empty path means root page 
    { path: 'create', component: PostCreateComponent } // on path localhost/create
];

@NgModule({
    imports: [RouterModule.forRoot(paths)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
