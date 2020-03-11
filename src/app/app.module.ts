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
import { BlogComponent } from './blog/blog.component';
import { CostoEnvioComponent } from './detalle_pie/costo-envio/costo-envio.component';
import { SeguimientoPedidoComponent } from './detalle_pie/seguimiento-pedido/seguimiento-pedido.component';
import { DevolucionesComponent } from './detalle_pie/devoluciones/devoluciones.component';
import { HorarioAtencionComponent } from './detalle_pie/horario-atencion/horario-atencion.component';
import { PoliticaDevolucionComponent } from './detalle_pie/politica-devolucion/politica-devolucion.component';
import { PoliticaPrivacidadComponent } from './detalle_pie/politica-privacidad/politica-privacidad.component';
import { ConsultaVentasTokenComponent } from './consulta-ventas/consulta-ventas-token/consulta-ventas-token.component';
import { ConsultaVentasValidaTokenComponent } from './consulta-ventas/consulta-ventas-valida-token/consulta-ventas-valida-token.component';
import { ConsultaVentasGridComponent } from './consulta-ventas/consulta-ventas-grid/consulta-ventas-grid.component';
import { PruebaComponent } from './prueba/prueba.component';
import { PagoTarjetaComponent } from './pago-tarjeta/pago-tarjeta.component';
import { CategoriasComponent } from './categorias/categorias.component';
const rutas: Routes = [

	{ path: '', redirectTo: '/home',pathMatch:'full'},
	{ path: 'home', component: HomeComponent },
	{ path: 'resultado_busqueda/:tipo_busqueda/:param_1', component: ResultadoBusquedaComponent },
  { path: 'detalle_producto/:id_producto', component: DetalleProductoComponent },  
  { path: 'bolsa_compra', component: CarritoComprasComponent },  
	{ path: 'informacion_envio', component: InformacionEnvioComponent },
  { path: 'forma_pago', component: FormaPagoComponent },  
  { path: 'pago_tarjeta', component: PagoTarjetaComponent },
  { path: 'consulta_ventas_invitado', component: ConsultaVentasInvitadoComponent },  
  { path: 'detalle_blog/:id_blog', component: BlogComponent },
  { path: 'costo_envio', component: CostoEnvioComponent },
  { path: 'seg_pedido', component: SeguimientoPedidoComponent },
  { path: 'devoluciones', component: DevolucionesComponent },
  { path: 'horario_atencion', component: HorarioAtencionComponent },
  { path: 'politica_devolucion', component: PoliticaDevolucionComponent },
  { path: 'politica_privacidad', component: PoliticaPrivacidadComponent },
  { path: 'consulta_ventas', component: ConsultaVentasTokenComponent },
  { path: 'valida_token', component: ConsultaVentasValidaTokenComponent },
  
  { path: 'listado_ventas/:token', component: ConsultaVentasGridComponent },
  { path: 'categorias', component: CategoriasComponent },
  
  
  
  
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
    ConsultaVentasInvitadoComponent,
    BlogComponent,
    CostoEnvioComponent,
    SeguimientoPedidoComponent,
    DevolucionesComponent,
    HorarioAtencionComponent,
    PoliticaDevolucionComponent,
    PoliticaPrivacidadComponent,
    ConsultaVentasTokenComponent,
    ConsultaVentasValidaTokenComponent,
    ConsultaVentasGridComponent,
    PruebaComponent,
    PagoTarjetaComponent,
    CategoriasComponent
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
