import {Component} from '@angular/core';

import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Logo} from '../../shared/logo/logo';

@Component({
  selector: 'app-auth-layout',
  imports: [NzLayoutModule, RouterOutlet, Logo],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
}
