import { Component, signal } from '@angular/core';
import { SessionMasterDetailComponent } from './masterdetail';

@Component({
  imports: [SessionMasterDetailComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('focus-os');
}
