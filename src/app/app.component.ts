import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HomeComponent]
})
export class AppComponent {
  title = 'any-size-pdf';

  constructor(
    private home: HomeComponent
  ) {}

  generate() {
    this.home.generatePdf()
  }
}
