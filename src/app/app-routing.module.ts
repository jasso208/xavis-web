import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultadoBusquedaComponent } from './producto/resultado-busqueda/resultado-busqueda.component';

const routes: Routes = [
  {  path:'',redirectTo:'home',pathMatch:'full' },
  {  path:'home',component: HomeComponent    },
  {  path:'resultado_busqueda',component: ResultadoBusquedaComponent     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
