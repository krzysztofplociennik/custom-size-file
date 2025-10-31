import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DocxService {
  generateDoxcFile(sizeInBytes: number) {
    const text = '.'.repeat(sizeInBytes);

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(text)],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `docx_${sizeInBytes}_chars.docx`);
    });
  }
}
