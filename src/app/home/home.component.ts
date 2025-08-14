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

  private static readonly minimalPdfSizeInBytes = 446;
  private static readonly minimalDocxSizeInBytes = 8000;
  private static readonly minimalTxtSizeInBytes = 1;

  private static readonly textExtention = 'txt';
  private static readonly documentExtention = 'docx';
  private static readonly pdfExtention = 'pdf';

  private static readonly bytesLabel = 'bytes';
  private static readonly kilobytesLabel = 'kilobytes';
  private static readonly megabyteslabel = 'megabytes';
  private static readonly bytesCode = 'B';
  private static readonly kilobytesCode = 'kB';
  private static readonly megabytesCode = 'mB';

  fileTypeOptions = [
    { label: HomeComponent.textExtention, value: HomeComponent.textExtention },
    { label: HomeComponent.documentExtention, value: HomeComponent.documentExtention },
    { label: HomeComponent.pdfExtention, value: HomeComponent.pdfExtention },
  ];

  selectedFileType: string = HomeComponent.textExtention;
  selectedSize: number = HomeComponent.minimalTxtSizeInBytes;
  selectedSizeUnit: SizeUnit | undefined;
  sizeUnits: SizeUnit[] | undefined;
  defaultSizeUnit: SizeUnit = { name: HomeComponent.bytesLabel, code: HomeComponent.bytesCode };

  constructor(
    private pdfService: PdfService,
    private txtService: TxtService,
    private docxService: DocxService
  ) {}

  ngOnInit() {
    this.sizeUnits = [
        { name: HomeComponent.bytesLabel, code: HomeComponent.bytesCode },
        { name: HomeComponent.kilobytesLabel, code: HomeComponent.kilobytesCode },
        { name: HomeComponent.megabyteslabel, code: HomeComponent.megabytesCode },
    ];
    this.selectedSizeUnit = this.defaultSizeUnit;
  }

  onFileTypeChange(event: any) {
    this.selectedSize = this.getMinimalSize();
    this.selectedSizeUnit = this.defaultSizeUnit;
  }

  onSizeUnitChange(event: any) {
    if (!this.isInputSizeValid()) {
      this.selectedSize = this.getMinimalSize();
    }
  }

  private isInputSizeValid() {
    if (this.selectedSize < HomeComponent.minimalTxtSizeInBytes) {
      return false;
    }
    if (this.selectedSize < HomeComponent.minimalPdfSizeInBytes && this.selectedFileType === HomeComponent.pdfExtention && this.selectedSizeUnit?.code === HomeComponent.bytesCode) {
      return false;
    }
    if (this.selectedSize < HomeComponent.minimalDocxSizeInBytes && this.selectedFileType === HomeComponent.documentExtention && this.selectedSizeUnit?.code === HomeComponent.bytesCode) {
      return false;
    }
    return true;
  }

  private getMinimalSize(): number {
    const type = this.selectedFileType;
    switch(type) {
      case 'txt': 
        return HomeComponent.minimalTxtSizeInBytes;
      case 'docx': 
        return HomeComponent.minimalDocxSizeInBytes;
      case 'pdf': 
        return HomeComponent.minimalPdfSizeInBytes;
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