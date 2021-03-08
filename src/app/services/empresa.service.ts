import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  fechaAct: string = new Date().toISOString();

  constructor(
    private http: HttpClient,
  ) { }

  getEmpresa(){

    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/business';

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.business
                );
  }
  

  searchEmp(termino: string){
    let token = localStorage.getItem('tokenABT');
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/business/search/' + termino;

    return this.http.get( url, {headers} )
                .map( (resp: any) =>
                    resp.business
                );
  }

  addEmpresa(emp){
    let token = localStorage.getItem('tokenABT');
    
    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/business';

    const empresa = {
        ruc: emp.ruc,
        businessName: emp.razonSoc,
        agent: emp.representante,
        email: emp.correo,
        registration: moment().format()
    };

    return this.http.post( url, empresa, {headers} )
        .map((resp: any) =>
            resp
        );
  }

  desactivarEmp(idEmp){
    let token = localStorage.getItem('tokenABT');

    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/business/' + idEmp;

    return this.http.delete( url, {headers} )
                .map( (resp: any) =>
                    resp.business
                );
  }

  activarEmp(idEmp){
    let token = localStorage.getItem('tokenABT');

    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/business/habilitar/' + idEmp;

    return this.http.delete( url, {headers} )
                .map( (resp: any) =>
                    resp.business
                );
  }

  addSucursal(addSuc, idEmp){
    let token = localStorage.getItem('tokenABT');

    const headers = new HttpHeaders({
      token
    });

    const url = URL_SERVICE.url + '/branchOffice';

    const sucursal = {
        name: "Matriz",
        phone: addSuc.telefono,
        address: addSuc.direccion,
        canton: addSuc.canton,
        business: idEmp,
    };

    return this.http.post( url, sucursal, {headers} )
        .map((resp: any) =>
            resp
        );
  }
}
