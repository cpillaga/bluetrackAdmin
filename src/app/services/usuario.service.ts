import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  addEmpleado(user, idSuc){
    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/user';

    const usuario = {
        name: 'Administrador'.toUpperCase(),
        email: 'default@bluetrack.com',
        user: user.usuario,
        password: '1234',
        phone: '9999999999',
        address: 'Default'.toUpperCase(),
        role: 'Operador',
        branchOffice: idSuc
    };

    return this.http.post( url, usuario, {headers} )
        .map((resp: any) =>
            resp
        );
  }
}
