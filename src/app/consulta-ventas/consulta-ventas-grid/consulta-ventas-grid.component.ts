import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ConsultaVentasInvitadoService} from '../../servicios/consulta-ventas-invitado.service';

@Component({
  selector: 'app-consulta-ventas-grid',
  templateUrl: './consulta-ventas-grid.component.html',
  styleUrls: ['./consulta-ventas-grid.component.css']
})
export class ConsultaVentasGridComponent implements OnInit {

  public token:string;
  public cargando:boolean;
  public ventas:any;
  public muestra_error:boolean;
  public msj_error:string;
  public muestra_grid:boolean;
  public subtotal:number;
  public total_pagar:number;
  public costo_envio:number;
  public folio_venta:number;
  public detalle_venta:any;
  public venta:any;
  public link_seg:string;
  public subtotal_2:number;
  public desc_por_cupon:number;

  public is_enviado:boolean;
  constructor( private rutaActiva: ActivatedRoute,private cvi:ConsultaVentasInvitadoService) { }

  ngOnInit() {

    this.muestra_error=false;
    this.msj_error="";
    this.token=  this.rutaActiva.snapshot.params.token;
    this.muestra_grid=true;
    this.subtotal=0.00;
    this.fn_valida_token();
  }
  public fn_oculta_error()
  {
    this.muestra_error=false;
    clearInterval();
  }
  public fn_valida_token()
  {
      this.cargando=true;
      this.cvi.fn_consulta_ventas_invitado(this.token)
      .subscribe(
          data=>
          {
            if(data[0].estatus=="0")
            {
              this.muestra_error=true;
              this.msj_error=data[0].msj;                        
              this.cargando=false
              setInterval(()=>{this.fn_oculta_error();},4000);  
            }
            else
            {
              this.cargando=false;
              this.ventas=data[0].ventas;
                  
            }
            
          }
      );
  }
  public fn_consulta_detalle_ventas(id_venta:string,link_seguimiento:string,enviado:boolean)
  {
    this.total_pagar=0;
    this.costo_envio=0;
    this.cargando=true;
    this.folio_venta=parseInt(id_venta);
    this.link_seg=link_seguimiento;
    this.is_enviado=enviado;
    this.cvi.fn_consulta_detalle_ventas(id_venta)
    .subscribe(
      data=>
      {


        this.detalle_venta=data[1].detalle;
        this.venta=data[2].venta[0];
        var x=0;
        for(x=0;x<this.detalle_venta.length;x++)
        {
            this.total_pagar=this.total_pagar+parseFloat(this.detalle_venta[x].precio_unitario);
        }

        this.subtotal=this.total_pagar;

        this.costo_envio=this.venta.costo_envio;
        this.subtotal_2=this.subtotal+this.costo_envio;
        this.desc_por_cupon=this.venta.descuento_cupon;
        this.total_pagar=this.venta.total;
        this.cargando=false;



        this.cargando=false;
        this.muestra_grid=!this.muestra_grid;
      }
    );
  }
}
