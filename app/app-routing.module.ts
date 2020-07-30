import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ResumeComponent } from "./resume/resume.component";
import { RetraitComponent } from "./retrait/retrait.component";
import { HomePageComponent} from "./homepage/homepage.component";
import { HomeComponent} from "./home/home.component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "homepage", component: HomePageComponent },
    { path: "home", component: HomeComponent },
    { path: "search", component: SearchComponent },
    { path: "resume", component: ResumeComponent },
    { path: "retrait", component: RetraitComponent },
   
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
