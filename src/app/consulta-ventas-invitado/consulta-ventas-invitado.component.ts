import { Component, OnInit } from '@angular/core';
import { EnviaTokenService } from './../servicios/envia-token.service';
import {ConsultaVentasInvitadoService} from './../servicios/consulta-ventas-invitado.service';
@Component({
  selector: 'app-consulta-ventas-invitado',
  templateUrl: './consulta-ventas-invitado.component.html',
  styleUrls: ['./consulta-ventas-invitado.component.css']
})
export class ConsultaVentasInvitadoComponent implements OnInit {
  public msj_error:string;
  public txt_e_mail:string;
  public txt_token:string;
  public mostrar_form_consulta_ventas:boolean;
  public confirma_token:boolean;
  public muestra_error:boolean;
  public cargando:boolean;
   public muestra_error_token:boolean;
  public muestra_error_e_mail:boolean;
  public muestra_form:boolean;
  public ventas:any;
  public detalle_venta:any;
  public muestra_detalle_ventas:boolean;
  public costo_envio:number;
  public total_pagar:number;
  public folio_venta:number;
  constructor(private rps: EnviaTokenService,private cvi:ConsultaVentasInvitadoService) { }

  ngOnInit() {
    window.scrollTo(0,0);
   this.fn_reinicia_form(); 
   this.muestra_form=true;
   this.muestra_detalle_ventas=false;

  }

  fn_consulta_detalle_ventas(id_venta:string)
  {
    this.total_pagar=0;
    this.costo_envio=0;
    this.cargando=true;
    this.folio_venta=parseInt(id_venta);
  this.cvi.fn_consulta_detalle_ventas(id_venta)
  .subscribe(
    data=>
    {
      this.detalle_venta=data;
      var x=0;
      for(x=0;x<this.detalle_venta.length;x++)
      {
          this.total_pagar=this.total_pagar+parseFloat(this.detalle_venta[x].precio_unitario);
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



      this.cargando=false;
      this.muestra_detalle_ventas=!this.muestra_detalle_ventas;
    }
  );
  }

  public fn_regresar_listado_ventas()
  {  
    this.muestra_detalle_ventas=!this.muestra_detalle_ventas;
  }

  fn_recupera_psw()
  {
    
  
      var ok=0;
      if(this.txt_e_mail=="")
      {
        ok=1;
        this.muestra_error=true;        
        this.msj_error="Debe ingresar un correo electronico";
        this.muestra_error_e_mail=true;
        setInterval(()=>{this.fn_oculta_error();},4000);
      }
      
      if (ok==1)
      {
        return 0;
      }
      this.cargando=true;
      this.rps.fn_recupera_psw(this.txt_e_mail)
      .subscribe(
        data=>
        {
          this.muestra_error_e_mail=false;
          if(data[0].estatus=="0")
          {
              this.muestra_error=true;
              this.msj_error=data[0].msj;
              this.cargando=false;
              setInterval(()=>{this.fn_oculta_error();},4000);
          }
          else
          {
            this.txt_e_mail="";
            this.fn_ingresa_token();     
            this.cargando=false;
          }
        }
      );
  }
  public fn_enviar_token_nuevamente()
  {
    this.muestra_form=!this.muestra_form;
    this.txt_token="";
  }
  public fn_oculta_error()
  {
    this.muestra_error=false;
    clearInterval();
  }
  fn_reinicia_form()
  {
    this.txt_e_mail="";
    this.txt_token="";
  }

  public fn_ingresa_token()
  {
    this.confirma_token=!this.confirma_token;
    this.fn_reinicia_form();
  }
  public fn_valida_token()
  {
      if(this.txt_token=="")
      {
          this.muestra_error=true;
          this.msj_error="Ingrese el token que enviamos a su Correo Electronico.";         
          this.muestra_error_token=true;
          setInterval(()=>{this.fn_oculta_error();},4000);
        return 0;    
      }
      this.cargando=true;
      this.cvi.fn_consulta_ventas_invitado(this.txt_token)
      .subscribe(
          data=>
          {
            if(data[0].estatus=="0")
            {
              this.muestra_error=true;
              this.msj_error=data[0].msj;     
              this.muestra_error_token=true;         
              this.cargando=false
              setInterval(()=>{this.fn_oculta_error();},4000);  
            }
            else
            {
              this.cargando=false;
              this.ventas=data[0].ventas;
              this.muestra_form=false;
            }
            
          }
      );
  }

}
