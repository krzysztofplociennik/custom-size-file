/// <reference lib="webworker" />

addEventListener('message', ({ data }): void => {
  const { sizeInBytes } = data;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let generatedContent = '';

  for (let i = 0; i < sizeInBytes; i++) {
    generatedContent += chars[Math.floor(Math.random() * chars.length)];
  }

  postMessage(generatedContent);
});