import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { SessionsTableComponent } from '@features/sessions/sessions-table/sessions-table.component';
import { AppRouteConfig } from '@/app.routes.config';
import { RouterLink } from '@angular/router';
import { SessionControllerApiService, SessionSummaryDTO } from '@core/api/v1';

@Component({
  selector: 'app-sessions-list',
  imports: [
    NzButtonComponent,
    NzFlexDirective,
    NzIconDirective,
    SessionsTableComponent,
    RouterLink,
  ],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.css',
})
export class SessionsListComponent implements OnInit {
  protected readonly AppRouteConfig = AppRouteConfig;
  private sessionService = inject(SessionControllerApiService);
  loading = signal<boolean>(false);
  sessions = signal<SessionSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loading.set(true);
    this.sessionService.getAll2().subscribe({
      next: (sessions) => {
        this.loading.set(false);
        this.sessions.set(sessions);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
