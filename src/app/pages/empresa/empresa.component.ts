import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../services/empresa.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ProvCantonService } from '../../services/provCanton.service';
import { Province } from '../../models/provincias';
import { Canton } from '../../models/canton';
import { Business } from '../../models/business.model';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: []
})
export class EmpresaComponent implements OnInit {
  empresas: Business[] = [];
  
  provincias: Province[] = [];
  cantones: Canton[] = [];
  coincidencia: boolean = true;
  ruc: string = "";
  buscarEmp = "";
  contEmp = 0;

  @ViewChild('closebuttonadd',  {static: false}) closebuttonadd;
  @ViewChild('closebuttonupd',  {static: false}) closebuttonupd;

  constructor(
    public _provCant: ProvCantonService,
    public _empresaService: EmpresaService,
    public _usuarioService: UsuarioService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('tokenABT') == null){
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }

    this.getProvincia();
    this.getEmpresa();
  }

  getProvincia(){
    this._provCant.getProvincia().subscribe(correcto => {
      this.provincias = correcto;
    });
  }

  getCanton(idProv){
    this._provCant.getCanton(idProv).subscribe(correcto => {
      this.cantones = correcto;
    });
  }

  getEmpresa(){
    this._empresaService.getEmpresa().subscribe(correcto => {
      this.contEmp = correcto.length;
      this.empresas = correcto;
    });
  }

  searchEmpresa(buscar: NgForm){
    if(buscar.value.buscarEmp == "" ){
      this.coincidencia = true;
      this.getEmpresa();
    }else{
      this._empresaService.searchEmp(buscar.value.buscarEmp).subscribe(correcto => {
        if(correcto.length === 0 ){
            this.coincidencia = false;
            return;
        }else{
          this.coincidencia = true;
          this.empresas = correcto;
        }
      });
    }
  }

  addEmpresa(addEmp: NgForm){
    this._empresaService.addEmpresa(addEmp.value).subscribe(correcto => {
      this._empresaService.addSucursal(addEmp.value, correcto.business._id).subscribe(correcto1 => {
        this._usuarioService.addEmpleado(addEmp.value, correcto1.branchOffice._id).subscribe(correcto2 => {
          this.getEmpresa();
          this.closebuttonadd.nativeElement.click();
          this.toastr.success('Agregado Correctamente', 'Correcto');
        });
      });
    });
  }

  desactivarEmp(idEmp){
    this._empresaService.desactivarEmp(idEmp).subscribe(correcto => {
      this.getEmpresa();
      this.toastr.success('Desactivado Correctamente', 'Correcto');
    })
  }

  activarEmp(idEmp){
    this._empresaService.activarEmp(idEmp).subscribe(correcto => {
      this.getEmpresa();
      this.toastr.success('Activado Correctamente', 'Correcto');
    });
  }
}
