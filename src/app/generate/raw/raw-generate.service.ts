import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RawGenerateService {

  constructor() {}

  generateRawPDF(dotCount: number): void {
    const dots = '.'.repeat(dotCount);
    // const dots = 'a'.repeat(dotCount);

    const content = `BT
/F1 24 Tf
100 100 Td
(${dots}) Tj
ET`;

    const contentLength = content.length;

    const pdfParts = [
      '%PDF-1.4\n',
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
      '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R >>\nendobj\n',
      `4 0 obj\n<< /Length ${contentLength} >>\nstream\n${content}\nendstream\nendobj\n`,
    ];

    // Manually calculate positions (very simple, good enough for small files)
    const offsets = [];
    let pos = 0;
    for (const part of pdfParts) {
      offsets.push(pos);
      pos += part.length;
    }

    const xref = [
      'xref\n0 5\n',
      '0000000000 65535 f \n',
      this.formatOffset(offsets[0]),
      this.formatOffset(offsets[1]),
      this.formatOffset(offsets[2]),
      this.formatOffset(offsets[3]),
    ].join('');

    const trailer = [
      'trailer\n<< /Root 1 0 R /Size 5 >>\nstartxref\n',
      pos.toString(),
      '\n%%EOF'
    ].join('');

    const pdfString = pdfParts.join('') + xref + trailer;

    this.downloadFile(pdfString, `raw_${dotCount}_dots.pdf`);
  }

  private formatOffset(offset: number): string {
    return offset.toString().padStart(10, '0') + ' 00000 n \n';
  }

  private downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
