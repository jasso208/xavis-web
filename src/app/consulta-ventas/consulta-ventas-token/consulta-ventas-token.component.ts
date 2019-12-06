import { Component, OnInit } from '@angular/core';
import { EnviaTokenService } from '../../servicios/envia-token.service';
import { Router }          from '@angular/router';
@Component({
  selector: 'app-consulta-ventas-token',
  templateUrl: './consulta-ventas-token.component.html',
  styleUrls: ['./consulta-ventas-token.component.css']
})
export class ConsultaVentasTokenComponent implements OnInit {
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
  public mostrar_msj_exito:boolean;
  public msj_exito:string;
  constructor(private rps:EnviaTokenService,private router:Router) { }

  ngOnInit() {
    this.mostrar_msj_exito=false;
    this.msj_exito="";
    this.txt_e_mail=""
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
            this.msj_exito="Revise su bandeja de entrada, se le envio un link para acceder a sus compras.";
            this.mostrar_msj_exito=true;
            this.txt_e_mail="";              
            //this.router.navigate(['/valida_token']);
            this.cargando=false;
            setInterval(()=>{this.mostrar_msj_exito=false;},4000)
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
