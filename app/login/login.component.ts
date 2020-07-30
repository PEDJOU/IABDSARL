import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { MyHttpPostService } from "../http/MyHttpPostService ";
import { User } from "../shared/user.model";
import { UserService } from "../shared/user.service";


@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    isLoggingIn = true;
    user: User;
    processing = false;
    private Done: boolean = false;

    //private serverUrl = "http://70.35.199.215:8080/AutorisationApi/api/session";


    private serverUrl = "http://51.222.30.67:8080/api/api/session";

    @ViewChild("password", { static: false }) password: ElementRef;
    @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;

    constructor(private page: Page, private userService: UserService, private routerExtensions: RouterExtensions, private loginService: MyHttpPostService, ) {
        this.page.actionBarHidden = true;
        this.user = new User();
        //this.user.email = "user@nativescript.org";
        // this.user.password = "password";
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.username || !this.user.password) {
            this.alert("Veuillez fournir à la fois une adresse électronique et un mot de passe.");
            return;
        }

        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        var usernames = JSON.stringify(this.user);
        console.log(usernames);
        this.processing = false;
        try {
            this.loginService
                .postData(this.serverUrl, usernames)
                .subscribe(res => {

                    if (res.success) {
                        this.Done = true;
                        // console.log("le token est pedjou"+res.data.token);
                        if (res.data.cash != null) {
                            this.routerExtensions.navigate(["/homepage"], { clearHistory: true, queryParams: { token: res.data.token,cash:res.data.cash.idCashPoint,nomCashs:res.data.cash.nomCash,nom:res.data.user.firstName } });
                        }
                        else {
                            alert("Echec de connexion ! Vous n'êtes pas autorisé !");
                            this.password=null;
                        }
                    }
                    else{
                        alert("Echec de connexion ! Compte introuvable");
                            this.password=null;
                    }
                });
        }
        catch (Exception) {


        }

        if (this.Done = false) {
            this.alert("Malheureusement, nous n'avons pas trouvé votre compte.");
        }

        /*  this.userService.login(this.user)
             .then(() => {
                 this.processing = false;
                 this.routerExtensions.navigate(["/home"], { clearHistory: true });
             })
             .catch(() => {
                 this.processing = false;
                 this.alert("Malheureusement, nous n'avons pas trouvé votre compte.");
             }); */
    }

    register() {
        /*  if (this.user.password != this.user.confirmPassword) {
             this.alert("Vos mots de passe ne correspondent pas.");
             return;
         }
         this.userService.register(this.user)
             .then(() => {
                 this.processing = false;
                 this.alert("Votre compte a été créé avec succès.");
                 this.isLoggingIn = true;
             })
             .catch(() => {
                 this.processing = false;
                 this.alert("Malheureusement, nous n'avons pas pu créer votre compte.");
             }); */
    }

    forgotPassword() {
        prompt({
            title: "Mot de passe oublié",
            message: "Entrez l'adresse e-mail que vous avez utilisée pour vous inscrire à IADB CONNECT afin de réinitialiser votre mot de passe.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Annuler"
        }).then((data) => {
            if (data.result) {
                this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Votre mot de passe a été réinitialisé avec succès. Veuillez vérifier votre courrier électronique pour savoir comment choisir un nouveau mot de passe.");
                    }).catch(() => {
                        this.alert("Malheureusement, une erreur s'est produite lors de la réinitialisation de votre mot de passe.");
                    });
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "IADB CONNECT",
            okButtonText: "OK",
            message: message
        });
    }
}

