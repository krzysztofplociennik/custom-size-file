import { Injectable } from '@angular/core';
import { DownloadUtils } from '../../shared/utils/download-utils';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  generatePdfFile(sizeInBytes: number): Promise<void> {
    return new Promise((resolve, reject) => {

      const worker = new Worker(new URL('../worker/generate-content.worker', import.meta.url));

      worker.onmessage = ({ data: generatedContent }) => {
        worker.terminate();
        const pdfString = this.createPdfString(generatedContent, sizeInBytes);
        DownloadUtils.downloadPdfFile(pdfString, `size_${sizeInBytes}_chars.pdf`);
        resolve();
      };

      worker.onerror = (err) => {
        worker.terminate();
        reject(err);
      };
      worker.postMessage({ sizeInBytes: sizeInBytes });

    });
  }

  private createPdfString(generatedContent: string, targetSizeInBytes: number) {
    const content = `BT
/F1 24 Tf
100 100 Td
(${generatedContent}) Tj
ET`;

    const contentLength = content.length;
    const header = '%PDF-1.4\n';

    const pdfObjects = [
      '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
      '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 500 300] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\nendobj\n',
      `4 0 obj\n<< /Length ${contentLength} >>\nstream\n${content}\nendstream\nendobj\n`,
    ];

    const offsets = [];
    let pos = header.length;

    for (const obj of pdfObjects) {
      offsets.push(pos);
      pos += obj.length;
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

    let pdfString = header + pdfObjects.join('') + xref + trailer;

    const currentSizeInBytes = new TextEncoder().encode(pdfString).length;

    if (currentSizeInBytes < targetSizeInBytes) {
      const paddingNeeded = targetSizeInBytes - currentSizeInBytes - 2;
      if (paddingNeeded > 0) {
        const paddingStr = '\n%' + 'X'.repeat(paddingNeeded);
        pdfString += paddingStr;
      }
    }

    return pdfString;
  }

  private formatOffset(offset: number): string {
    return offset.toString().padStart(10, '0') + ' 00000 n \n';
  }
}
