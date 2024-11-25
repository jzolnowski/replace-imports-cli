import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { errorMessage, defaultExtensions } from './constants.js';
import { replaceAllImportsWithAliases } from './index.js';

export async function runCLI() {
  console.log('Welcome to the Replace Imports CLI! 🚀\n');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'tsconfigPath',
      message: 'Enter the path to your tsconfig.json:',
      default: './tsconfig.json',
      validate: (input) => (fs.existsSync(input) ? true : errorMessage.TSCONFIG_NOT_FOUND),
    },
    {
      type: 'input',
      name: 'projectDir',
      message: 'Enter the path to your project source directory (e.g., ./src):',
      default: './src',
      validate: (input) => (fs.existsSync(input) ? true : errorMessage.SOURCE_DIR_NOT_FOUND),
    },
    {
      type: 'input',
      name: 'extensions',
      message: 'Enter file extensions to process (comma-separated, e.g., .ts,.js):',
      default: defaultExtensions.join(','),
      validate: (input) => input ? true : 'Please provide at least one extension.',
    }
  ]);

  const { tsconfigPath, projectDir, extensions } = answers;

  const extensionsArray = extensions.split(',').map(ext => ext.trim());
  console.log(`\nProcessing files in ${projectDir} using aliases from ${tsconfigPath} with extensions: ${extensionsArray.join(', ')}...\n`);
  await replaceAllImportsWithAliases(path.resolve(projectDir), path.resolve(tsconfigPath), extensionsArray);
}
