import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestao-cursos-app';
}
