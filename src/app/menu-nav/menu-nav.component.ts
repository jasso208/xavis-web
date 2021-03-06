//import { Component, OnInit,EventEmitter,Output,HostListener } from '@angular/core';
import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { BuscaProductosService } from '../servicios/busca-productos.service';
import { PasoParamBuscarService } from '../servicios/paso-param-buscar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
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
  public mostrar_menu:boolean;
  public mostrar_menu_navegacion:boolean;
  public mostrar_form_buscar:boolean;
  public txt_buscar:string;
  public cont_prod:string;
  public muestra_msj_no_prod:boolean;
  public productos:any;
  public cargando:boolean;
//  @Output()
  //evento=new EventEmitter();

  @Output()
  vbuscar=new EventEmitter();

  constructor(public bps:BuscaProductosService,private router:Router,private buscar_ser:PasoParamBuscarService) 
  { 

  }

  fn_buscar(id:string)
  {
     
      window.scrollTo(0,0);
      this.buscar(id);  
      
      this.router.navigate(['/resultado_busqueda',1,id]);  


  }

  /*
  @HostListener('buscar')
  */
  buscar(id:string)
  {
    this.cargando=true;
    this.muestra_msj_no_prod=true;
    this.bps.busca_productos("1",id)
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
        this.vbuscar.emit({'productos':this.productos,'mostrar':false});    
        this.cargando=false;
      }
    );

   
  }

  ngOnInit() {
  this.fn_reinicia_style();
  }
   fn_reinicia_menu()
  {
      this.muestra_menu_dama=true;
      this.muestra_menu_dama_bolsos=false;
      this.muestra_menu_dama_ropa=false;
      this.muestra_menu_dama_ocacion=false;
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
    this.muestra_menu_ropa=true;
    this.muestra_menu_dama_calzado=false;
    this.muestra_menu_dama_accesorios=false;
    this.muestra_menu_caballero=true;
    this.muestra_menu_dama=true;
    this.muestra_menu_ropa_cab=false;
    this.muestra_menu_calzado_cab=false;
    this.txt_buscar="";
  }
  public fn_muestra_menu_navegacion(id:string)
  {
        this.fn_reinicia_menu();
        this.mostrar_menu=false;
        //this.evento.emit({'mostrar':false});    
        this.mostrar_form_buscar=false;    
        this.fn_buscar(id);  

      
  }
   fn_muestra_menu_dama()
  {
    this.muestra_menu_dama=!this.muestra_menu_dama;
  }

    fn_muestra_submenu_ropa()
  {
    this.muestra_menu_ropa=!this.muestra_menu_ropa;
  }
  fn_muestra_menu_calzado()
  {
    this.muestra_menu_dama_calzado=!this.muestra_menu_dama_calzado;    
  }
    public fn_muestra_menu_accesorios()
  {
    this.muestra_menu_dama_accesorios=!this.muestra_menu_dama_accesorios;
  }
    public fn_muestra_submenu_ropa_caballero()
  {
    this.muestra_menu_ropa_cab=!this.muestra_menu_ropa_cab;
  }
    fn_muestra_submenu_calzado_caballero()
  {
    this.muestra_menu_calzado_cab=!this.muestra_menu_calzado_cab;
  }

  public fn_muestra_menu_caballero()
  {
    this.muestra_menu_caballero=!this.muestra_menu_caballero;
  }

}
