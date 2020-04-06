import { Component, OnInit } from '@angular/core';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
import {CuentaProdBolsaService} from '../servicios/cuenta-prod-bolsa.service';
import { Router } from '@angular/router';
import { DireccionEnvioTemporalService } from '../servicios/direccion-envio-temporal.service';
import { GeneraCuponService } from '../servicios/genera-cupon.service';

import { ValidaCupon } from './validacupon';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})

export class CarritoComprasComponent implements OnInit {
  public muestra_error_valida_cupon:boolean;
  public agregar_cupon:boolean;
  public show_error_email:boolean;
  public form:ValidaCupon;
  public productos:any;
  public msj_error:string;
  public msj_exito:string;
  public mostrar_msj_exito:boolean;
  public muestra_error:boolean;
  public costo_envio:number;
  public subtotal:number;
  public cargando:boolean;
  public cls_boton:string;
  public muestra_msj_no_prod:boolean;
  public muestra_form_email:boolean;
  public desc_x_p:number;
  public total_pagar:number;
  public muestra_btn_agregar_cupon:boolean;
  constructor(private gcs:GeneraCuponService,private car_service:CarritoComprasService,private cont_prod_carrito:CuentaProdBolsaService,private det:DireccionEnvioTemporalService,private router:Router) 
  { 
      this.form=new ValidaCupon("","");
  }

  ngOnInit() {
    this.muestra_error_valida_cupon=false;
    this.msj_error="El folio no coincide con el correo electrónico capturado.";
    window.scrollTo(0,0);
    this.desc_x_p=0.00;
    this.fn_reinicia_styles();
    this.fn_consulta_carrito();
    this.cargando=true;
    this.muestra_msj_no_prod=true;

    //si esta variable es si, quiere decir que ya capturo un cupon valido.
    if(localStorage.getItem("cupon_valido")=="SI")
    {
      this.muestra_btn_agregar_cupon=false;  
    }
    else
    {
      this.muestra_btn_agregar_cupon=true;
    }
    

    this.form.email="";
    this.msj_error="El folio no coincide con el correo electrónico capturado.";
    this.det.fn_direccion_envio_temporal_get()
    .subscribe(
        data =>
        {
    
          if(data[0].estatus=="0")
          {
            this.muestra_form_email=true;        
          }
          else
          {
            this.muestra_form_email=false;
          }
        }
     );

    this.show_error_email=false;
    this.agregar_cupon=false;

  }
    
  fn_valida_cupon()
  {
       this.muestra_error_valida_cupon=false;
      this.cargando=true;
      this.gcs.fn_valida_cupon(this.form.email,this.form.folio)
      .subscribe(
          data=>
          {
            if (data[0].estatus=="0")
            {
              this.msj_error=data[0].msj;
              this.muestra_error_valida_cupon=true;
            }
            else
            {
                this.desc_x_p=150.00;
                this.total_pagar=this.subtotal-this.desc_x_p;
                this.mostrar_msj_exito=true;
                this.msj_exito="Obtuviste un descuento por $150.00.";

                this.muestra_btn_agregar_cupon=false;
                //nos ayuda a identificar que ya se aplico un cupon.
                localStorage.setItem("cupon_valido","SI");
                this.agregar_cupon=false;
                setInterval(()=>
                    {
                        this.mostrar_msj_exito=false;
                        clearInterval();
                        


                    },
                    4000);
            }
            this.cargando=false;
          }
        );
  }

  fn_muestra_valida_cupon()
  {
    this.agregar_cupon=true;
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

    this.subtotal=0.00;
    this.car_service.consultaCarrito()
      .subscribe(data=>{
        if (data[0].carrito.length>0)
        {
          if (data[1].cupon!=0)
          {
            this.desc_x_p=150.00;
          }

          this.productos=data[0].carrito;
          var x=0;
          for(x=0;x<this.productos.length;x++)
          {
              this.subtotal=this.subtotal+parseFloat(this.productos[x].precio);
          }
          if(this.subtotal<500)
          {
            this.subtotal=this.subtotal+100;
            this.costo_envio=100;
          }
          else
          {
            this.costo_envio=0;
          }

           //desc_x_p: descuento por cupon.
          this.total_pagar=this.subtotal-this.desc_x_p;
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
              }
            ) ;

        }
        this.cargando=false;
        setInterval(()=>{this.fn_reinicia_styles()},4000);
      }
    );
  }
}
