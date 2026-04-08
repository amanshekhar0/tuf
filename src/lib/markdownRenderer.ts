/** Simple markdown renderer: bold, italic, inline-code, unordered lists */
export function renderMarkdown(raw: string): string {
  const lines = raw.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    let processed = line
      // inline code: `code`
      .replace(/`(.+?)`/g, "<code>$1</code>")
      // bold: **text** (process before italic)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // italic: *text* (single asterisk, not already inside bold)
      .replace(/\*([^*]+?)\*/g, "<em>$1</em>")
      // strikethrough: ~~text~~
      .replace(/~~(.+?)~~/g, "<del>$1</del>");

    if (/^[-*] /.test(processed)) {
      result.push(`<li>${processed.slice(2)}</li>`);
    } else if (/^#{1,3} /.test(processed)) {
      const headingMatch = processed.match(/^(#+)/);
      const level = headingMatch ? headingMatch[1].length : 1;
      const text = processed.replace(/^#+\s/, "");
      result.push(`<h${level}>${text}</h${level}>`);
    } else if (processed.trim() === "") {
      result.push("<br/>");
    } else {
      result.push(`<p>${processed}</p>`);
    }
  }

  // Wrap consecutive <li> in <ul>
  const joined = result.join("\n");
  return joined.replace(
    /(<li>.*<\/li>\n?)+/g,
    (match) => `<ul>${match}</ul>`
  );
}
