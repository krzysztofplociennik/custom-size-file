
addEventListener('message', ({ data }: MessageEvent): void => {  
  const { sizeInBytes } = data;
  const content = '.'.repeat(sizeInBytes);
  postMessage(content);
});