import { Component, OnInit } from '@angular/core';
import { ProdXBloqueService } from '../servicios/prod-x-bloque.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  public jeans:any;
  public blusa:any;
  public bolsos:any;
  public carteras:any;
  public muestra_jeans:boolean;
  public muestra_blusa:boolean;   
  public muestra_bolsos:boolean;
  public muestra_carteras:boolean;  
  public cargando:boolean;
  constructor(private pvs:ProdXBloqueService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.fn_consulta_prod_x_bloque();
    this.muestra_jeans=false;
    this.muestra_blusa=false;
  }


  
  fn_consulta_prod_x_bloque()
  {
    this.cargando=true;
    this.pvs.getProductos()
		.subscribe(
        data=>
        {
          console.log(data);
          try{
            this.jeans=data[0].jeans;
            this.muestra_jeans=true;
          }
          catch(e)
          {
            this.muestra_jeans=false;
          }
          
          try{
            this.blusa=data[0].blusas;
            this.muestra_blusa=false;
          }
          catch(e)
          {
            this.muestra_blusa=false;
          }
          
          try{
            this.bolsos=data[0].bolsos;
            this.muestra_bolsos=false;
          }
          catch(e)
          {
            this.muestra_bolsos=false;
          }

          try{
            this.carteras=data[0].carteras;
            this.muestra_carteras=false;
          }
          catch(e)
          {
            this.muestra_carteras=false;
          }

         
          
          
          
          
          this.cargando=false;
        }
    );	
  }

}
