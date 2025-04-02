import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoginRoute = false;

  constructor(private router: Router) {
    // Verificar a rota atual a cada navegação
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.isLoginRoute = (event as NavigationEnd).url === '/login';
    });
  }
}
