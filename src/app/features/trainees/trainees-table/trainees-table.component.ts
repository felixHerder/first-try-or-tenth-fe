import { Component, input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TraineeSummaryDTO } from '@core/api/v1';
import { RouterLink } from '@angular/router';
import { AppRouteConfig } from '@/app.routes.config';

@Component({
  selector: 'app-trainees-table',
  imports: [NzTableModule, RouterLink],
  templateUrl: './trainees-table.component.html',
  styleUrl: './trainees-table.component.css',
})
export class TraineesTableComponent {
  trainees = input<TraineeSummaryDTO[]>([]);
  loading = input<Boolean>(false);
  pageSize = input<number>(5);
  protected readonly AppRouteConfig = AppRouteConfig;
}
