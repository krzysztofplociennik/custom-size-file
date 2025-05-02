export class DownloadUtils {

    static downloadTxtFile(data: string, filename: string) {
        const blob = new Blob([data], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
      
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      
        window.URL.revokeObjectURL(url);
    }

    static downloadPdfFile(data: string, filename: string) {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    
        window.URL.revokeObjectURL(url);
    }
}