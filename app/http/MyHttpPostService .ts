import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {response} from './response';
import {Observable} from 'rxjs';
//import 'rxjs/operator/map';
//import { map } from "rxjs/operators";

@Injectable()
export class MyHttpPostService 
{
    
constructor(private http: HttpClient) { }

 posty:Observable<any>;
  post :Observable<any>;
    postData(serverUrl:string,data: any)
     {
        let options = this.createRequestOptions();
        return this.http.post<response>(serverUrl, data , { headers: options });
    }
    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            
        });
        return headers;
    }
}