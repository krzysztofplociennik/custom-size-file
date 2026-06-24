import { Injectable } from '@angular/core';
import { DownloadUtils } from '../../shared/utils/download-utils';

@Injectable({
  providedIn: 'root'
})
export class TxtService {

  generateTxtFile(sizeInBytes: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('../worker/generate-content.worker', import.meta.url));
      worker.onmessage = ({ data: content }) => {
        DownloadUtils.downloadTxtFile(content, `size_${sizeInBytes}_chars.txt`);
        worker.terminate();
        resolve();
      };
      worker.onerror = (err) => { worker.terminate(); reject(err); };
      worker.postMessage({ sizeInBytes });
    });
  }

}
