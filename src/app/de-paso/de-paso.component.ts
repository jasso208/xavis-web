import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from  '@angular/router';
import { Router }          from '@angular/router';
@Component({
  selector: 'app-de-paso',
  templateUrl: './de-paso.component.html',
  styleUrls: ['./de-paso.component.css']
})
export class DePasoComponent implements OnInit {

  public param_1:string;
  public param_2:string;
  constructor(private ruta_activa:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //el param_1 determina a donde redireccionaremos
    //1 es para resultado de busqueda por categoria
    //2 para resultadode busqueda por texto
    
    this.param_1=this.ruta_activa.snapshot.params.param_1;    
    this.param_2=this.ruta_activa.snapshot.params.param_2;

   
    //this.router.navigate(['/resultado_busqueda',this.param_1,this.param_2]);
  }

}
