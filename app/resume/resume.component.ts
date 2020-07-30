import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Planteur } from "../shared/planteur.model";
import { UserService } from "../shared/user.service";
import { FloatLabel } from "../float-label/float-label.component";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { ImageAsset } from 'tns-core-modules/image-asset';
import { takePicture, requestPermissions, isAvailable } from 'nativescript-camera';
import { MyHttpPostDataService } from "../http/MyHttpPostDataService";
import { ActivatedRoute } from "@angular/router";
import {Telephony} from 'nativescript-telephony';
import {Retrait} from "../shared/retrait.model";


@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./resume.component.html",
    styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

    public retrait:Retrait;
   
    public cameraImage: ImageAsset;
    public montant: number;
    public imageTaken: ImageAsset;
    public saveToGallery: boolean = true;
    public keepAspectRatio: boolean = true;
    public width: number = 70;
    public height: number = 70;
    public planteurs: Planteur;
    public message: String;
    public token: string;
    private serverUrl: string;
   

    constructor(private userService: UserService, private routerExtensions: RouterExtensions, private planteurService: MyHttpPostDataService, private activatedRoute: ActivatedRoute) {
        this.retrait=new Retrait();
        this.message = "";
    }

    ngOnInit(): void {
        this.message = "";
       
        this.activatedRoute.queryParams.subscribe(params => {
            this.message = params['message'];
            this.retrait.cash=params['cash'];
            this.retrait.compte=params['compte'];
            this.token=params['token'];
            this.retrait.nomUser=params['nom'];
            this.retrait.nomCash=params['nomCashs']
        });
    }

    logout() {
        this.userService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        this.routerExtensions.navigate(["/search"], { clearHistory: true,queryParams:{cash:this.retrait.cash,nomCashs:this.retrait.nomCash,nom:this.retrait.nomUser,token:this.token}});
        
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
    }

    onSave() {
    }

    submit() {

        if(this.montant>0)
        {
            this.serverUrl = "http://51.222.30.67:8080/api/api/debit";
        
        
            try {
                this.retrait.montant=this.montant;
                console.log(this.retrait.montant);
                console.log(this.montant);
                var valeur = JSON.stringify(this.retrait);
                console.log(valeur);
                this.planteurService
                .postData(this.serverUrl,valeur,this.token)
                    .subscribe(res => {
                        if (!res.success) {
                            alert(res.message);
                            return;
                        }
                        else
                        {
                            alert(res.message);
                            this.routerExtensions.navigate(["/login"], { clearHistory: true});
                        }
                    });
                }
                catch (Exception) {
                    alert("Echec d'operation ! veuillez ressayer");
                    return;
                }
        }
        else
        {
            alert("Echec d'operation ! veuillez donner un montant valide"); 
        }

    }

}


