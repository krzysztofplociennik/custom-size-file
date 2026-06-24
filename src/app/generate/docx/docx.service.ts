import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DocxService {

  generateDoxcFile(sizeInBytes: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('../worker/generate-content.worker', import.meta.url));

      worker.onmessage = ({ data: content }) => {
        worker.terminate();

        const text: string = content;

        const doc = new Document({
          sections:
            [
              {
                children:
                  [
                    new Paragraph(
                      {
                        children:
                          [
                            new TextRun(text)
                          ]
                      }
                    )
                  ]
              }
            ]
        });

        Packer.toBlob(doc)
          .then(async blob => {

            const originalBuffer = await blob.arrayBuffer();
            const currentSize = originalBuffer.byteLength;

            if (currentSize < sizeInBytes) {
              const paddingNeeded = sizeInBytes - currentSize;
              const paddingArray = new Uint8Array(paddingNeeded);

              const finalBlob = new Blob([originalBuffer, paddingArray], { type: blob.type });
              saveAs(finalBlob, `docx_${sizeInBytes}_bytes.docx`);
            } else {
              saveAs(blob, `docx_${sizeInBytes}_bytes.docx`);
            }
            resolve();
          })
          .catch(reject);
      };

      worker.onerror = (err) => {
        worker.terminate();
        reject(err);
      };
      worker.postMessage({ sizeInBytes });
    });
  }
}
