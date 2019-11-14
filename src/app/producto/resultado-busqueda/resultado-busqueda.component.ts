import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuscaProductosService } from '../../servicios/busca-productos.service';

// Importamos los componentes para trabajar con las rutas
 

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {
  
  public str_busqueda:string;
  public tipo_busqueda:string;
  public productos:any;
  public cargando:boolean;
  constructor( private rutaActiva: ActivatedRoute, public bps:BuscaProductosService) 
  {     
    this.tipo_busqueda=  rutaActiva.snapshot.params.tipo_busqueda;
    this.str_busqueda=  rutaActiva.snapshot.params.param_1;

  }

  ngOnInit() {
      this.cargando=true;
      //buscamos los productos que coincidan con los parametros
      this.fn_busca_productos();
  }
  fn_busca_productos()
  {
    this.bps.busca_productos(this.tipo_busqueda,this.str_busqueda)
		.subscribe(
			data=>
			{
        
        this.productos=data;
        this.cargando=false;
			}
		);
  }

}
