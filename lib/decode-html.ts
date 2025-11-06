/**
 * Utility function to decode HTML entities in text strings.
 * Use this for non-React contexts like chart formatters, data processing, etc.
 * For React components, use the HtmlText component instead.
 * 
 * @example
 * decodeHtml('R&amp;R') // Returns: 'R&R'
 * decodeHtml('Rock &amp; Roll') // Returns: 'Rock & Roll'
 */
export function decodeHtml(text: string): string {
  if (typeof document === 'undefined') {
    // Server-side: use basic entity decoding
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
  }
  
  // Client-side: use textarea method for full HTML entity decoding
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

