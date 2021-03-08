import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProvCantonService {

  constructor(
    private http: HttpClient,
  ) { }

  getProvincia(){
    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/province';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.province
                );
  }

  getCanton(idProv){
    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/canton/' + idProv;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.canton
                );
  }
}
