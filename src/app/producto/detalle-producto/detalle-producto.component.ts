import { Component, OnInit } from '@angular/core';
import { DetalleProductoService } from '../../servicios/detalle-producto.service';
import { ActivatedRoute,Params} from  '@angular/router';
import { CarritoComprasService }  from '../../servicios/carrito-compras.service';
import { CuentaProdBolsaService } from '../../servicios/cuenta-prod-bolsa.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  public muetra_zoom:boolean;
  public id_producto:number;
  public productos:any;
  public precio_venta:string="0.00";
  public precio_antes_descuento:string="0.00";
  public descuento:boolean;
  public img_principal:string;
  public img:string;
  public contador_img:number;
  public numero_img: number;
  public id_talla:string;
  public msj_error:string;
  public msj_exito:string;
  public cls_talla:string;
  public muestra_error:boolean;
  public mostrar_msj_exito:boolean;
  public cargando:boolean;
  public val_overflow:string;
  public val_overflow_b:boolean;
  public str_btn_ver_mas:string;
  public muestra_galeria:boolean;
  public myhtml:string;
  public cantidad:number;
  public cls_cantidad:string;
  constructor(private prod:DetalleProductoService,private ruta_activa:ActivatedRoute,private carrito_compras:CarritoComprasService,private cont_prod_carrito:CuentaProdBolsaService) { }

  ngOnInit() 
  {
    window.scrollTo(0,0);
    this.val_overflow_b=false;
    this.val_overflow="hidden";
    this.str_btn_ver_mas="Ver mas detalle";
    this.id_talla="0";
    this.contador_img=1;
    this.id_producto=this.ruta_activa.snapshot.params.id_producto;
    this.muestra_error=false;
    this.cargando=true;
    this.cls_talla=" forms_control";
    this.muestra_galeria=false;
    this.cantidad=0;
    this.fn_consulta_producto();
    
    setInterval(()=>{this.fn_cambia_img_automatico()},4000);
    this.muetra_zoom=false;
  }
  fn_muestra_zoom()
  {
    this.muetra_zoom=!this.muetra_zoom;
  }
  fn_muestra_mas_detalle()
  {
      this.val_overflow_b=!this.val_overflow_b;
      if(this.val_overflow_b)
      {      
        this.val_overflow="visible";
        
    this.str_btn_ver_mas="Ver menos detalle";
      }
      else
      {
        this.val_overflow="hidden";        
        this.str_btn_ver_mas="Ver mas detalle";
      }
  }

  fn_reinicia_form()
  {
    this.muestra_error=false;
    this.mostrar_msj_exito=false;
    this.cls_talla=" forms_control ";
    this.cls_cantidad=" forms_control ";
  }
  fn_agregar_bolsa_compras()
  {
   
    this.fn_reinicia_form();
    if(this.id_talla=="0")
    {
      this.muestra_error=true;
      this.cls_talla=" forms_control cls_error";
      this.msj_error="Debe seleccionar una talla";
      return 0;      
    
    }
    if( this.cantidad==0)
    {
      this.muestra_error=true;
      this.cls_cantidad=" forms_control cls_error";
      this.msj_error="La cantidad debe mayor a cero.";
      return 0;      
    }
    this.cargando=true;
    this.carrito_compras.insertaCarrito((this.id_producto).toString(),(this.cantidad).toString(),(this.id_talla).toString()).subscribe
	  (
		data=>
		{
				//si tiene el estatus 0 es porque fallo.
				if (data[0].estatus==0)
				{
            this.muestra_error=true;						
            this.msj_error=data[0].msj;
            this.cargando=false;
            setInterval(()=>{
              this.muestra_error=false;
            },4000)
				}
				else
				{
					this.id_talla="0";
          this.mostrar_msj_exito=true;
          this.msj_exito="El producto se agrego correctamente.";
          setInterval(()=>{this.fn_oculta_msj_exito()},4000)

          this.cont_prod_carrito.fn_cont_prod_carrito()
            .subscribe(
              data=>
              {
                this.cont_prod_carrito.fn_establece_cont(data[0].cantidad__sum);
                
              }
            ) ;

            this.cargando=false;
              
        }
        
		}
	  );
  }
  fn_oculta_msj_exito()
  {
    
    this.mostrar_msj_exito=false;
    clearInterval();
  }
  fn_cambia_img(id:number)
  {
    this.img="../assets/img/productos/"+this.img_principal+"_"+String(id)+".png";

  }
  public fn_cambia_img_automatico()
  {
    this.contador_img=this.contador_img+1;
    if(this.contador_img>this.numero_img)
    {
      this.contador_img=1
    }
    this.fn_cambia_img(this.contador_img);
  }
  fn_consulta_producto()
  {
      this.prod.getProductos(this.id_producto).subscribe(data=>{
        this.numero_img=data[0].img_prod.length;
        this.productos=data[0];
        this.id_producto=data[0].id_producto;
        this.myhtml=this.productos.desc_producto;

		    this.fn_genera_img_producto();
        /*calculamos el descuento*/
        if (parseFloat(this.productos.descuento).toFixed(2)>parseFloat('0.00').toFixed(2))
        {
          this.descuento=true;//si tenemos descuento, mostrara el apartado de descuento.
          this.precio_venta=parseFloat((this.productos.precio-(this.productos.precio*(this.productos.descuento/100.00))).toString()).toFixed(2);
          this.precio_antes_descuento=parseFloat((this.productos.precio).toString()).toFixed(2);
        }
        else
        {
          this.precio_antes_descuento="0.00";
          this.descuento=false;
          this.precio_venta=parseFloat((this.productos.precio).toString()).toFixed(2);
        }
        if (this.productos.tallas.length==1)
        {
          this.id_talla="1";
        }
        this.fn_cambia_img(1);
        this.cargando=false;
        this.muestra_galeria=true;
       
        
    }
    );
  }

  public fn_muestra_galeria()
  {
    $("#img_hover_1").addClass("active");
  }
  
  public fn_genera_img_producto()
  {


	  if (String(this.id_producto).length==1)
	  {
		    this.img_principal="000000"+String(this.id_producto);
	  }
	  if (String(this.id_producto).length==2)
	  {
		    this.img_principal="00000"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==3)
	  {
		    this.img_principal="0000"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==4)
	  {
		    this.img_principal="000"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==5)
	  {
		    this.img_principal="00"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==6)
	  {
		    this.img_principal="0"+String(this.id_producto);
	  }

	  if (String(this.id_producto).length==7)
	  {
		    this.img_principal=String(this.id_producto);
	  }
  }
}
