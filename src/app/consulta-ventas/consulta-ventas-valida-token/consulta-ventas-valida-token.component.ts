import { Component, OnInit } from '@angular/core';
import {ConsultaVentasInvitadoService} from '../../servicios/consulta-ventas-invitado.service';
@Component({
  selector: 'app-consulta-ventas-valida-token',
  templateUrl: './consulta-ventas-valida-token.component.html',
  styleUrls: ['./consulta-ventas-valida-token.component.css']
})
export class ConsultaVentasValidaTokenComponent implements OnInit {
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
  constructor(private cvi:ConsultaVentasInvitadoService) { }

  ngOnInit() {
    this.txt_token="";
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
  public fn_oculta_error()
  {
    this.muestra_error=false;
    clearInterval();
  }
}
