import fs from 'fs-extra';
import path from 'path';
import { errorMessage } from './constants.js';

export function getAliases(tsconfigPath) {
  try {
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf8');

    const cleanedContent = tsconfigContent
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .trim();

    const tsconfig = JSON.parse(cleanedContent);

    if (!tsconfig) {
      throw new Error(errorMessage.TSCONFIG_PARSE_ERROR);
    }

    const compilerOptions = tsconfig.compilerOptions;
    if (!compilerOptions || !compilerOptions.paths) {
      throw new Error(errorMessage.MISSING_PATHS);
    }

    const baseUrl = path.resolve(path.dirname(tsconfigPath), compilerOptions.baseUrl || './src');

    return Object.entries(compilerOptions.paths).map(([alias, targetPaths]) => ({
      alias: alias.replace('/*', ''),
      target: path.resolve(baseUrl, targetPaths[0].replace('/*', '')),
    }));
  } catch (error) {
    throw new Error(`${errorMessage.TSCONFIG_PARSE_ERROR}: ${error.message}`);
  }
}
