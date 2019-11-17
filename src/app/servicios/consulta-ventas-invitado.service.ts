import { Injectable,Output,EventEmitter } from '@angular/core';
import { Http,Response} from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConsultaVentasInvitadoService {

  constructor(private http:Http) { }

  //el token que recibe, esta vinculado sobre un email
  //eseemail esta vinculado a un usuario
  //y es de ese usuario del que traira la informacion
  fn_consulta_ventas_invitado(token:string)
  {
    return this.http.get(environment.api_url+'get_ventas_invitados/',
    {
        params:{
          'token':token          
        }
    }
  )
  .pipe(map((res:Response)=>res.json()));
  

  }

  
  public fn_consulta_detalle_ventas(id_venta:string)
  {
	  return this.http.get(environment.api_url+'ventas/consulta_detalle_venta/',
		{
			params:{
				"id_venta":id_venta
			}
		})
		.pipe(
			map(
				(res:Response)=>res.json()
				)
		);
	  
	  
	  
  }
  
}
