import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  ruta: string;
  fechaAct: string = new Date().toISOString();

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { 
    router.events.subscribe((_: NavigationEnd) => {
      this.ruta = _.url;
    });
  }

  ngOnInit(): void {

  }

  logOut(){
    localStorage.removeItem('tokenFact');
    
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }
}
