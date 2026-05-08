import { Component, inject } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzTypographyComponent,
    RouterOutlet,
    RouterLink,
    LoaderComponent,
    NzButtonComponent,
    NzFlexDirective,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  protected readonly date = new Date();
  protected readonly appNavPaths = Object.values(AppRouteConfig);
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']).then();
  }
}
