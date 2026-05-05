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
import { InstructorControllerApiService, InstructorSummaryDTO } from '@core/api/v1';

@Component({
  selector: 'app-instructors-multi-selection-modal',
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
  templateUrl: './instructors-multi-selection-modal.component.html',
  styleUrl: './instructors-multi-selection-modal.component.css',
})
export class InstructorsMultiSelectionModalComponent implements OnInit {
  isOpen = input(false);
  singleSelection = input(false);
  instructorUuids = input<Set<string>>(new Set());
  checkedInstructorUuids = linkedSignal(() => this.instructorUuids());
  onOk = output<Set<string>>();
  onCancel = output();
  loading = signal(false);
  instructors = signal<InstructorSummaryDTO[]>([]);
  private instructorsApi = inject(InstructorControllerApiService);

  ngOnInit(): void {
    this.loadInstructors();
  }

  onModalCancel() {
    this.onCancel.emit();
  }

  onModalOk() {
    this.onOk.emit(this.checkedInstructorUuids());
  }

  onCheckedChange(uuid: string, checked: boolean) {
    if (uuid && this.singleSelection()) {
      this.checkedInstructorUuids().clear();
    }
    if (checked) {
      this.checkedInstructorUuids().add(uuid);
    } else {
      this.checkedInstructorUuids().delete(uuid);
    }
  }

  private loadInstructors() {
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
