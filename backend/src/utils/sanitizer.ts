/**
 * HTML Sanitizer for CMS Content
 * Handles content pasted from Microsoft Word and other sources
 * Removes dangerous elements while preserving safe formatting
 */

// Allowed HTML tags for content
const ALLOWED_TAGS = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span',
  'sup', 'sub'
];

// Allowed attributes per tag
const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height'],
  'td': ['colspan', 'rowspan'],
  'th': ['colspan', 'rowspan'],
  'div': ['class', 'id'],
  'span': ['class', 'id'],
  'p': ['class'],
  'h1': ['class', 'id'],
  'h2': ['class', 'id'],
  'h3': ['class', 'id'],
  'h4': ['class', 'id'],
  'h5': ['class', 'id'],
  'h6': ['class', 'id'],
  'ul': ['class'],
  'ol': ['class'],
  'li': ['class'],
  'table': ['class', 'border', 'cellpadding', 'cellspacing'],
  'blockquote': ['class'],
  'pre': ['class'],
  'code': ['class']
};

// Patterns to remove (Word-specific junk)
const WORD_CLEANUP_PATTERNS = [
  /<\?xml[^>]*>/gi,
  /<o:p[^>]*>.*?<\/o:p>/gi,
  /<w:[^>]*>.*?<\/w:[^>]*>/gi,
  /<m:[^>]*>.*?<\/m:[^>]*>/gi,
  /<!--\[if[^>]*>.*?<!\[endif\]-->/gi,
  /<!--.*?-->/gi,
  /<style[^>]*>.*?<\/style>/gi,
  /<script[^>]*>.*?<\/script>/gi,
  /<meta[^>]*>/gi,
  /<link[^>]*>/gi,
  /class="Mso[^"]*"/gi,
  /style="[^"]*mso-[^"]*"/gi,
  /<font[^>]*>/gi,
  /<\/font>/gi,
  /lang="[^"]*"/gi,
  /xml:lang="[^"]*"/gi,
  /<span\s*><\/span>/gi,
  /<p\s*><\/p>/gi,
  /&nbsp;/gi
];

/**
 * Sanitize HTML content
 * Removes dangerous elements and cleans up Word formatting
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let cleaned = html;

  // Remove Word-specific patterns
  for (const pattern of WORD_CLEANUP_PATTERNS) {
    cleaned = cleaned.replace(pattern, ' ');
  }

  // Remove all event handlers (onclick, onload, etc.)
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: and data: URLs
  cleaned = cleaned.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  cleaned = cleaned.replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""');
  cleaned = cleaned.replace(/href\s*=\s*["']data:[^"']*["']/gi, 'href="#"');

  // Remove style attributes with expressions
  cleaned = cleaned.replace(/style\s*=\s*["'][^"']*expression[^"']*["']/gi, '');

  // Remove disallowed tags but keep their content
  const tagPattern = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  cleaned = cleaned.replace(tagPattern, (match, tagName) => {
    const lowerTag = tagName.toLowerCase();
    if (ALLOWED_TAGS.includes(lowerTag)) {
      // Clean attributes for allowed tags
      return cleanAttributes(match, lowerTag);
    }
    // Remove disallowed tags
    return match.startsWith('</') ? '' : '';
  });

  // Clean up excessive whitespace
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/>\s+</g, '><');
  cleaned = cleaned.trim();

  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, '');
  cleaned = cleaned.replace(/<div>\s*<\/div>/gi, '');
  cleaned = cleaned.replace(/<span>\s*<\/span>/gi, '');

  return cleaned;
}

/**
 * Clean attributes from a tag, keeping only allowed ones
 */
function cleanAttributes(tag: string, tagName: string): string {
  const allowedAttrs = ALLOWED_ATTRIBUTES[tagName] || [];
  
  // If no attributes allowed, return simple tag
  if (allowedAttrs.length === 0) {
    if (tag.startsWith('</')) {
      return `</${tagName}>`;
    }
    const selfClosing = tag.endsWith('/>');
    return selfClosing ? `<${tagName} />` : `<${tagName}>`;
  }

  // Extract and filter attributes
  const attrPattern = /([a-z][a-z0-9-]*)\s*=\s*["']([^"']*)["']/gi;
  const attrs: string[] = [];
  let match;

  while ((match = attrPattern.exec(tag)) !== null) {
    const attrName = match[1].toLowerCase();
    const attrValue = match[2];

    if (allowedAttrs.includes(attrName)) {
      // Additional validation for specific attributes
      if (attrName === 'href' || attrName === 'src') {
        if (isValidUrl(attrValue)) {
          attrs.push(`${attrName}="${escapeAttrValue(attrValue)}"`);
        }
      } else if (attrName === 'class' || attrName === 'id') {
        // Only allow alphanumeric, hyphens, underscores
        const cleanValue = attrValue.replace(/[^a-zA-Z0-9\s_-]/g, '');
        if (cleanValue) {
          attrs.push(`${attrName}="${escapeAttrValue(cleanValue)}"`);
        }
      } else {
        attrs.push(`${attrName}="${escapeAttrValue(attrValue)}"`);
      }
    }
  }

  if (tag.startsWith('</')) {
    return `</${tagName}>`;
  }

  const selfClosing = tag.endsWith('/>');
  const attrString = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  return selfClosing ? `<${tagName}${attrString} />` : `<${tagName}${attrString}>`;
}

/**
 * Validate URL for href/src attributes
 */
function isValidUrl(url: string): boolean {
  if (!url) return false;
  
  // Allow relative URLs
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }

  // Allow http, https, mailto, tel
  const validProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  try {
    const parsed = new URL(url);
    return validProtocols.includes(parsed.protocol);
  } catch {
    // If URL parsing fails, check if it's a simple relative path
    return /^[a-zA-Z0-9._\-/]+$/.test(url);
  }
}

/**
 * Escape attribute value to prevent XSS
 */
function escapeAttrValue(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Convert plain text to HTML paragraphs
 */
export function textToHtml(text: string): string {
  if (!text) return '';
  
  return text
    .split(/\n\n+/)
    .map(para => `<p>${escapeHtml(para.trim())}</p>`)
    .join('\n');
}

/**
 * Escape HTML entities in plain text
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strip all HTML tags, returning plain text
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
