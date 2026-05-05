import { Component, inject, OnInit, signal } from '@angular/core';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { TraineesTableComponent } from '@features/trainees/trainees-table/trainees-table.component';
import { TraineeControllerApiService, TraineeSummaryDTO } from '@core/api/v1';

@Component({
  selector: 'app-trainees-list',
  imports: [NzTypographyComponent, TraineesTableComponent],
  templateUrl: './trainees-list.component.html',
  styleUrl: './trainees-list.component.css',
})
export class TraineesListComponent implements OnInit {
  private traineeService = inject(TraineeControllerApiService);
  loading = signal<boolean>(false);
  trainees = signal<TraineeSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loading.set(true);
    this.traineeService.getAll1().subscribe({
      next: (trainees) => {
        this.loading.set(false);
        this.trainees.set(trainees);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
