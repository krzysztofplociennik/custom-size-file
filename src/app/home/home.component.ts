import { Component, OnInit } from '@angular/core';
import { PdfService } from '../generate/pdf/pdf.service';
import { TxtService } from '../generate/txt/txt.service';
import { DocxService } from '../generate/docx/docx.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {

  fileTypeOptions = [
    { label: 'txt', value: 'txt' },
    { label: 'docx', value: 'docx' },
    { label: 'pdf', value: 'pdf' },
  ];

  selectedFileType: string = 'txt';
  selectedSize: number = 22;
  selectedSizeUnit: SizeUnit | undefined;
  sizeUnits: SizeUnit[] | undefined;
  defaultSizeUnit: SizeUnit = { name: 'bytes', code: 'B' };

  constructor(
    private pdfService: PdfService,
    private txtService: TxtService,
    private docxService: DocxService
  ) {}

  ngOnInit() {
    this.sizeUnits = [
        { name: 'bytes', code: 'B' },
        { name: 'kilobytes', code: 'kB' },
        { name: 'megabytes', code: 'mB' },
    ];
    this.selectedSizeUnit = this.defaultSizeUnit;
  }

  onFileTypeChange(event: any) {
    this.selectedSize = this.getMinimalSize();
    this.selectedSizeUnit = this.defaultSizeUnit;
  }

  private getMinimalSize(): number {
    const type = this.selectedFileType;
    switch(type) {
      case 'txt': 
        return 1;
      case 'docx': 
        return 8000;
      case 'pdf': 
        return 446
      default: 
        throw new Error('Type not recognized! (EID: 202505031631)');
    }
  }

  generateByType() {
    const type = this.selectedFileType;

    const sizeInBytes = this.determineSize();

    switch(type) {
      case 'txt': 
        this.txtService.generateTxtFile(sizeInBytes);
        break;
      case 'docx': 
        this.docxService.generateDoxcFile(sizeInBytes);
        break;
      case 'pdf': 
        this.pdfService.generatePdfFile(sizeInBytes);
        break;
      default: 
        throw new Error('Type not recognized! (EID: 202505020956)');
    }
  }

  private determineSize() {
    if (!this.selectedSizeUnit) {
      return this.selectedSize;
    }

    switch(this.selectedSizeUnit.code) {
      case 'B': 
        return this.selectedSize;
      case 'kB': 
        return this.selectedSize * 1_000;
      case 'mB':
        return this.selectedSize * 1_000_000;
      default:
        throw new Error('Selected size unit is not recognized! (EID: 202505021119');
    }
  }
}

interface SizeUnit { 
  name: string;
  code: string;
}