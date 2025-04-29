import { Component } from '@angular/core';
import { RawGenerateService } from './generate/pdf/raw-generate.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'any-size-file';

  constructor(
    private rawGenerate: RawGenerateService
  ) {}

  doRawGenerate() {
    // this.rawGenerate.generateRawPDF(110000);
    this.rawGenerate.generateRawPDF(9000);
  }
}
