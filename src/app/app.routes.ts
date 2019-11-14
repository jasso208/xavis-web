import { BrowserModule } from '@angular/platform-browser';
import { Routes,RouterModule } from '@angular/router';
import {NgModule,ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ResultadoBusquedaComponent } from './producto/resultado-busqueda/resultado-busqueda.component';

const APP_ROUTES: Routes=[
    {  path:'',redirectTo:'home',pathMatch:'full'},
    {  path:'home',component: HomeComponent},
    {  path:'resultado_busqueda/:tipo_busqueda/:parametro',component: ResultadoBusquedaComponent     }
    
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  