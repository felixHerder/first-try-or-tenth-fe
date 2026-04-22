import { Component } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';
import { LoaderComponent } from '@shared/components/loader/loader.component';

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
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  protected readonly date = new Date();
  protected readonly appNavPaths = Object.values(AppRouteConfig);
}
