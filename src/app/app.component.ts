import { Component,HostListener } from '@angular/core';
import { CuentaProdBolsaService } from './servicios/cuenta-prod-bolsa.service';
import {SessionService} from './servicios/session.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PasoParamBuscarService } from './servicios/paso-param-buscar.service';
import { BuscaProductosService } from './servicios/busca-productos.service';
import { GeneraCuponService } from './servicios/genera-cupon.service';
import { CarritoComprasService }  from './servicios/carrito-compras.service';
declare var jQuery:any;
declare var $:any;
import { FormMail } from './form-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public msj_respuesta:string;
  public muestra_form_cupon:boolean;
  public form_mail: FormMail;
public cargando:boolean;
public msj_error:string;
public muestra_msj_no_prod:boolean;
  title = 'JassDel.com';
  public productos:any;
  public mostrar_menu:boolean;
  public mostrar_menu_navegacion:boolean;
  public mostrar_form_buscar:boolean;
  public txt_buscar:string;
  public cont_prod:string;
  public muestra_menu_jassdel:boolean;
  public muestra_menu_politicas:boolean;
  public muestra_menu_ayuda:boolean;
  public muestra_menu_dama:boolean;
  public muestra_menu_dama_bolsos:boolean;
  public muestra_menu_dama_ropa:boolean;
  public muestra_menu_dama_ocacion:boolean;
  public muestra_form_buscar:boolean;
  public muestra_menu_ropa:boolean;
  public muestra_menu_dama_calzado:boolean;
  public muestra_menu_dama_accesorios:boolean;
  public muestra_menu_caballero:boolean;
  public muestra_menu_ropa_cab:boolean;
  public muestra_menu_calzado_cab:boolean;
  public muestra_cupon:boolean;
  public show_error_email:boolean;
  public email:string;
  public _MS_PER_DAY:number;
  constructor(private ruta_actual:ActivatedRoute,private cont_prod_carrito:CuentaProdBolsaService,private session:SessionService, private router: Router,private buscar_ser:PasoParamBuscarService,public bps:BuscaProductosService,public gcp:GeneraCuponService,public ccs:CarritoComprasService)
  {
     this.form_mail=new FormMail(""); 
     console.log(this.router.url);
     this._MS_PER_DAY= 1000 * 60 * 60 * 24;
  }
  fn_reload()
  {
    window.location.reload();
  }
  fn_mas_tiempo_carrito()
  {
    var d = new Date();
               var mes=(d.getMonth()+1).toString();
               var day=d.getDate().toString();
               var hora=d.getHours().toString();
               var min=d.getMinutes().toString();
               var seg=d.getSeconds().toString();

               if((d.getMonth()+1)<10)
               {
                 mes='0'+(d.getMonth()+1).toString(); 
               }

               if(d.getDate()<10)
               {
                 day='0'+(d.getDate()).toString(); 
               }

               if(d.getHours()<10)
               {
                 hora='0'+(d.getHours()).toString(); 
               }


              
               if(d.getMinutes()<10)
               {
                 min='0'+(d.getMinutes()).toString(); 
               }

               if(d.getSeconds()<10)
               {
                 seg='0'+(d.getSeconds()).toString(); 
               }
               var strDate = d.getFullYear() + "-" + mes + "-" + day + "T" + hora + ":" + min + ":" + seg;

               localStorage.setItem("hora_actual",strDate);

               //este servicios es para poner la hora actual en el carrito-compras
               //para que los productos no sean liberados en el proceso automatico.
               $(".cls_msj_carrito_x_caducar").hide();
               this.ccs.fn_reinicia_tiempo_carrito()
               .subscribe(
                   data=>
                   {

                   }
                 );

  }
  ngOnInit()
  {    
   

      this.form_mail.email="";
      this.muestra_form_cupon=true;
      this.show_error_email=false;
      //if (sessionStorage.getItem("muestra_cupon")!="NO")
      //{
      //  this.muestra_cupon=true;  
      //}      
      this.fn_reinicia_style();   
      //esta funcion ejecuta el algoritmo para generar la session, solo en caso de que no exista
      this.session.setSession();

      this.cont_prod_carrito.change.subscribe(cont_prod=>{
      this.cont_prod=cont_prod;
      this.cargando=false;

      //este se habilita hasta que se habilite el pago con tarjeta.
      this.muestra_cupon=false;  
    });

    this.cont_prod_carrito.fn_cont_prod_carrito()
				.subscribe(
					data=>
					{
						this.cont_prod=data[0].cantidad__sum;
					}
				) ;
  }

 dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
}

fn_email_valido(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }

fn_obten_cupon()
{
  if(this.form_mail.email=="")
  {
      this.msj_error="El correo electronico es requerido.";
      this.show_error_email=true;
      return 0;
  }
  

  if (!this.fn_email_valido(this.form_mail.email))
  {
     this.msj_error="Debe ingresar un email valido.";
     this.show_error_email=true;
     return 0;
  }

this.cargando=true;
  //gcp es el objeto del servicio
  this.gcp.fn_genera_cupon(this.form_mail.email)
  .subscribe(
    data=>
    {
        this.cargando=false;
        this.muestra_form_cupon=!this.muestra_form_cupon;
        this.msj_respuesta=data[0].msj;

    }
    );
}

  public fn_cerrar_cupon()
  {
    this.muestra_cupon=!this.muestra_cupon;
    sessionStorage.setItem("muestra_cupon","NO");
  }

 public fn_muestra_menu_navegacion()
  {
    
    this.mostrar_menu=false;
    this.mostrar_menu_navegacion=!this.mostrar_menu_navegacion;    
    this.mostrar_form_buscar=false;
    
  }

  fn_oculta_menu(evento)
  {
    this.mostrar_menu_navegacion=evento.mostrar;
  }

  fn_buscar_2(vbuscar)
  {
      if (vbuscar.productos.length>0)
        {           
          this.muestra_msj_no_prod=false;            
        }
        else
        {
          this.muestra_msj_no_prod=true;            
        }

   this.mostrar_menu_navegacion=vbuscar.mostrar;

   this.buscar_ser.fn_buscar(vbuscar.productos,this.muestra_msj_no_prod);
   
  }

  fn_buscar()
  {    

    this.buscar();
    this.router.navigate(['/resultado_busqueda',2,this.txt_buscar]);
  }

  @HostListener('buscar')
  buscar()
  {
    this.muestra_msj_no_prod=true;
   this.bps.busca_productos("2",this.txt_buscar)
    .subscribe(
      data=>
      {


        if (data.length>0)
        {           
          this.muestra_msj_no_prod=false;            
        }
        else
        {
          this.muestra_msj_no_prod=true;            
        }
        
        this.productos=data;
        this.buscar_ser.fn_buscar(this.productos,this.muestra_msj_no_prod);
       
      }
    );

   
  }

  public fn_go_carrito_compras()
  {
    this.router.navigate(["/bolsa_compra"]);
  }
  public fn_go_home()
  {
    this.router.navigate(['/home']);
  }
  public fn_reinicia_style()
  {
    this.muestra_form_buscar=false;
    this.mostrar_menu=false;
    this.mostrar_menu_navegacion=false;
    this.mostrar_form_buscar=false;
    this.muestra_menu_jassdel=false;
    this.muestra_menu_politicas=false;
    this.muestra_menu_ayuda=false;
    this.muestra_menu_ropa=false;
    this.muestra_menu_dama_calzado=false;
    this.muestra_menu_dama_accesorios=false;
    this.muestra_menu_caballero=true;
    this.muestra_menu_ropa_cab=false;
    this.muestra_menu_calzado_cab=false;
    this.txt_buscar="";
  }


  public fn_muestra_form_buscar()
  {
    this.muestra_form_buscar=true;
  }

  public fn_muestra_menu_cliente()
  {
    this.mostrar_menu=!this.mostrar_menu;
  }

 
  fn_muestra_submenu_bolsos()
  {
    this.muestra_menu_dama_bolsos=!this.muestra_menu_dama_bolsos;
  }
  fn_muestra_menu_ocacion()
  {
    this.muestra_menu_dama_ocacion=!this.muestra_menu_dama_ocacion;
  }
  fn_muestra_menu_ropa()
  {
    this.muestra_menu_dama_ropa=!this.muestra_menu_dama_ropa;
  }

  
  public fn_muestra_menu_jassdel()
  {
    this.muestra_menu_jassdel=!this.muestra_menu_jassdel;
  }
  public fn_muestra_menu_politicas()
  {
    
    this.muestra_menu_politicas=!this.muestra_menu_politicas;
  }
  public fn_muestra_menu_ayuda()
  {
    this.muestra_menu_ayuda=!this.muestra_menu_ayuda;
  }

}
