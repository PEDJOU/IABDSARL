import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {response} from './response';
import {Observable} from 'rxjs';
//import 'rxjs/operator/map';
//import { map } from "rxjs/operators";

@Injectable()
export class MyHttpPostDataService 
{
    
constructor(private http: HttpClient) { }

 posty:Observable<any>;
  post :Observable<any>;
    postData(serverUrl:string,data: any,token:string)
     {
        let options = this.createRequestOptions(token);
        return this.http.post<response>(serverUrl, data , { headers: options });
    }
    private createRequestOptions(token:string) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": token
        });
        return headers;
    }
}