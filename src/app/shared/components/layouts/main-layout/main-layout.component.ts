import { Component, inject, OnInit, signal } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { AuthService } from '@core/services/auth.service';
import {
  NzPageHeaderComponent,
  NzPageHeaderSubtitleDirective,
  NzPageHeaderTitleDirective,
} from 'ng-zorro-antd/page-header';
import { filter, map, startWith } from 'rxjs';

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
    NzPageHeaderComponent,
    NzPageHeaderTitleDirective,
    NzPageHeaderSubtitleDirective,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  protected readonly date = new Date();
  protected readonly appNavPaths = Object.values(AppRouteConfig);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  title = signal('');
  subtitle = signal('');

  ngOnInit(): void {
    this.router.events
      .pipe(
        // 1. Filter for the end of the navigation cycle
        filter((event) => event instanceof NavigationEnd),
        // 2. StartWith ensures logic runs immediately on load, even if no nav event just happened
        startWith(null),
        map(() => {
          let child = this.route.root;
          while (child.firstChild) {
            child = child.firstChild;
          }
          return child.snapshot.data;
        }),
      )
      .subscribe((data) => {
        this.title.set(data['title']);
        this.subtitle.set(data['subtitle']);
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }

  protected onBack() {
    let active = this.route;
    while (active.firstChild) {
      active = active.firstChild;
    }
    this.router.navigate(['../'], { relativeTo: active }).then();
  }
}
