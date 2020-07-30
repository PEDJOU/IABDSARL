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

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    public cameraImage: ImageAsset;

    public imageTaken: ImageAsset;
    public saveToGallery: boolean = true;
    public keepAspectRatio: boolean = true;
    public width: number = 70;
    public height: number = 70;
    public planteurs: Planteur;
    public message: String;
    public token: string;

    private serverUrl = "http://70.35.199.215:8080/api/planteurmobile";



    constructor(private userService: UserService, private routerExtensions: RouterExtensions, private planteurService: MyHttpPostDataService, private activatedRoute: ActivatedRoute) {
        this.planteurs = new Planteur();
        this.message = "";
    }

    ngOnInit(): void {
        this.message = "";

        this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token'];
        });

    }

    logout() {
        this.userService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    onNavBtnTap() {
        // This code will be called only in Android.
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
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
        this.planteurs.prenom = "";
        this.planteurs.nom = "";
        this.planteurs.contact = "";
        this.message = "";
    }

    onSave() {
    }

    submit() {
        console.log(this.planteurs.contact);
        var plan = JSON.stringify(this.planteurs);
        console.log("la valeur du planteur est :" + plan);
        try {
            this.planteurService
                .postData(this.serverUrl, plan, this.token)
                .subscribe(res => {
                    if (!res.success) {
                        alert("Echec d'enregistrement ! veuillez ressayer");
                        return;
                    }
                    if (res.success) {
                        this.message = res.data.matricule;
                        alert("Enregistrement du planteur réussi. Matricule : " + this.message +" "+"Non : "+res.data.nom+" "+" Prenom : "+res.data.prenom);
                        this.planteurs.prenom = "";
                        this.planteurs.nom = "";
                        this.planteurs.contact = "";
                    }
                });
        }
        catch (Exception) {
            alert("Echec d'enregistrement ! veuillez ressayer");
            return;
        }

    }

}


