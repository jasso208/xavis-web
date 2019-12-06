import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:Http) { }

  fn_detalle_producto(id_blog:string)
  {
    return this.http.get(environment.api_url+'blog/detalle_blog/',
		  {
			params:
			{
				"id_blog":id_blog
			}
		  }
	  )
	  .pipe(map((res:Response)=>res.json()));
  }
}
