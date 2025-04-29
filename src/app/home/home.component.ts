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
    { label: 'One-Way', value: 'one-way' },
    { label: 'Return', value: 'return' }
  ];

  value: string = 'off';

  constructor(private rawGenerate: RawGenerateService) {}

  doRawGenerate() {
    this.rawGenerate.generateRawPDF(9000);
  }
}
