import { Component, OnInit } from '@angular/core';
import { CarritoComprasService } from '../servicios/carrito-compras.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.css']
})
export class PagoTarjetaComponent implements OnInit {
  public costo_envio:number;
  public total_pagar:number;
  public productos:any;
  public holder_name:string="";
  constructor(private car_service:CarritoComprasService,private router:Router) { }

  ngOnInit() {

    this.fn_consulta_carrito();

  }
  public fn_consulta_carrito()
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
          if(this.total_pagar<500)
          {
            this.total_pagar=this.total_pagar+100;
            this.costo_envio=100;
          }
          else
          {
            this.costo_envio=0;
		       }
          
          console.log(this.total_pagar);
          if (this.total_pagar==100)
          {
            this.total_pagar=0;
            localStorage.setItem("total_pagar",this.total_pagar.toString());
          }
          
         
      }
      );

  }
}
