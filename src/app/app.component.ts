import { Component } from '@angular/core';
import { PdfmakeGenerateService } from './generate/pdf/pdfmake/pdfmake-generate.service';
import { RawGenerateService } from './generate/pdf/raw/raw-generate.service';

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
    private generateService: PdfmakeGenerateService,
    private rawGenerate: RawGenerateService
  ) {}

  pdfmakeGenerate() {
    this.generateService.generateSimplePDF();
  }

  doRawGenerate() {
    // this.rawGenerate.generateRawPDF(110000);
    this.rawGenerate.generateRawPDF(9000);
  }
}
