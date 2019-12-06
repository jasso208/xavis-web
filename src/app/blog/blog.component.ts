import { Component, OnInit } from '@angular/core';
import {BlogService} from './../servicios/blog.service';
import { ActivatedRoute,Params} from  '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public id_blog:string;
  public blog:any;
  constructor(private ruta_activa:ActivatedRoute,private bd:BlogService) { }

  ngOnInit() {
    
    this.id_blog=this.ruta_activa.snapshot.params.id_blog;
    console.log(this.id_blog);
    this.fn_consulta_detalle_blog();
  }

  fn_consulta_detalle_blog()
  {
      this.bd.fn_detalle_producto(this.id_blog)
      .subscribe(
        data=>
        {
          console.log(data);
           this.blog=data[0].contenido
           console.log(this.blog);
        }
      );
  }

}
