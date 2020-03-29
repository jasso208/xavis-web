import { Injectable,Output,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PasoParamBuscarService {

	productos:object;
	muestra_msj_no_prod:boolean;
	@Output () change:EventEmitter<object>=new EventEmitter();

	constructor() 
	{ 

	}

	fn_buscar(productos:any,muestra_msj_no_prod:boolean)
	{
		this.productos=productos;
		this.muestra_msj_no_prod=muestra_msj_no_prod;
		this.change.emit({'productos':this.productos,'muestra_msj_no_prod':this.muestra_msj_no_prod});
	}

}
