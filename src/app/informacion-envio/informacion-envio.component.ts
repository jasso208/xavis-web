import { Component, OnInit } from '@angular/core';
import {DireccionEnvioTemporalService} from '../servicios/direccion-envio-temporal.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup,Validators ,ReactiveFormsModule   } from '@angular/forms';
@Component({
  selector: 'app-informacion-envio',
  templateUrl: './informacion-envio.component.html',
  styleUrls: ['./informacion-envio.component.css']
})
export class InformacionEnvioComponent implements OnInit {
	public mostrar:boolean;
	public cargando:boolean;
	public nombre:string="";
	public apellido_p:string="";
	public apellido_m:string="";
	public telefono:string="";
	public calle:string="";
	public cp:string="";
	public municipio:string="";
	public estado:string="";
	public pais:string="";
	public e_mail:string="";
	public referencia:string="";
	public numero_interior:string="";
	public numero_exterior:string="";
  public rfc:string="";
  cliente:FormGroup;

  public show_error_nombre:boolean;
	public cls_nombre:string;
	public show_error_apellido_p:boolean;
	public cls_apellido_p:string;
	public show_error_telefono:boolean;
	public cls_telefono:string;
	public show_error_calle:boolean;
	public cls_calle:string;
	public show_error_no_ext:boolean;
	public cls_no_ext:string;
	public show_error_cp:boolean;
	public cls_cp:string;
	public show_error_mun:boolean;
	public cls_mun:string;
	public show_error_est:boolean;
	public cls_est:string;
	public show_error_pais:boolean;
	public cls_pais:string;
	public show_error_email:boolean;
	public cls_email:string;
	public show_error_referencia:boolean;
	public cls_referencia:string;
	public show_error_reinicia_direccion:boolean;
	public msj_reinicia:string;
	public mostrar_confirma_salir:boolean;
	public muestra_error:boolean;
	public mostrar_msj_exito:boolean;
	public msj_error:string;
	public msj_exito:string;
  constructor(private det:DireccionEnvioTemporalService,private router:Router) { }

  ngOnInit() {
    this.cliente=new FormGroup({
			nombre:new FormControl(this.nombre,[Validators.required]),
			apellido_p:new FormControl(this.apellido_p,[Validators.required]),
			apellido_m:new FormControl(this.apellido_m,[Validators.required]),
			telefono:new FormControl(this.telefono,[Validators.required]),
			calle:new FormControl(this.calle,[Validators.required]),
			cp:new FormControl(this.cp,[Validators.required]),
			municipio:new FormControl(this.municipio,[Validators.required]),
			estado:new FormControl(this.estado,[Validators.required]),
			pais:new FormControl(this.pais,[Validators.required]),
			e_mail:new FormControl({value:this.e_mail},[Validators.required]),
			referencia:new FormControl(this.referencia,[Validators.required]),
			numero_interior:new FormControl(this.numero_interior,[Validators.required])	,
			numero_exterior:new FormControl(this.numero_exterior,[Validators.required])			,
			rfc:new FormControl(this.rfc)
			});
			this.cargando=true;
			this.fn_reinicia_styles();
			this.fn_obtiene_direccion_envio_temporal();
  }
  fn_reinicia_styles()
  {
	  this.cls_nombre="form-control";
	  this.show_error_nombre=false;

	  this.cls_apellido_p="form-control";
	  this.show_error_apellido_p=false;


	  this.cls_telefono="form-control";
	  this.show_error_telefono=false;

	  this.cls_calle="form-control";
	  this.show_error_calle=false;


	  this.show_error_no_ext=false;
	  this.cls_no_ext="form-control";


	  this.show_error_cp=false;
	  this.cls_cp="form-control";

	  this.show_error_mun=false;
	  this.cls_mun="form-control";


	  this.show_error_est=false;
	  this.cls_est="form-control";

	  this.show_error_pais=false;
	  this.cls_pais="form-control";

	  this.show_error_email=false;
	  this.cls_email="form-control";


	  this.show_error_referencia=false;
	  this.cls_referencia="form-control";

	  this.show_error_reinicia_direccion=false;
	  this.msj_reinicia="";
	  
	  this.muestra_error=false;
	  this.mostrar_msj_exito=false;

	  this.msj_error="";
	  this.msj_exito="";
	  
//		this.mostrar_error_login=false;
  }

  
	insertaDireccionEnvio()
	{

		this.fn_reinicia_styles();

		var form_ok=0;


		if (this.cliente.value.nombre=="" || this.cliente.value.nombre==null)
		{
			this.cls_nombre="form-control error_form";
			this.show_error_nombre=true;
			form_ok=1;
		}


		if (this.cliente.value.apellido_p=="" || this.cliente.value.apellido_p==null)
		{
			this.cls_apellido_p="form-control error_form";
			this.show_error_apellido_p=true;
			form_ok=1;
		}

	
		if (this.cliente.value.telefono=="" || this.cliente.value.telefono==null)
		{
			this.cls_telefono="form-control error_form";
			this.show_error_telefono=true;
			form_ok=1;

		}


		if (this.cliente.value.calle=="" || this.cliente.value.calle==null)
		{
			this.cls_calle="form-control error_form";
			this.show_error_calle=true;
			form_ok=1;
		}


		if (this.cliente.value.numero_exterior=="" || this.cliente.value.numero_exterior==null)
		{
			this.cls_no_ext="form-control error_form";
			this.show_error_no_ext=true;
			form_ok=1;
		}

		if (this.cliente.value.cp=="" || this.cliente.value.cp==null)
		{
			this.cls_cp="form-control error_form";
			this.show_error_cp=true;
			form_ok=1;

		}

		if (this.cliente.value.municipio=="" || this.cliente.value.municipio==null)
		{
			this.cls_mun="form-control error_form";
			this.show_error_mun=true;
			form_ok=1;
		}

		if (this.cliente.value.estado=="" || this.cliente.value.estado==null)
		{


			this.cls_est="form-control error_form";
			this.show_error_est=true;
			form_ok=1;

		}

			if (this.cliente.value.pais=="" || this.cliente.value.pais==null)
			{
				this.cls_pais="form-control error_form";
				this.show_error_pais=true;
				form_ok=1;

			}

			if (this.cliente.value.e_mail=="" || this.cliente.value.e_mail==null)
			{
				this.cls_email="form-control error_form";
				this.show_error_email=true;
				form_ok=1;

			}

			if (this.cliente.value.referecia=="" || this.cliente.value.referencia==null)
			{
				this.cls_referencia="form-control error_form";
				this.show_error_referencia=true;
				form_ok=1;

			}


			if (form_ok==1)
			{
	
				this.muestra_error=true;			

				this.msj_error="Valida la informacion del formulario.";
				setInterval(()=>{this.fn_oculta_msj_temporal()},4000);
				
				return 0;
			}

			this.cargando=true;
			this.det.fn_direccion_envio_temporal_inserta(this.cliente)
			.subscribe
			(
				data=>
				{
					//si el estatus es cero, es que fallo al guardar la direccion temporal.
					if (data[0].estatus=="0")
					{							
						this.muestra_error=true;
						this.msj_error="Error al guardar la informacion	.";
						setInterval(()=>{this.fn_oculta_msj_temporal()},4000);
					}
					else
					{
						//el 1 en la variable de session nueva_direccion indica que ya se ha modificado la direccion
						//por lo cual debera cargar siempre esta.
						this.router.navigate(['/forma_pago']);

					}
					this.cargando=false;


				}
			);


	}

	fn_oculta_msj_temporal()
	{
		
		this.muestra_error=false;			
		this.msj_error="";
		clearInterval();
	}
	
	fn_obtiene_direccion_envio_temporal()
	{
		/*
			cuando el clinte se loguea, se inserta la direccion que tiene capturada en la direccion de envio DireccionEnvioTemporalService
		*/
		this.det.fn_direccion_envio_temporal_get()
		.subscribe(
			data=>
			{

				this.nombre=data[0].nombre;
				this.apellido_p=data[0].apellido_p;
				this.apellido_m=data[0].apellido_m;
				this.telefono=data[0].telefono;
				this.calle=data[0].calle;
				this.cp=data[0].cp;
				this.municipio=data[0].municipio;
				this.estado=data[0].estado;
				this.pais=data[0].pais;
				this.e_mail=data[0].e_mail;
				this.referencia=data[0].referencia;
				this.numero_interior=data[0].numero_interior;
				this.numero_exterior=data[0].numero_exterior;
				this.rfc=data[0].rfc;

				this.cliente=new FormGroup({
				nombre:new FormControl(this.nombre,[Validators.required]),
				apellido_p:new FormControl(this.apellido_p,[Validators.required]),
				apellido_m:new FormControl(this.apellido_m,[Validators.required]),
				telefono:new FormControl(this.telefono,[Validators.required]),
				calle:new FormControl(this.calle,[Validators.required]),
				cp:new FormControl(this.cp,[Validators.required]),
				municipio:new FormControl(this.municipio,[Validators.required]),
				estado:new FormControl(this.estado,[Validators.required]),
				pais:new FormControl(this.pais,[Validators.required]),
				e_mail:new FormControl(this.e_mail,[Validators.required]),
				referencia:new FormControl(this.referencia,[Validators.required]),
				numero_interior:new FormControl(this.numero_interior,[Validators.required])			,
				numero_exterior:new FormControl(this.numero_exterior,[Validators.required])			,
				rfc:new FormControl(this.rfc)
			});
			this.cargando=false;
			}
		);

	}

}
