import { Component, input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { InstructorSummaryDTO } from '@core/api/v1';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructors-table',
  imports: [NzTableModule, RouterLink],
  templateUrl: './instructors-table.component.html',
  styleUrl: './instructors-table.component.css',
})
export class InstructorsTableComponent {
  instructors = input<InstructorSummaryDTO[]>([]);
  loading = input<Boolean>(false);
  pageSize = input<number>(5);
}
