import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { DireccionEnvioTemporalService } from '../servicios/direccion-envio-temporal.service';
import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
import { GuardaVentaService } from '../servicios/guarda-venta.service';
import { Router } from '@angular/router';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
declare let paypal:any;


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
    paypalLoad: boolean = true;
    addScript: boolean = false; 
    finalAmount: number = 1;
   public cargando:boolean;
    paypalConfig = {
      env: 'sandbox',
      client: {
        sandbox: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',
        production: '<your-production-key here>'
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: this.total_pagar, currency: 'MXN' } }
            ]
          }
        });
      },
      onAuthorize: (data, actions) => {
        return actions.payment.execute().then((payment) => {
          this.fn_guarda_venta();
        })
      },
      onError:()=>
      {
        this.muestra_tiket=false;
        this.muestra_error=true;
        this.msj_error="Error al hacer su pago en el servidor de Paypal";
        setInterval(()=>{this.muestra_error=false;clearInterval()},4000);
      }
    };
  constructor(private car_service:CarritoComprasService,private r: Router,private gvs:GuardaVentaService,private det:DireccionEnvioTemporalService) { }
	ngOnInit() {	
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
          this.cargando=false;
      }
      );
  }
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
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

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
  });
  }
  
private initConfig(): void {
      this.payPalConfig = {
      currency: 'MXN',
      clientId: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: String(this.total),
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: String(this.total)
                }
              }
            }/*,
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
            ]*/
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
		      this.fn_guarda_venta();
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
        this.muestra_tiket=false;
        this.muestra_error=true;
        this.msj_error="Error al hacer su pago en el servidor de Paypal";
        setInterval(()=>{this.muestra_error=false;clearInterval()},4000);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
    }
  private initConfig2(): void {
        this.payPalConfig = {
            currency: 'MXN',
            clientId: 'AVmPl8bP0hjmhtBoFRLzB95lAuPqrAqW51MrEYmPqMJfzgdPdeF32jh_2MDeRFBLzhwsMyFwJI-3HBLt',
            createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'MXN',
                        value: String(this.total),
                        breakdown: {
                            item_total: {
                                currency_code: 'MXN',
                                value: String(this.subtotal)
                            }
                        }
                    }/*,
                    items: [{
                        name: 'Un Producto',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'MXN',
                            value: this.subtotal,
                        },
                    }]*/
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
					this.fn_guarda_venta();
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.showCancel = true;

            },
            onError: err => {
                console.log('OnError', err);
                this.showError2 = true;
            },
            onClick: () => {
                console.log('onClick');
                this.showSuccess = false;
				 this.showCancel = false;
				  this.showError2 = false;
            },
        };
    }
	
	

  fn_regresar()
  {    
    this.r.navigate(['/confirma-informacion']);
  }

}
