import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('tokenABT') == null){
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }
  }

}
