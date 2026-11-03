with open('src/app/components/pfor/pfor-reo-email.generator.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update HTML English Section
old_html_mid = """      h += '<p>' + this.sharedState.getHtmlSignatureFr() + '</p>\\n';
      h += '<hr class="my-6 border-slate-200" />\\n';

      // ======================================
      // ENGLISH SECTION
      // ======================================"""

new_html_mid = """      h += '<p>' + this.sharedState.getHtmlSignatureFr() + '</p>\\n';
      const frHtml = h;

      // ======================================
      // ENGLISH SECTION
      // ======================================
      let hEn = "";"""

assert old_html_mid in content, 'old_html_mid not found'
content = content.replace(old_html_mid, new_html_mid, 1)

# Now in the English HTML section, replace h += with hEn +=
part1, rest = content.split('let hEn = "";', 1)
part2, part3 = rest.split('      return h;', 1)

part2_replaced = part2.replace('      h +=', '      hEn +=')

new_html_end = """      const enHtml = hEn;

      if (isEn) {
        return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">Un message en français suivra.</span></p>\\n' +
          enHtml +
          '<hr class="my-6 border-slate-200" />\\n' +
          frHtml;
      }
      return '<p><span style="background-color: yellow; font-weight: bold; padding: 2px 4px; border-radius: 3px;">English message will follow.</span></p>\\n' +
        frHtml +
        '<hr class="my-6 border-slate-200" />\\n' +
        enHtml;"""

content = part1 + 'let hEn = "";' + part2_replaced + new_html_end + part3

# 2. Update Plain Text Section
old_plain_start = """      // PLAIN TEXT VERSION
      let t = "";
      t += "English message will follow.\\n";
      t += "========================================\\n\\n";

      // French Plain Text"""

new_plain_start = """      // PLAIN TEXT VERSION
      let t = "";

      // French Plain Text"""

assert old_plain_start in content, 'old_plain_start not found'
content = content.replace(old_plain_start, new_plain_start, 1)

old_plain_mid = """      t += this.sharedState.getSignatureFr() + "\\n\\n";
      t += "------------------------------------------------------------\\n\\n";

      // English Plain Text"""

new_plain_mid = """      t += this.sharedState.getSignatureFr() + "\\n";
      const frPlain = t.trim();

      // English Plain Text
      let tEn = "";"""

assert old_plain_mid in content, 'old_plain_mid not found'
content = content.replace(old_plain_mid, new_plain_mid, 1)

# In English Plain section, replace t += with tEn +=
part1, rest = content.split('let tEn = "";', 1)
part2, part3 = rest.split('      return t;', 1)

part2_replaced = part2.replace('      t +=', '      tEn +=')

new_plain_end = """      const enPlain = tEn.trim();

      const divider = "\\n\\n______________________________________________________________________________\\n\\n";
      if (isEn) {
        return `Un message en français suivra.\\n\\n${enPlain}${divider}${frPlain}`;
      }
      return `English message will follow.\\n\\n${frPlain}${divider}${enPlain}`;"""

content = part1 + 'let tEn = "";' + part2_replaced + new_plain_end + part3

with open('src/app/components/pfor/pfor-reo-email.generator.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully updated pfor-reo-email.generator.ts')
