import fs from 'fs';
import path from 'path';

export function replaceImports(filePath, aliases) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  content = content.replace(/import\s+.*?\s+from\s+['"](.+?)['"]/g, (match, importPath) => {
    if (importPath.startsWith('.')) {
      const absolutePath = path.resolve(path.dirname(filePath), importPath);

      for (const { alias, target } of aliases) {
        const isWithinAlias = absolutePath.startsWith(target);
        const isFileInsideAlias = filePath.startsWith(target);

        if (isWithinAlias && !isFileInsideAlias) {
          const aliasPath = absolutePath.replace(target, alias).replace(/\\/g, '/');
          updated = true;
          return match.replace(importPath, aliasPath);
        }
      }
    }
    return match;
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  }
}
