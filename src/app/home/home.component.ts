import { Component } from '@angular/core';
import { RawGenerateService } from '../generate/pdf/raw-generate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent {
  stateOptions = [
    { label: 'txt', value: 'txt' },
    { label: 'pdf', value: 'pdf' },
    { label: 'docx', value: 'docx ' }
  ];

  value: string = 'off';

  constructor(private rawGenerate: RawGenerateService) {}

  doRawGenerate() {
    this.rawGenerate.generateRawPDF(9000);
  }
}
