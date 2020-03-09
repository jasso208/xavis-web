import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  public muestra_pr_1:boolean;
  public muestra_pr_2:boolean;
  public muestra_pr_3:boolean;
  public muestra_pr_4:boolean;
  public muestra_pr_5:boolean;  
  public muestra_pr_6:boolean;
  public muestra_pr_7:boolean;
  public muestra_pr_8:boolean;
  public muestra_pr_9:boolean;
  public muestra_pr_10:boolean;  
  public muestra_pr_11:boolean;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.fn_reinicia_form();
  }
  fn_reinicia_form()
  {
    this.muestra_pr_1=false;
    this.muestra_pr_2=false;
    this.muestra_pr_3=false;
    this.muestra_pr_4=false;
    this.muestra_pr_5=false;    
    this.muestra_pr_6=false;
    this.muestra_pr_7=false;    
    this.muestra_pr_8=false;    
    this.muestra_pr_9=false;    
    this.muestra_pr_10=false;
    this.muestra_pr_11=false;
  }
  
  fn_muestra_pr_1()
  {
    this.fn_reinicia_form();
    this.muestra_pr_1=!this.muestra_pr_1;    
     
  }

  fn_muestra_pr_2()
  {
    this.fn_reinicia_form();
    this.muestra_pr_2=!this.muestra_pr_2;    
  }
  
  fn_muestra_pr_3()
  {
    this.fn_reinicia_form();
    this.muestra_pr_3=!this.muestra_pr_3;    
  }
    
  fn_muestra_pr_4()
  {
    this.fn_reinicia_form();
    this.muestra_pr_4=!this.muestra_pr_4;    
  }
      
  fn_muestra_pr_5()
  {
    this.fn_reinicia_form();
    this.muestra_pr_5=!this.muestra_pr_5;    
  }
  fn_muestra_pr_6()
  {
    this.fn_reinicia_form();
    this.muestra_pr_6=!this.muestra_pr_6;    
  }
  fn_muestra_pr_7()
  {
    this.fn_reinicia_form();
    this.muestra_pr_7=!this.muestra_pr_7;    
  }
  fn_muestra_pr_8()
  {
    this.fn_reinicia_form();
    this.muestra_pr_8=!this.muestra_pr_8;    
  }
  fn_muestra_pr_9()
  {
    this.fn_reinicia_form();
    this.muestra_pr_9=!this.muestra_pr_9;    
  }
  fn_muestra_pr_10()
  {
    this.fn_reinicia_form();
    this.muestra_pr_10=!this.muestra_pr_10;    
  }
  fn_muestra_pr_11()
  {
    this.fn_reinicia_form();
    this.muestra_pr_11=!this.muestra_pr_11;    
  }
}
