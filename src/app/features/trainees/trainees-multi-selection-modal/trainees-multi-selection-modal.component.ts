import { Component, inject, input, linkedSignal, OnInit, output, signal } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTbodyComponent,
  NzTdAddOnComponent,
  NzTheadComponent,
  NzThMeasureDirective,
  NzTrDirective,
} from 'ng-zorro-antd/table';
import { TraineeControllerApiService, TraineeSummaryDTO } from '@core/api/v1';

@Component({
  selector: 'app-trainees-multi-selection-modal',
  imports: [
    NzModalModule,
    NzTableCellDirective,
    NzTableComponent,
    NzTbodyComponent,
    NzThMeasureDirective,
    NzTheadComponent,
    NzTrDirective,
    NzTdAddOnComponent,
  ],
  templateUrl: './trainees-multi-selection-modal.component.html',
  styleUrl: './trainees-multi-selection-modal.component.css',
})
export class TraineesMultiSelectionModalComponent implements OnInit {
  isOpen = input(false);
  traineeUuids = input<Set<string>>(new Set());
  checkedTraineeUuids = linkedSignal(() => this.traineeUuids());
  onOk = output<Set<string>>();
  onCancel = output();
  loading = signal(false);
  trainees = signal<TraineeSummaryDTO[]>([]);
  private traineesApi = inject(TraineeControllerApiService);

  ngOnInit(): void {
    this.loadTrainees();
  }

  onModalCancel() {
    this.onCancel.emit();
  }

  onModalOk() {
    this.onOk.emit(this.checkedTraineeUuids());
  }

  onCheckedChange(uuid: string, checked: boolean) {
    if (checked) {
      this.checkedTraineeUuids().add(uuid);
    } else {
      this.checkedTraineeUuids().delete(uuid);
    }
  }

  private loadTrainees() {
    this.loading.set(true);
    this.traineesApi.getAll1().subscribe({
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
