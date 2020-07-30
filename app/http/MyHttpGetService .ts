import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {response} from './response';



@Injectable()
export class MyHttpGetService 
{
    constructor(private http: HttpClient) { }
     //user:usertoken;
     //token="Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvdWF0dGFyYS5wZWRqb3VAeWFob28uZnIiLCJleHAiOjE1NTA4MzQwNTEsInJvbGVzIjpbXX0.7PypRwUbpwgqTVzsRt3vqDhVibC_z4i4tD24OAxMFx0"
    // private serveurUrl="http://192.168.43.199:8090/api/citerne";
    GetData(serveurUrl:string)
     {
        let options = this.createRequestOptions();
        return this.http.get<response>(serveurUrl, { headers: options });
     }
    private createRequestOptions()
     {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
           
        });
        return headers;
    }
}