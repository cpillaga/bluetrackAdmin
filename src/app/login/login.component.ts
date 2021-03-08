import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  email: string = "";

  constructor(
    public router: Router,
    public _adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  public login(forma: NgForm){

    if(forma.invalid) {
      return;
    }
  
    this._adminService.login(forma.value.email, forma.value.password)
      .subscribe(correcto =>
          {
            localStorage.setItem('tokenABT', correcto.token);
            this.router.navigate(['/empresa']);
          },
          error => {
            Swal.fire({
              icon: 'error',
              text: error.errors.message,
              showClass: {
                popup: 'animated fadeInDown faster'
              },
              hideClass: {
                popup: 'animated fadeOutUp faster'
              }
            });
          }
      )
  }

}
