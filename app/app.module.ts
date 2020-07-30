import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { registerElement } from "nativescript-angular";
import {MyHttpPostService} from "./http/MyHttpPostService ";
import {MyHttpPostDataService} from "./http/MyHttpPostDataService";
import {MyHttpGetService} from "./http/MyHttpGetService ";
import {HttpClientModule} from '@angular/common/http';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";

registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomePageComponent} from "./homepage/homepage.component";
import { SearchComponent } from "./search/search.component";
import { ResumeComponent } from "./resume/resume.component";
import { MaskedTextFieldModule } from "nativescript-masked-text-field/angular";
import { RetraitComponent } from "./retrait/retrait.component";
import { HomeComponent} from "./home/home.component";
import { KinveyModule, UserService as KinveyUserService } from "kinvey-nativescript-sdk/lib/angular";
import { UserService } from "./shared/user.service";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [

        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule,
        NativeScriptUIChartModule,
        NativeScriptUIDataFormModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptUIGaugeModule,
        NativeScriptCommonModule,
     
        NativeScriptFormsModule,

        NativeScriptUISideDrawerModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        HttpClientModule,
        MaskedTextFieldModule,
        KinveyModule.init({
            appKey: "kid_SyY8LYO8M",
            appSecret: "09282985d7c540f7b076a9c7fd884c77"
        })
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SearchComponent,
        ResumeComponent,
        RetraitComponent,
        HomePageComponent,
        HomeComponent
      
    ],
    providers: [
        UserService,
        MyHttpGetService,
        MyHttpPostService,
        MyHttpPostDataService,
       
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
