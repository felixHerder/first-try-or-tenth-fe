import { Component } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';
import { Logo } from '../../logo/logo';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-auth-layout',
  imports: [NzLayoutModule, RouterOutlet, Logo, LoaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
