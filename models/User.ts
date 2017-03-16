
import { REMOTE_METHOD_TYPE, RemoteMethod, RemoteProperty, RemoteClass } from "libs/ro/RemoteObjectDecorators";

// import {Table, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
// import {Post} from "./Post";


export class User {

     id: number;

     name: string;
    
}


// import {Table, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
// import {Post} from "./Post";


// @Table()
// export class User {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;
    
//     @OneToMany ( type=>Post, post=>post.author)
//     posts: Post[];
    
// }