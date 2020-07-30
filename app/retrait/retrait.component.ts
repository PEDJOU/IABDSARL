import { Component, OnInit,Input, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {Operation} from '../shared/operation.model';
import { RouterExtensions } from "nativescript-angular/router";
import { MyHttpGetService } from "../http/MyHttpGetService ";


@Component({
  selector: 'ns-transp',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.css'],
  moduleId: module.id,
})
export class RetraitComponent implements OnInit {
 
  public dataOperation: Array<any>;;
  public montantgle:number;
  public gaingle:number;
  public val:string;
  public operation: Array<Operation>;
  public serveurUrl:string;
  nomCash :string;
  cash : string;
  nomuser:string;
  tokens:string;
  frais: number;


  constructor(private activatedRoute: ActivatedRoute,private myhttpget: MyHttpGetService,private _routerExtensions: RouterExtensions) 
  {
    this.val="";
    
   }
  

   ngOnInit()
   {

    this.activatedRoute.queryParams.subscribe(params => 
      {
      this.cash= params['cash'];
      this.nomCash=params['nomCashs']; 
      this.nomuser=params['nomUser'];
      this.tokens=params['token'];
});
    this.serveurUrl='http://51.222.30.67:8080/api/api/listeoperation?cash='+this.cash;
       
      this.myhttpget
            .GetData(this.serveurUrl)
            .subscribe(res => {
                if (res.success) {
                    this.operation = [];
                    this.dataOperation=[];
                    this.dataOperation = res.data.operation;
                    
                    for (let i = 0; i < this.dataOperation.length; i++) 
                    {
                    this.operation.push(new Operation(this.dataOperation[i].idCompte.planteur.nom+" "+this.dataOperation[i].idCompte.planteur.prenom,
                    this.dataOperation[i].dateOpeartion,
                    this.dataOperation[i].idCompte.planteur.matricule,
                    this.dataOperation[i].montant));
                    }
                    this.montantgle=res.data.montant;
                    this.gaingle=res.data.gain;
                    this.frais=res.data.frais;
                }
                else {
                    this.operation = [];
                }
            });
    }
  
  onItemTap(args): void {
    this._routerExtensions.navigate(["/mapping"], { clearHistory: true });
}

onProfileButtonTap() {
  this._routerExtensions.navigate(["/homepage"], { clearHistory: true, queryParams: { cash:this.cash,nomCashs:this.nomCash,nom:this.nomuser,token:this.tokens} });
}

}
