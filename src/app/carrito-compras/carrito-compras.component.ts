import { Component, OnInit } from '@angular/core';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
import {CuentaProdBolsaService} from '../servicios/cuenta-prod-bolsa.service';
@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})

export class CarritoComprasComponent implements OnInit {

  public productos:any;
  public msj_error:string;
  public msj_exito:string;
  public mostrar_msj_exito:boolean;
  public muestra_error:boolean;
  public costo_envio:number;
  public total_pagar:number;
  public cargando:boolean;
  public cls_boton:string;
  public muestra_msj_no_prod:boolean;
  constructor(private car_service:CarritoComprasService,private cont_prod_carrito:CuentaProdBolsaService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.fn_reinicia_styles();
    this.fn_consulta_carrito();
    this.cargando=true;
    this.muestra_msj_no_prod=true;
  }

  public fn_reinicia_styles()
  {
    this.msj_error="";
    this.msj_exito="";
    this.mostrar_msj_exito=false;
    this.muestra_error=false;
  }
  public fn_consulta_carrito()
  {

    this.total_pagar=0.00;
    this.car_service.consultaCarrito()
      .subscribe(data=>{
        if (data.length>0)
        {
          this.productos=data;
          var x=0;
          for(x=0;x<this.productos.length;x++)
          {
              this.total_pagar=this.total_pagar+parseFloat(this.productos[x].precio);
          }
          if(this.total_pagar<500)
          {
            this.total_pagar=this.total_pagar+100;
            this.costo_envio=100;
          }
          else
          {
            this.costo_envio=0;
          }
          this.muestra_msj_no_prod=false;
        }
        else
        {
          this.muestra_msj_no_prod=true;
        }
         
         
          this.cargando=false;
      }
      );

  }

  public eliminaProductoCarrito(id:string)
  {
    this.cargando=true;
    this.fn_reinicia_styles();
    this.car_service.eliminaProductoCarrito(id)
    .subscribe(
      data=>{
        
        if(data[0].estatus==0)
        {
          this.muestra_error=true;
          //this.msj=data[0].msj;
          this.msj_error=data[0].msj;
        }
        else
        {
          this.mostrar_msj_exito=true;
          this.msj_exito="Se elimino correctamente.";
          this.fn_consulta_carrito();
          this.cont_prod_carrito.fn_cont_prod_carrito()
            .subscribe(
              data=>
              {
                this.cont_prod_carrito.fn_establece_cont(data[0].cantidad__sum);
                //this.c_c.fn_actualiza_cantidad_carrito(data[0].cantidad__sum);
              }
            ) ;

        }
        this.cargando=false;
        setInterval(()=>{this.fn_reinicia_styles()},4000);
      }
    );
	//this.mostrar=false;
  }
}
