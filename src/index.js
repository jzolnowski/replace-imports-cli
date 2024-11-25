import { getFiles } from './files.js';
import { replaceImports } from './replace-imports.js';
import { getAliases } from './tsconfig.js';

export async function replaceAllImportsWithAliases(projectDir, tsconfigPath, extensions) {
  try {
    const aliases = getAliases(tsconfigPath);
    const files = getFiles(projectDir, extensions);

    for (const file of files) {
      replaceImports(file, aliases);
    }

    console.log('\nAll imports updated successfully! 🎉');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}
