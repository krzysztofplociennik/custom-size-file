import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { GenerateService } from './generate/generate.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HomeComponent]
})
export class AppComponent {
  title = 'any-size-pdf';

  constructor(
    private generateService: GenerateService
  ) {}

  generate() {
    this.generateService.generateSimplePDF();
  }
}
