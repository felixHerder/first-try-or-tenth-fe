import { Component, inject, OnInit, signal } from '@angular/core';
import { InstructorsTableComponent } from '@features/instructors/intructors-table/instructors-table.component';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { SessionsTableComponent } from '@features/sessions/sessions-table/sessions-table.component';
import { TraineesTableComponent } from '@features/trainees/trainees-table/trainees-table.component';
import {
  InstructorControllerApiService,
  InstructorSummaryDTO,
  SessionControllerApiService,
  SessionSummaryDTO,
  TraineeControllerApiService,
  TraineeSummaryDTO,
  VehicleControllerApiService,
  VehicleSummaryDTO
} from '@core/api/v1';
import { VehiclesTableComponent } from '@features/vehicles/vehicles-table/vehicles-table.component';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { AppRouteConfig } from '@/app.routes.config';

@Component({
  selector: 'app-dashboard',
  imports: [
    InstructorsTableComponent,
    NzDividerComponent,
    SessionsTableComponent,
    TraineesTableComponent,
    VehiclesTableComponent,
    NzIconDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private vehiclesApi = inject(VehicleControllerApiService);
  private sessionsApi = inject(SessionControllerApiService);
  private traineesApi = inject(TraineeControllerApiService);
  private instructorsApi = inject(InstructorControllerApiService);

  loading = signal<{
    vehicles: boolean;
    instructors: boolean;
    sessions: boolean;
    trainees: boolean;
  }>({ vehicles: false, instructors: false, sessions: false, trainees: false });
  vehicles = signal<VehicleSummaryDTO[]>([]);
  instructors = signal<InstructorSummaryDTO[]>([]);
  sessions = signal<SessionSummaryDTO[]>([]);
  trainees = signal<TraineeSummaryDTO[]>([]);

  ngOnInit(): void {
    this.loadSessions();
    this.loadTrainees();
    this.loadInstructors();
    this.loadVehicles();
  }

  private loadVehicles() {
    this.loading.update((prev) => ({ ...prev, vehicles: true }));
    this.vehiclesApi.getAll().subscribe({
      next: (vehicles) => {
        this.loading.update((prev) => ({ ...prev, vehicles: false }));
        this.vehicles.set(vehicles);
      },
      error: (err) => {
        this.loading.update((prev) => ({ ...prev, vehicles: false }));
        console.error(err);
      },
    });
  }

  private loadSessions() {
    this.loading.update((prev) => ({ ...prev, sessions: true }));
    this.sessionsApi.getAll2().subscribe({
      next: (sessions) => {
        this.loading.update((prev) => ({ ...prev, sessions: false }));
        this.sessions.set(sessions);
      },
      error: (err) => {
        this.loading.update((prev) => ({ ...prev, sessions: false }));
        console.error(err);
      },
    });
  }

  private loadTrainees() {
    this.loading.update((prev) => ({ ...prev, trainees: true }));
    this.traineesApi.getAll1().subscribe({
      next: (trainees) => {
        this.loading.update((prev) => ({ ...prev, trainees: false }));
        this.trainees.set(trainees);
      },
      error: (err) => {
        this.loading.update((prev) => ({ ...prev, trainees: false }));
        console.error(err);
      },
    });
  }

  private loadInstructors() {
    this.loading.update((prev) => ({ ...prev, instructors: true }));
    this.instructorsApi.getAll3().subscribe({
      next: (instructors) => {
        this.loading.update((prev) => ({ ...prev, instructors: false }));
        this.instructors.set(instructors);
      },
      error: (err) => {
        this.loading.update((prev) => ({ ...prev, instructors: false }));
        console.error(err);
      },
    });
  }

  protected readonly AppRouteConfig = AppRouteConfig;
}
