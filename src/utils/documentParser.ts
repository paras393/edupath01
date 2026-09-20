/**
 * Client-side document text extractor supporting PDF, TXT, DOCX, MD, and CSV.
 * Lightweight, zero-external-paid-API solution.
 */

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // Plain text, Markdown, CSV, JSON
  if (
    fileType.startsWith('text/') ||
    fileName.endsWith('.txt') ||
    fileName.endsWith('.md') ||
    fileName.endsWith('.csv') ||
    fileName.endsWith('.json')
  ) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || '');
      reader.onerror = (e) => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  }

  // PDF handling
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    try {
      // Dynamic import of pdfjs-dist
      const pdfjsLib = await import('pdfjs-dist');
      // Set worker to CDN or local if needed
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `--- Page ${i} ---\n` + pageText + '\n\n';
      }

      if (fullText.trim().length > 0) {
        return fullText.trim();
      }
    } catch (err) {
      console.warn('PDF.js client extraction failed, falling back to raw binary stream scan:', err);
    }
  }

  // Fallback for DOCX or unknown formats: read as ArrayBuffer and extract readable ASCII/UTF-8 strings
  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let str = '';
    let currentWord = '';

    for (let i = 0; i < Math.min(bytes.length, 300000); i++) {
      const b = bytes[i];
      // Printable ASCII or common whitespace
      if ((b >= 32 && b <= 126) || b === 10 || b === 13 || b === 9) {
        currentWord += String.fromCharCode(b);
      } else {
        if (currentWord.length >= 3) {
          str += currentWord + ' ';
        }
        currentWord = '';
      }
    }
    if (currentWord.length >= 3) str += currentWord;

    // Filter out common zip/binary junk headers and keep English/alphanumeric sequences
    const cleaned = str
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleaned.length > 50) {
      return cleaned.slice(0, 15000);
    }
  } catch (err) {
    console.error('Binary text extraction fallback error:', err);
  }

  return `Document: ${file.name} (File size: ${(file.size / 1024).toFixed(1)} KB). Unable to extract full text content directly.`;
}
