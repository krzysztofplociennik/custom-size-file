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

  private static readonly maximumPdfSizeInBytes = 1_000_000;
  private static readonly maximumDocxSizeInBytes = 1_000_000;
  private static readonly maximumTxtSizeInBytes = 1_000_000;

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
  inputSize: number = HomeComponent.minimalTxtSizeInBytes;
  selectedSizeUnit: SizeUnit | undefined;
  sizeUnits: SizeUnit[] | undefined;
  defaultSizeUnit: SizeUnit = { name: HomeComponent.bytesLabel, code: HomeComponent.bytesCode };

  showMinimalValidSizeErrorMessage = false;
  showMaximumValidSizeErrorMessage = false;

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
    this.clearErrorMessages();
    this.inputSize = this.getMinimalSize();
    this.selectedSizeUnit = this.defaultSizeUnit;
  }

  onSizeUnitChange(event: any) {
    this.clearErrorMessages();
    if (this.isInputSizeLessThanMinimal()) {
      this.inputSize = this.getMinimalSize();
    }
  }

  private isInputSizeLessThanMinimal() {
    if (this.inputSize < HomeComponent.minimalTxtSizeInBytes) {
      return true;
    }
    if (this.inputSize < HomeComponent.minimalPdfSizeInBytes && this.selectedFileType === HomeComponent.pdfExtention && this.selectedSizeUnit?.code === HomeComponent.bytesCode) {
      return true;
    }
    if (this.inputSize < HomeComponent.minimalDocxSizeInBytes && this.selectedFileType === HomeComponent.documentExtention && this.selectedSizeUnit?.code === HomeComponent.bytesCode) {
      return true;
    }
    return false;
  }

  private isInputSizeMoreThanMaximum() {
    return this.inputSize > HomeComponent.maximumDocxSizeInBytes;
  }

  isInputSizeValid() {
    if (this.isInputSizeLessThanMinimal()) {
      this.showMinimalValidSizeErrorMessage = true;
      return false;
    }
    if (this.isInputSizeMoreThanMaximum()) {
      this.showMaximumValidSizeErrorMessage = true;
      return false;
    }
    return true;
  }

  private getMinimalSize(): number {
    const type = this.selectedFileType;
    switch(type) {
      case HomeComponent.textExtention: 
        return HomeComponent.minimalTxtSizeInBytes;
      case HomeComponent.documentExtention: 
        return HomeComponent.minimalDocxSizeInBytes;
      case HomeComponent.pdfExtention: 
        return HomeComponent.minimalPdfSizeInBytes;
      default: 
        throw new Error('Type not recognized! (EID: 202505031631)');
    }
  }

  generateByType() {
    this.clearErrorMessages();
    if (!this.isInputSizeValid()) {
      return;
    }

    const type = this.selectedFileType;
    const sizeInBytes = this.determineSize();

    switch(type) {
      case HomeComponent.textExtention: 
        this.txtService.generateTxtFile(sizeInBytes);
        break;
      case HomeComponent.documentExtention: 
        this.docxService.generateDoxcFile(sizeInBytes);
        break;
      case HomeComponent.pdfExtention: 
        this.pdfService.generatePdfFile(sizeInBytes);
        break;
      default: 
        throw new Error('Type not recognized! (EID: 202505020956)');
    }
  }

  private determineSize() {
    if (!this.selectedSizeUnit) {
      return this.inputSize;
    }

    switch(this.selectedSizeUnit.code) {
      case HomeComponent.bytesCode: 
        return this.inputSize;
      case HomeComponent.kilobytesCode: 
        return this.inputSize * 1_000;
      case HomeComponent.megabytesCode:
        return this.inputSize * 1_000_000;
      default:
        throw new Error('Selected size unit is not recognized! (EID: 202505021119');
    }
  }

  private clearErrorMessages() {
    this.showMinimalValidSizeErrorMessage = false;
    this.showMaximumValidSizeErrorMessage = false;
  }
}

interface SizeUnit { 
  name: string;
  code: string;
}