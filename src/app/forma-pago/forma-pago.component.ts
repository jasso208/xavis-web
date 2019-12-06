import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { DireccionEnvioTemporalService } from '../servicios/direccion-envio-temporal.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { GuardaVentaService } from '../servicios/guarda-venta.service';
import { Router } from '@angular/router';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
import {FormsModule} from '@angular/forms'
declare let paypal:any;

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

   public cargando:boolean;

public amount:number;
  constructor(private car_service:CarritoComprasService,private r: Router,private gvs:GuardaVentaService,private det:DireccionEnvioTemporalService) { }

	ngOnInit() {	
   this.total_pagar=0.00; 
   this.amount=0.00;
        window.scrollTo(0,0);
      this.cargando=true;
       this.fn_consulta_total_costo();
        this.muestra_tiket=false;
        this.muestra_error=false;
        this.msj_error="";
        this.folio_compra="0";
        
        //this.initConfig();    
  
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


  fn_guarda_venta()
  {
    
    this.cargando=true;
	  this.gvs.fn_inserta_venta()
	  .subscribe
	  (
      data=>
      {			
          if (data[0].estatus=="1")
          {					
            this.muestra_tiket=true;            
            this.muestra_error=false;
            this.folio_compra=data[0].folio;
          }   
          else
          {            
            this.muestra_tiket=false;
            this.muestra_error=true;
            this.msj_error=data[0].msj;
          }   
          
        this.cargando=false;  
      }
	  );
  }


  /*
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'MXN',
    clientId: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',    
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      
      payer: {
        payment_method: 'paypal'
      },

      input_fields: {
        no_shipping: '1',
        address_override:'1'
      },

      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'MXN',
                value: '9.99',
              },
            }
          ]
        }
      ]
    }
    ,

    advanced: {
      commit: 'true'
    },
    style: {
      color:  'blue',
      shape:  'pill',
      label:  'pay'
    }
    ,

    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  }
 
  ;
  }
*/

  fn_regresar()
  {    
    this.r.navigate(['/confirma-informacion']);
  }

}
