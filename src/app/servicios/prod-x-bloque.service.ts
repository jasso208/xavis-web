import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdXBloqueService {

	constructor(private http: Http) { }

  getProductos () 
	{
		
	  return this.http.get(environment.api_url+'inventario/busca_prod_x_bloque/',
			{
				
			}
		)
		.pipe(map((res:Response)=>res.json()))
		
  }
  
}
