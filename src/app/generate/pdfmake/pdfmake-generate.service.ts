import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfmakeGenerateService {

  constructor() {
    pdfMake.vfs = pdfFonts as any;
  }

  generateSimplePDF(): void {
    const docDefinition = {
      compress: false,
      content: [
        this.dot(10),
        // this.space(21),
      ]
    };

    pdfMake.createPdf(docDefinition).download('blank.pdf');
  }

  dotNewLine(times: number) {
    let stack = [];
    for (let index = 0; index < times; index++) {
      stack.push('.');
    }
    return stack;
  }

  dot(times: number) {
    return '.'.repeat(times);
  }

  space(times: number) {
    return ' '.repeat(times);
  }

  spaceNewLine(times: number) {
    let stack = [];
    for (let index = 0; index < times; index++) {
      stack.push(' ');
    }
    return stack;
  }
}
