import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Planteur } from "../shared/planteur.model";
import { UserService } from "../shared/user.service";
import { FloatLabel } from "../float-label/float-label.component";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { ImageAsset } from 'tns-core-modules/image-asset';
import { takePicture, requestPermissions, isAvailable } from 'nativescript-camera';
import { MyHttpGetService } from "../http/MyHttpGetService ";
import { ActivatedRoute } from "@angular/router";
import {Telephony} from 'nativescript-telephony';
import {Retrait} from "../shared/retrait.model";


@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public retrait: Retrait;
    public cameraImage: ImageAsset;
    public matricule: string;
    public imageTaken: ImageAsset;
    public saveToGallery: boolean = true;
    public keepAspectRatio: boolean = true;
    public width: number = 70;
    public height: number = 70;
    public planteurs: Planteur;
    public message: String;
    public token: string;
    private serverUrl: string;
   

    constructor(private userService: UserService, private routerExtensions: RouterExtensions, private planteurService: MyHttpGetService, private activatedRoute: ActivatedRoute) {
        this.planteurs = new Planteur();
        this.retrait=new Retrait();
        this.message = "";
    }

    ngOnInit(): void 
    {
        this.message = "";
        
        this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token'];
            this.retrait.cash= params['cash'];
            this.retrait.nomCash=params['nomCashs'];
            this.retrait.nomUser=params['nom']
        });

    }

    logout() {
        this.userService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        this.routerExtensions.navigate(["/homepage"], { clearHistory: true,queryParams:{cash:this.retrait.cash,nomCashs:this.retrait.nomCash,nom:this.retrait.nomUser,token:this.token}});
    }


    onTakePhoto() {
        requestPermissions();
        let options = {
            width: this.width,
            height: this.height,
            keepAspectRatio: this.keepAspectRatio,
            saveToGallery: this.saveToGallery
        };

        takePicture(options)
            .then(imageAsset => {
                this.imageTaken = imageAsset;
                console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
            }).catch(err => {
                console.log(err.message);
            });
    }
    // << camera-module-photo-code

    // >> camera-module-perm-code
    onRequestPermissions() {
        requestPermissions();
    }
    // << camera-module-perm-code

    // >> camera-module-avai-code
    onCheckForCamera() {
        let isCameraAvailable = isAvailable();
        console.log("Is camera hardware available: " + isCameraAvailable);
    }
    // << camera-module-avai-code onCancel

    onCancel() {
       
        this.message = "";
        this.retrait.compte="";
    }

    onSave() {
    }

    submit() {

        this.serverUrl = "http://51.222.30.67:8080/api/api/planteur?matricule="+this.matricule;
        console.log(this.serverUrl);
        
        try {
            this.planteurService
            .GetData(this.serverUrl)
                .subscribe(res => {
                    if (!res.success) {
                        alert("Echec de recherche ! Compte introuvable");
                        return;
                    }
                    if (res.success) {
                        this.message='Nom Planteur :'+res.data.planteur.nom+'\n'
                        +'Prenom Planteur :'+res.data.planteur.prenom+'\n'
                        +'Type de Piece :'+res.data.planteur.typePiece+'\n'
                        +'Numero de Piece :'+res.data.planteur.numeroPiece+'\n'
                        +'Date Expiration :'+res.data.planteur.dateExpiration+'\n'
                        +'Téléphone :'+res.data.planteur.telephone+'\n'
                        +'Matricule :'+res.data.planteur.matricule;
                        this.retrait.compte=res.data.compte.idCompte;
                        console.log(this.retrait.compte);
                        console.log(this.retrait.cash);
                        this.routerExtensions.navigate(["/resume"], { clearHistory: true, queryParams: {message:this.message,token:this.token,cash:this.retrait.cash,compte:this.retrait.compte,nomCashs:this.retrait.nomCash,nom:this.retrait.nomUser} });  
                        
                       // alert("Enregistrement du planteur réussi. Matricule : " + this.message + " " + "Non : " + res.data.nom + " " + " Prenom : " + res.data.prenom);
                        
                    }
                });
        }
        catch (Exception) {
            alert("Echec d'enregistrement ! veuillez ressayer");
            return;
        }

    }

}


