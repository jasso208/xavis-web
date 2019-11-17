import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultadoBusquedaComponent } from './producto/resultado-busqueda/resultado-busqueda.component';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import { InformacionEnvioComponent } from './informacion-envio/informacion-envio.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';
import { DePasoComponent } from './de-paso/de-paso.component';
import { ConsultaVentasInvitadoComponent } from './consulta-ventas-invitado/consulta-ventas-invitado.component';
const rutas: Routes = [

	{ path: '', redirectTo: '/home',pathMatch:'full'},
	{ path: 'home', component: HomeComponent },
	{ path: 'resultado_busqueda/:tipo_busqueda/:param_1', component: ResultadoBusquedaComponent },
  { path: 'detalle_producto/:id_producto', component: DetalleProductoComponent },  
  { path: 'bolsa_compra', component: CarritoComprasComponent },  
	{ path: 'informacion_envio', component: InformacionEnvioComponent },
  { path: 'forma_pago', component: FormaPagoComponent },
  { path: 'consulta_ventas_invitado', component: ConsultaVentasInvitadoComponent },

  
  
	{ path: 'de_passo/:param_1/:param_2', component: DePasoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultadoBusquedaComponent,
    DetalleProductoComponent,
    CarritoComprasComponent,
    InformacionEnvioComponent,
    FormaPagoComponent,
    DePasoComponent,
    ConsultaVentasInvitadoComponent
  ],
  imports: [
    BrowserModule,   
		RouterModule.forRoot(rutas, { useHash: true }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ],
  
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
