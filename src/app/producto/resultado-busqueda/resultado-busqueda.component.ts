import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuscaProductosService } from '../../servicios/busca-productos.service';
import {PasoParamBuscarService} from '../../servicios/paso-param-buscar.service';
// Importamos los componentes para trabajar con las rutas
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {
  
  public prod_x_pagina:number;//es la cantidad de productos que pondremos por pagina.
  public str_busqueda:string;
  public tipo_busqueda:string;
  public productos:any;
  public cargando:boolean;
  public muestra_msj_no_prod:boolean;
  public cont_producto:number;
  public cont_paginas:number;
  public cont_pag_arr:any;
  public data_aux:any;
  public inicial:number;
  public final:number;
  public pag_actual:string;

  constructor( private rutaActiva: ActivatedRoute, public bps:BuscaProductosService,private param_buscar:PasoParamBuscarService) 
  {     
    this.tipo_busqueda=  rutaActiva.snapshot.params.tipo_busqueda;
    this.str_busqueda=  rutaActiva.snapshot.params.param_1;
  }

  ngOnInit() {
    this.prod_x_pagina=10;
    this.inicial=1;
    this.final=this.prod_x_pagina;
   
    this.param_buscar.change.subscribe(
      obj => { 

        this.data_aux=obj.productos;
        this.productos=obj.productos; 
        this.muestra_msj_no_prod=obj.muestra_msj_no_prod;

        this.cont_producto=this.productos.length;
        this.fn_paginacion();
        this.inicial=1;
        this.final=this.prod_x_pagina;
         this.fn_cambia_pagina("1");
         this.fn_bloque_productos();

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
          this.data_aux=data;
          this.muestra_msj_no_prod=false;            
          this.productos=data;

          //este valor hay que hacerlo dinamico
          this.cont_producto=data.length;

		      this.fn_paginacion();

          this.fn_cambia_pagina("1");
          this.fn_bloque_productos();
         
          
        }
        this.cargando=false;
			}
		);
    this.fn_paginacion();
  }

  fn_bloque_productos()
  {
      this.productos=[];

      var cont=1;
       //obtenemos el primer bloque de productos
      for(let x =0;x<this.data_aux.length;x++)
      {
          if((x+1)>=this.inicial && (x+1)<=this.final)
          {

            this.productos.push({"descuento":this.data_aux[x].nombre,"precio_antes":this.data_aux[x].precio_antes,"id":this.data_aux[x].id,'str_id':this.data_aux[x].str_id,"nombre":this.data_aux[x].nombre,"precio":this.data_aux[x].precio,'muestra_descuento':this.data_aux[x].muestra_descuento});

          }
      }
      window.scrollTo(0,0);
  }

  fn_cambia_pagina(no_pag:string)
  {
    this.final=parseInt(no_pag)*this.prod_x_pagina;
    this.inicial=this.final-(this.prod_x_pagina-1);

    //quitamos el estatus de marcado a la pagina acutual y removemos de la anterior.
    $("#"+this.pag_actual).removeClass("active");
    this.pag_actual="pag_"+no_pag;
    $("#"+this.pag_actual).addClass("active");

    this.fn_bloque_productos();
  }

  fn_paginacion()
  {

      this.cont_paginas=(parseInt(((this.cont_producto/this.prod_x_pagina)+0.9).toString()));//lo dividimos entre 10 ya que la pagina es de 10 productos.
      //numero de paginas

      this.cont_pag_arr=[];
      let res = [];
      for (let i = 0; i < this.cont_paginas; i++) {
        this.cont_pag_arr.push(i+1);
      }
      

  }

}

