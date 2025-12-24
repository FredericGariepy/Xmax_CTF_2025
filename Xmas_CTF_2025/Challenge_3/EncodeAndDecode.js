`
examples of other Zero-width characters (Unicode code points)
  0x200B, // ZWSP
  0x200C, // ZWNJ
  0x200D, // ZWJ
  0x2060, // Word Joiner
  0xFEFF, // BOM
  0x115F, // Hangul Choseong Filler
  0x1160, // Hangul Jungseong Filler
  0x3164  // Hangul Filler

`

// ENCODER (STRING -> INVISIBLE UNICODE)
function textToInvisibleBinary(text) {
  const zero = '\u200B'; // 0 → ZWSP // Zero-width space (ZWSP) → Unicode U+200B
  const one  = '\u200C'; // 1 → ZWNJ // Zero-width non-joiner (ZWNJ) → Unicode U+200C

  let result = '';

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);  // Get character code (number)
    let binary = charCode.toString(2).padStart(8, '0'); ; // Convert to 8-bit binary string

    // Replace 0/1 with invisible characters
    binary = binary.replace(/0/g, zero).replace(/1/g, one);

    result += binary;
  }

  return result;
}

// Example
//const input = "alert(document.domain);" // https://bughunters.google.com/learn/invalid-reports/web-platform/xss/5108550411747328/when-reporting-xss-don-t-use-alert-1
// Store invisible output in a variable
//const invisibleEncoded = textToInvisibleBinary(input); //invisibleEncoded contains the invisible string
//console.log("here"+invisibleEncoded);


// DECODER  (INVISIBLE UNICODE -> STRING)
function invisibleBinaryToText(invisible) {
  const zero = '\u200B';
  const one  = '\u200C';

  let binary = '';
  for (const char of invisible) {
    if (char === zero) binary += '0';
    else if (char === one) binary += '1';
  }

  // Split into 8-bit chunks and convert to characters
  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    result += String.fromCharCode(parseInt(byte, 2));
  }

  return result;
}

// Example
//const decoded = invisibleBinaryToText(invisibleEncoded);
//console.log(decoded); //


// EXTRACTOR  (FILE -> INVISIBLE UNICODE)
function extractInvisibleChars(input) {
  const zero = '\u200B';
  const one  = '\u200C';

  let result = '';
  for (const char of input) {
    if (char === zero || char === one) {
      result += char;
    }
  }
  return result;
}
// ADD THIS LINE to make it work in the console:
window.extractInvisibleChars = extractInvisibleChars;