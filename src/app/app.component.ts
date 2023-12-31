import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/usuario.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-topicos2-2023-2';
  isLoginPage: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isLoginPage = (event.url.includes('/auth') || event.url.includes('/login') || event.url.includes('subscribe'));
      });
  }

}
