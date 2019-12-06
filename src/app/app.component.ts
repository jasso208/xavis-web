import { Component } from '@angular/core';
import { CuentaProdBolsaService } from './servicios/cuenta-prod-bolsa.service';
import {SessionService} from './servicios/session.service';
import { Router }          from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JassDel.com';
  public mostrar_menu:boolean;
  public mostrar_menu_navegacion:boolean;
  public mostrar_form_buscar:boolean;
  public txt_buscar:string;
  public cont_prod:string;
  public muestra_menu_jassdel:boolean;
  public muestra_menu_politicas:boolean;
  public muestra_menu_ayuda:boolean;
  constructor(private cont_prod_carrito:CuentaProdBolsaService,private session:SessionService, private router: Router)
  {
    
  }
  
  ngOnInit()
  {
    this.fn_reinicia_style();   
    //esta funcion ejecuta el algoritmo para generar la session, solo en caso de que no exista
    this.session.setSession();
    
    this.cont_prod_carrito.change.subscribe(cont_prod=>{
      this.cont_prod=cont_prod;
       
    });

    this.cont_prod_carrito.fn_cont_prod_carrito()
				.subscribe(
					data=>
					{
						this.cont_prod=data[0].cantidad__sum;
						//this.cont_prod_carrito.fn_establece_cont(data[0].cantidad__sum);

					}
				) ;
  }
  public fn_oculta_menu()
  {
    this.mostrar_menu=false;
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
    this.mostrar_menu=false;
    this.mostrar_menu_navegacion=false;
    this.mostrar_form_buscar=false;
    this.muestra_menu_jassdel=false;
    this.muestra_menu_politicas=false;
    this.muestra_menu_ayuda=false;
    this.txt_buscar="";
  }


  public fn_muestra_menu_cliente()
  {
    this.mostrar_menu=!this.mostrar_menu;
  }
  public fn_muestra_menu_navegacion()
  {
    this.mostrar_menu=false;
    this.mostrar_menu_navegacion=!this.mostrar_menu_navegacion;    
    this.mostrar_form_buscar=false;
  }
  public fn_muestra_form_busqueda()
  {    
    this.mostrar_menu=false;    
    this.mostrar_form_buscar=!this.mostrar_form_buscar;
    this.mostrar_menu_navegacion=false;
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
