import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuscaProductosService } from '../../servicios/busca-productos.service';
import {PasoParamBuscarService} from '../../servicios/paso-param-buscar.service';
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
  public muestra_msj_no_prod:boolean;
  constructor( private rutaActiva: ActivatedRoute, public bps:BuscaProductosService,private param_buscar:PasoParamBuscarService) 
  {     
    this.tipo_busqueda=  rutaActiva.snapshot.params.tipo_busqueda;
    this.str_busqueda=  rutaActiva.snapshot.params.param_1;

  }

  ngOnInit() {
    this.param_buscar.change.subscribe(
      obj => { 
        this.productos=obj.productos; 
        this.muestra_msj_no_prod=obj.muestra_msj_no_prod;
      });
    this.muestra_msj_no_prod=true;
    window.scrollTo(0,0);
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
        if (data.length>0)
        {
          this.muestra_msj_no_prod=false;            
          this.productos=data;
		  
          
        }
        this.cargando=false;
			}
		);
  }

}
