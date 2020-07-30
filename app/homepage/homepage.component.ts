import { Component, ElementRef, OnInit } from "@angular/core";
import { User } from "kinvey-nativescript-sdk";
import { UserService } from "kinvey-nativescript-sdk/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { ActivatedRoute } from "@angular/router";
import {Retrait} from "../shared/retrait.model";



@Component({
    selector: "HomePage",
    moduleId: module.id,
    templateUrl: "./homepage.component.html",
    styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {
    loggedUser: string;
    public retrait: Retrait;
    public token: string;
    public nom:string;

    constructor(
        private _routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private page: Page) 
        {
        this.page.actionBarHidden = false;
        this.retrait=new Retrait();
    }

    ngOnInit(): void 
    {
        this.activatedRoute.queryParams.subscribe(params => 
            {
            this.token = params['token'];
            this.retrait.cash= params['cash'];
            this.retrait.nomCash=params['nomCashs'];
            this.retrait.nomUser=params['nom'];
    });
   }

    logout() {
        this._routerExtensions.navigate(["/login"], { clearHistory: true});
    
    }

    onNewButtonTap() {
       this._routerExtensions.navigate(["/search"], { clearHistory: true, queryParams: { token: this.token,cash:this.retrait.cash,nomCashs:this.retrait.nomCash,nom:this.retrait.nomUser} });
    }

     onListeButtonTap() {
       this._routerExtensions.navigate(["/search"], { clearHistory: true, queryParams: { token: this.token,cash:this.retrait.cash,nomCashs:this.retrait.nomCash,nom:this.retrait.nomUser} });
    }

    onreleveButtonTap() {
        this._routerExtensions.navigate(["/retrait"], { clearHistory: true, queryParams: { cash:this.retrait.cash,nomCashs:this.retrait.nomCash,nomUser:this.retrait.nomUser,token:this.token} });
     }

    onProfileButtonTap() {
       
    }
}
