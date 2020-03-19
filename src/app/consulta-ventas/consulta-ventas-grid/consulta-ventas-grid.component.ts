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
              console.log(this.ventas);         
            }
            
          }
      );
  }
  public fn_consulta_detalle_ventas(id_venta:string)
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
        this.subtotal=this.total_pagar;

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
        this.muestra_grid=!this.muestra_grid;
      }
    );
  }
}
