import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { DireccionEnvioTemporalService } from '../servicios/direccion-envio-temporal.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { GuardaVentaService } from '../servicios/guarda-venta.service';
import { Router } from '@angular/router';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
import {FormsModule} from '@angular/forms'
declare let paypal:any;
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var OpenPay:any;
declare var $:any;

import { environment} from '../../environments/environment';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.css']
})
export class FormaPagoComponent implements OnInit {


  public payPalConfig?: IPayPalConfig;
  public showSuccess:boolean;
  public showCancel:boolean;
  public showError2:boolean;
  public subtotal_aux:number=0;
    public subtotal:number=0;
    public iva_aux:number=0;
    public iva:number=0;
    public envio:number=0;
    public total_aux:number=0;
    public total:number=0;
    public muestra_tiket:boolean;
    public muestra_error:boolean;
    public msj_error:string;
    public folio_compra:string;
    public total_pagar:number;
    public productos:any;
    public costo_envio:number;
    public mostrar_msj_aviso_1:boolean;
    mostrar_msj_aviso:boolean;
   public cargando:boolean;
public mostrar_conf_pedido:boolean;
public amount:number;
public muestra_error_general:boolean;
public holder_name:string="";
  constructor(private car_service:CarritoComprasService,private r: Router,private gvs:GuardaVentaService,private det:DireccionEnvioTemporalService) { }

	ngOnInit() {	

   this.total_pagar=0.00; 
   this.amount=0.00;
        window.scrollTo(0,0);
      this.cargando=true;
       this.fn_consulta_total_costo();
        this.muestra_tiket=false;
        this.muestra_error=false;
        this.mostrar_msj_aviso_1=false;
        this.msj_error="";
        this.folio_compra="0";
        this.mostrar_conf_pedido=false;
		
        //this.initConfig();    
  
  }

  fn_ocultar_form_pago()
  {
    this.mostrar_msj_aviso_1=!this.mostrar_msj_aviso_1;
  }

  fn_guarda_venta()
  {
	  this.cargando=true;
	  this.gvs.fn_inserta_venta()
	  .subscribe(
		  data=>{
        console.log(data);
			this.cargando=false;
			  if(data[0].estatus=="0")
			  {
          this.muestra_error=true;
          this.msj_error=data[0].msj;
         
          setInterval(()=>{this.fn_oculta_msj_temporal()},4000);
			  }
			  else
			  {
          
          this.folio_compra=data[0].folio;
          this.mostrar_conf_pedido=true;
          
			  }
		  }
	  );
  }
  fn_oculta_msj_temporal()
	{
		
		this.muestra_error=false;			
		this.msj_error="";
		clearInterval();
	}
  fn_pago_tarjeta()
  {
    this.mostrar_msj_aviso_1=true;
  }
  fn_ocultar_msj_1()
  {
    this.mostrar_msj_aviso_1=false;
  }
  fn_ocultar_msj()
  {
    this.mostrar_msj_aviso=false;
  }
  fn_consulta_total_costo()
  {
    this.total_pagar=0.00;
    this.car_service.consultaCarrito()
      .subscribe(data=>{
          this.productos=data;
          var x=0;
          for(x=0;x<this.productos.length;x++)
          {
              this.total_pagar=this.total_pagar+parseFloat(this.productos[x].precio);
          }
          if(this.total_pagar==0.00)
          {
            this.r.navigate(["/home"]);
          }
          if(this.total_pagar<800)
          {
            this.total_pagar=this.total_pagar+100;
            this.costo_envio=100;
          }
          else
          {
            this.costo_envio=0;
          }
          this.amount= this.total_pagar;
          console.log("entro");
          this.cargando=false;
      }
      );
  }


 


  fn_regresar()
  {    
    this.r.navigate(['/confirma-informacion']);
  }

}
