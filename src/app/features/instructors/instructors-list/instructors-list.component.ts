import { Component, inject, OnInit, signal } from '@angular/core';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { InstructorsTableComponent } from '@features/instructors/intructors-table/instructors-table.component';
import { InstructorControllerApiService, InstructorSummaryDTO } from '@core/api/v1';

@Component({
  selector: 'app-instructors-list',
  imports: [NzTypographyComponent, InstructorsTableComponent],
  templateUrl: './instructors-list.component.html',
  styleUrl: './instructors-list.component.css',
})
export class InstructorsListComponent implements OnInit {
  private instructorsApi = inject(InstructorControllerApiService);
  loading = signal<boolean>(false);
  instructors = signal<InstructorSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loading.set(true);
    this.instructorsApi.getAll3().subscribe({
      next: (instructors) => {
        this.loading.set(false);
        this.instructors.set(instructors);
      },
      error: (err) => {
        this.loading.set(false);
        throw new Error(err);
      },
    });
  }
}
