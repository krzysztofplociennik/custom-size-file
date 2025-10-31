import { Injectable } from '@angular/core';
import { DownloadUtils } from '../../shared/utils/download-utils';

@Injectable({
  providedIn: 'root'
})
export class TxtService {
  generateTxtFile(sizeInBytes: number) {
    const content = '.'.repeat(sizeInBytes);
    DownloadUtils.downloadTxtFile(content, `size_${sizeInBytes}_chars.txt`);
  }
}
