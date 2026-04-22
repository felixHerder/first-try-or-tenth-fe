import { Component, inject } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loader',
  imports: [NzSpinComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  isLoading = this.loaderService.loading;
}
