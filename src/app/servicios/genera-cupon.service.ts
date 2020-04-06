import { Injectable } from '@angular/core';
import { Http,Response,URLSearchParams } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneraCuponService {

  constructor(private http:Http) { }

  fn_genera_cupon(email:string)
  {
  	let urlSearchParams = new URLSearchParams();

  	urlSearchParams.append("email",email);
  	return this.http.post(
		 environment.api_url+'ventas/genera_cupon/',urlSearchParams
		 ).pipe(

			 map(
	        (res:Response)=>res.json()
	      )
		 );
  }
  fn_valida_cupon(email:string,folio:string)
  {
    return this.http.get(environment.api_url+'ventas/genera_cupon/',
        {
          params:
          {
            email:email,
            folio:folio,
            session:localStorage.getItem("session")
          }
        }
      ).pipe(map((res:Response)=>res.json()));
  }
}
