import JSZip from 'jszip';

interface CodeFiles {
  html: string;
  css: string;
  javascript: string;
}

/**
 * Checks if a string is empty or contains only whitespace
 */
function isEmpty(content: string): boolean {
  return !content || content.trim().length === 0;
}

/**
 * Checks if HTML content is a full document (has <html> or <head> or <body> tags)
 */
function isFullDocument(html: string): boolean {
  const lowerHtml = html.toLowerCase();
  return lowerHtml.includes('<html') || lowerHtml.includes('<head') || lowerHtml.includes('<body');
}

/**
 * Wraps HTML snippet in a standard HTML5 boilerplate
 */
function wrapInBoilerplate(htmlSnippet: string, hasCss: boolean, hasJs: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Busya Project</title>${hasCss ? '\n  <link rel="stylesheet" href="style.css">' : ''}
</head>
<body>
  ${htmlSnippet}${hasJs ? '\n  <script src="script.js"></script>' : ''}
</body>
</html>`;
}

/**
 * Inserts CSS and JS links into a full HTML document
 */
function insertLinksIntoDocument(html: string, hasCss: boolean, hasJs: boolean): string {
  let modifiedHtml = html;

  // Insert CSS link in <head>
  if (hasCss) {
    const cssLink = '<link rel="stylesheet" href="style.css">';
    
    // Try to insert before closing </head> tag
    if (modifiedHtml.toLowerCase().includes('</head>')) {
      modifiedHtml = modifiedHtml.replace(
        /(<\/head>)/i,
        `  ${cssLink}\n$1`
      );
    } 
    // If no </head>, try to insert after opening <head> tag
    else if (modifiedHtml.toLowerCase().includes('<head>')) {
      modifiedHtml = modifiedHtml.replace(
        /(<head[^>]*>)/i,
        `$1\n  ${cssLink}`
      );
    }
    // If no <head> at all, insert at the beginning
    else {
      modifiedHtml = `${cssLink}\n${modifiedHtml}`;
    }
  }

  // Insert JS script before closing </body> tag
  if (hasJs) {
    const jsScript = '<script src="script.js"></script>';
    
    // Try to insert before closing </body> tag
    if (modifiedHtml.toLowerCase().includes('</body>')) {
      modifiedHtml = modifiedHtml.replace(
        /(<\/body>)/i,
        `  ${jsScript}\n$1`
      );
    }
    // If no </body>, insert at the end
    else {
      modifiedHtml = `${modifiedHtml}\n${jsScript}`;
    }
  }

  return modifiedHtml;
}

/**
 * Processes HTML content and adds CSS/JS links
 */
function processHtml(html: string, hasCss: boolean, hasJs: boolean): string {
  if (isFullDocument(html)) {
    // Full document: Insert links into existing structure
    return insertLinksIntoDocument(html, hasCss, hasJs);
  } else {
    // Snippet: Wrap in boilerplate
    return wrapInBoilerplate(html, hasCss, hasJs);
  }
}

/**
 * Downloads code files as a ZIP archive
 * 
 * @param files - Object containing HTML, CSS, and JavaScript code
 * @returns Promise that resolves when download is triggered, or rejects with error message
 */
export async function downloadAsZip(files: CodeFiles): Promise<void> {
  // Validate HTML (mandatory)
  if (isEmpty(files.html)) {
    throw new Error('HTML content is required. Please add some HTML code before downloading.');
  }

  // Check if CSS and JS are non-empty
  const hasCss = !isEmpty(files.css);
  const hasJs = !isEmpty(files.javascript);

  // Process HTML to include CSS/JS links
  const processedHtml = processHtml(files.html, hasCss, hasJs);

  // Create ZIP archive
  const zip = new JSZip();

  // Add index.html (always included)
  zip.file('index.html', processedHtml);

  // Add style.css (only if non-empty)
  if (hasCss) {
    zip.file('style.css', files.css);
  }

  // Add script.js (only if non-empty)
  if (hasJs) {
    zip.file('script.js', files.javascript);
  }

  // Generate ZIP blob
  const blob = await zip.generateAsync({ type: 'blob' });

  // Trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'busya-project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
