import { Injectable } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  constructor() {
    pdfMake.vfs = pdfFonts as any;
  }

  generateSimplePDF(): void {
    const docDefinition = {
      content: [
        this.dot(84),
      ]
    };

    pdfMake.createPdf(docDefinition).download('blank.pdf');
  }

  dotWithNewLine(times: number) {
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

  spaceWithNewLine(times: number) {
    let stack = [];
    for (let index = 0; index < times; index++) {
      stack.push(' ');
    }
    return stack;
  }
}
