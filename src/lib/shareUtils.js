import html2canvas from 'html2canvas';

export async function downloadShareCard(cardRef) {
  const canvas = await html2canvas(cardRef, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#f1ece4',
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'FOUND-Scorecard-Result.png';
      a.click();
      URL.revokeObjectURL(url);
      resolve();
    }, 'image/png');
  });
}

export function shareToLinkedIn() {
  const url = encodeURIComponent('https://scorecard.foundperform.com');
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    '_blank',
    'width=600,height=600'
  );
}
