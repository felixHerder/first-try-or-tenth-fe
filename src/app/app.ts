import { Component, inject } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private loaderService = inject(LoaderService);
  private router = inject(Router);
  loading = this.loaderService.loading;

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading.set(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading.set(false);
      }
    });
  }
}
