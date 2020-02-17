import { Component, OnInit } from '@angular/core';
import { ProdXBloqueService } from '../servicios/prod-x-bloque.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private pvs:ProdXBloqueService) { }
  public jeans:any;
  public blusa:any;
  public bolsos:any;
  public carteras:any;

  public cargando:boolean;
  ngOnInit() {
    window.scrollTo(0,0);
    this.fn_consulta_prod_x_bloque();
  }

  fn_consulta_prod_x_bloque()
  {
    this.cargando=true;
    this.pvs.getProductos()
		.subscribe(
        data=>
        {
          
          this.jeans=data[0].jeans;
          this.blusa=data[0].blusas;
          
          this.bolsos=data[0].bolsos;
          
          this.carteras=data[0].carteras;
          this.cargando=false;
        }
    );	
  }

 
}
