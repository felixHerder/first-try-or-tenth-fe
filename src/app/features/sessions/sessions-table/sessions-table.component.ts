import { Component, input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink } from '@angular/router';
import { SessionSummaryDTO } from '@core/api/v1';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sessions-table',
  imports: [NzTableModule, RouterLink, DatePipe],
  templateUrl: './sessions-table.component.html',
  styleUrl: './sessions-table.component.css',
})
export class SessionsTableComponent {
  sessions = input<SessionSummaryDTO[]>([]);
  loading = input<Boolean>(false);
  pageSize = input<number>(5);
}
