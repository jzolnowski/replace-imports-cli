### Replace Imports CLI

A lightweight CLI tool to refactor and optimize ES6 imports by replacing long relative paths with aliases defined in `tsconfig.json` file. It supports configurable file extensions, processes only the specified files, and allows for flexibility with simple-to-use prompts.

![A GIF showing the tool in action - long relative paths replaced with neat aliases automatically](https://github.com/jzolnowski/replace-imports-cli/blob/main/assets/replace-imports.gif)

---

## Features

- **Replace Long Relative Imports:** Automatically replace long relative import paths (e.g., `../../../services/auth.service`) with aliases (e.g., `@services/auth.service`).
- **Custom File Extensions:** Specify the file extensions you want to process (default: `.js, .ts`).
- **Flexible Import Handling:**
  - Skip imports already using aliases.
  - Replace imports only outside alias folders.
- **Interactive CLI:** Simple prompts to configure paths, extensions, and processing behavior.
- **Framework-Agnostic:** Works with any TypeScript project that uses `tsconfig.json`.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en)
- A project with a valid [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file containing [paths](https://www.typescriptlang.org/tsconfig/#paths) mappings.

### Clone and Setup

```bash
git clone git@github.com:jzolnowski/replace-imports-cli.git
cd replace-imports-cli
npm install
```

---

### Install and Use the Package

After publishing, users can install your CLI tool globally or locally:

- **Global Installation:**
  ```bash
  npm install -g replace-imports-cli
  ```

  Run the tool:
  ```bash
  replace-imports
  ```

- **Local Installation:**
  ```bash
  npm install --save-dev replace-imports-cli
  ```

  Use it in a project:
  ```bash
  npx replace-imports
  ```

---

## Example

#### Developer Workflow:
1. Initialize a project with aliases in `tsconfig.json` e.g.
   ```json
   {
     "compilerOptions": {
       "baseUrl": "./src",
         "paths": {
           "@services/*": ["app/services/*"],
           "@components/*": ["app/components/*"]
         }
     }
   }
   ```
2. Install `replace-imports-cli` package and run it - check the details in `Install and Use the Package` section.

#### CLI Output:
```plaintext
Welcome to Replace Imports CLI! 🚀

? Enter the path to your tsconfig.json: ./tsconfig.json
? Enter the path to your project source directory (e.g., ./src): ./src
? Enter file extensions to process (comma-separated, e.g., .ts,.js): .ts,.js

Processing files in ./src using aliases from ./tsconfig.json with extensions: .ts, .js...

Updated imports in src/app/services/auth.service.ts
Updated imports in src/app/components/header.component.js

All imports updated successfully! 🎉
```

### Before Running the Script

In `src/app/modules/user.module.ts`:

```typescript
import { AuthService } from '../../../services/auth.service';
import { UserComponent } from '../../components/user.component';
```

### After Running the Script

```typescript
import { AuthService } from '@services/auth.service';
import { UserComponent } from '@components/user.component';
```
---

## How It Works

1. **Reads `tsconfig.json`:** Parses the `paths` section to extract aliases.
2. **Scans the Source Directory:** Recursively searches for files matching the specified extensions.
3. **Replaces Imports:**
  - Checks each `import` statement to determine if it matches the alias mappings.
  - Replaces relative paths with the appropriate alias if applicable.
4. **Writes Changes:** Updates the files with optimized imports.

---

## Configuration

### Default Values

The following values are used by default if not explicitly specified during the CLI prompts:

| Setting                | Default Value       |
|------------------------|---------------------|
| `tsconfig.json` Path   | `./tsconfig.json`   |
| Source Directory       | `./src`            |
| File Extensions        | `.ts, .js`         |

---

## Folder Structure

```plaintext
replace-imports-cli/
├── src/
│   ├── constants.js         # Defines reusable constants, like default extensions and error messages.
│   ├── file-utils.js        # Contains utility functions to scan directories and retrieve files based on extensions.
│   ├── replace-imports.js   # Handles the logic for replacing relative imports with tsconfig aliases.
│   ├── tsconfig-utils.js    # Parses tsconfig.json and extracts alias paths for use in replacements.
│   ├── cli.js               # Contains the interactive CLI logic and user prompts.
│   └── index.js             # Orchestrates the replacement process by tying together other modules.
├── bin/
│   └── replace-imports.js   # Entry point for the CLI; calls `runCLI` from `src/cli.js`.
├── package.json             # Defines the npm package configuration, dependencies, and scripts.
├── README.md                # Documentation for the project, including usage and examples.
├── .editorconfig            # Ensures consistent coding styles across editors.
├── .gitignore               # Specifies files and directories to ignore in Git commits.
└── LICENSE                  # Open-source license for the project.

```

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed explanation of your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Troubleshooting

### Common Errors

#### Error: `Missing "paths" property in compilerOptions of tsconfig.json`
- Ensure your `tsconfig.json` includes a valid `paths` mapping under `compilerOptions`.

#### Error: `Source directory not found.`
- Verify the directory path you provided exists and contains the source files.

#### Error: `Could not parse tsconfig.json. Ensure the file is valid.`
- Check for syntax errors or invalid JSON in your `tsconfig.json`.

---

## Future Features

- **Dry Run Mode:** Preview changes before applying them.
- **Custom Output Directory:** Specify a directory to save updated files.
- **Nx support:** Add support for Nx workspace folder structures that use multiple `tsconfig` files.

Feel free to suggest features or report issues by opening an issue on GitHub! 🎉
