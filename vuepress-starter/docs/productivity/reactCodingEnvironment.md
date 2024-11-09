# Best VS Code Extensions for Developers

### 1) **AI Coding Assistance**
- **GitHub Copilot**  
  AI-powered code completion and suggestions.
  
- **Tabnine**  
  AI autocomplete and code snippets for faster development.

- **ChatGPT - Genie AI**  
  Get AI-driven help right inside VS Code with OpenAI's ChatGPT.

---

### 2) **Code Formatting**
- **Prettier**  
  Automatically formats your code on save according to best practices and defined styling rules.

- **ESLint**  
  Linting for JavaScript, TypeScript, and Vue.js to identify and fix coding style violations.

---

### 3) **Code Navigation & Refactoring**
- **Path Intellisense**  
  Autocompletes file names as you type.

- **Bracket Pair Colorizer 2**  
  Colorizes matching brackets to easily track code blocks.

- **Better Comments**  
  Enhance code comments with better readability and categorization (e.g., `TODO`, `FIXME`, etc.).

- **Code Spell Checker**  
  Spell-checking for comments, strings, and code identifiers to prevent typos.

---

### 4) **Productivity Tools**
- **Live Server**  
  Launch a local development server with live reload for static or dynamic pages.

- **Auto Rename Tag**  
  Automatically renames paired HTML/XML tags when one tag is updated.

- **GitLens**  
  Supercharges the Git capabilities in VS Code by showing who changed code and when.

- **TODO Highlight**  
  Highlights `TODO`, `FIXME`, and other annotations in your code.

- **Project Manager**  
  Easily switch between projects without having to reopen folders.

- **Turbo Console Log**  
  Quickly insert and remove console log statements in your code.

---

### 5) **Version Control & Collaboration**
- **Git Graph**  
  Visualize your Git repository, branches, and commits in a graph.

- **GitHub Pull Requests and Issues**  
  Manage pull requests and issues directly within VS Code.

- **Live Share**  
  Real-time collaborative coding, debugging, and code sharing with your team.

---

### 6) **Debugging**
- **Debugger for Chrome**  
  Debug your JavaScript code in Google Chrome from VS Code.

- **Error Lens**  
  Highlights errors and warnings in your code directly in the editor for better visibility.

---

### 7) **Languages & Frameworks**
- **Python**  
  Adds rich support for Python, including debugging, IntelliSense, and linting.

- **JavaScript (ES6) Code Snippets**  
  Provides useful snippets for modern JavaScript development (ES6+).

- **Vue VSCode Snippets**  
  Snippets for Vue.js development, including template, script, and style blocks.

- **Vetur**  
  Vue tooling for VS Code, providing syntax highlighting, IntelliSense, and more.

- **Tailwind CSS IntelliSense**  
  Autocompletes Tailwind CSS classes and provides suggestions.

- **Django**  
  Provides support for Django web development with syntax highlighting, snippets, and more.

---

### 8) **Markdown & Documentation**
- **Markdown All in One**  
  A complete toolkit for writing and previewing markdown files with shortcuts and syntax highlighting.

- **Docsify**  
  Easily generate documentation websites from markdown files.

- **Swagger Viewer**  
  Preview OpenAPI (Swagger) files within VS Code.

---

### 9) **Docker & Kubernetes**
- **Docker**  
  Manage Docker containers, images, and registries directly from VS Code.

- **Kubernetes**  
  Support for Kubernetes, including viewing clusters, monitoring pods, and managing deployments.

---

### 10) **Database Tools**
- **SQLTools**  
  Connect and manage databases (e.g., MySQL, PostgreSQL, SQLite) within VS Code.

- **MongoDB for VS Code**  
  Interact with your MongoDB databases and run queries from within VS Code.

---

### 11) **Themes & Customization**
- **Material Icon Theme**  
  Provides great file and folder icons for better visual organization.

- **Dracula Official**  
  A popular, dark theme for coding.

- **One Dark Pro**  
  One of the best Atom-inspired VS Code themes for a professional dark mode.

---

### 12) **Testing**
- **Jest**  
  Provides a great testing framework for JavaScript and TypeScript, integrated with VS Code.

- **Python Test Explorer**  
  Easily run and debug Python tests from within VS Code.

---

### Bonus:
- **Remote - WSL**  
  Develop Linux-based applications within VS Code on Windows using the Windows Subsystem for Linux.

- **REST Client**  
  Send HTTP requests and view responses directly in VS Code without needing an external tool like Postman.



### One shot installation of these extensions
```bash
code --install-extension github.copilot
code --install-extension tabnine.tabnine-vscode
code --install-extension genieai.chatgpt-vscode
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension christian-kohler.path-intellisense
code --install-extension coenraads.bracket-pair-colorizer-2
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension ritwickdey.liveserver
code --install-extension formulahendry.auto-rename-tag
code --install-extension eamodio.gitlens
code --install-extension wayou.vscode-todo-highlight
code --install-extension alefragnani.project-manager
code --install-extension chrmarti.regex
code --install-extension wix.vscode-import-cost
code --install-extension oderwat.indent-rainbow
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension usernamehw.errorlens
code --install-extension ms-python.python
code --install-extension xabikos.javascriptsnippets
code --install-extension hollowtree.vue-snippets
code --install-extension octref.vetur
code --install-extension bradlc.vscode-tailwindcss
code --install-extension batisteo.vscode-django
code --install-extension yzhang.markdown-all-in-one
code --install-extension esbenp.vscode-docsify
code --install-extension arjun.swagger-viewer
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension mtxr.sqltools
code --install-extension mongodb.mongodb-vscode
code --install-extension pkief.material-icon-theme
code --install-extension dracula-theme.theme-dracula
code --install-extension zhuangtongfa.material-theme
code --install-extension orta.vscode-jest
code --install-extension littlefoxteam.vscode-python-test-adapter
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension humao.rest-client
```


or you can create a extension.json file in .vscode folder with these json text
```bash
.vscode/extension.json
{
  "recommendations": [
    "github.copilot",
    "tabnine.tabnine-vscode",
    "genieai.chatgpt-vscode",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "christian-kohler.path-intellisense",
    "coenraads.bracket-pair-colorizer-2",
    "streetsidesoftware.code-spell-checker",
    "ritwickdey.liveserver",
    "formulahendry.auto-rename-tag",
    "eamodio.gitlens",
    "wayou.vscode-todo-highlight",
    "alefragnani.project-manager",
    "chrmarti.regex",
    "wix.vscode-import-cost",
    "oderwat.indent-rainbow",
    "msjsdiag.debugger-for-chrome",
    "usernamehw.errorlens",
    "ms-python.python",
    "xabikos.javascriptsnippets",
    "hollowtree.vue-snippets",
    "octref.vetur",
    "bradlc.vscode-tailwindcss",
    "batisteo.vscode-django",
    "yzhang.markdown-all-in-one",
    "esbenp.vscode-docsify",
    "arjun.swagger-viewer",
    "ms-azuretools.vscode-docker",
    "ms-kubernetes-tools.vscode-kubernetes-tools",
    "mtxr.sqltools",
    "mongodb.mongodb-vscode",
    "pkief.material-icon-theme",
    "dracula-theme.theme-dracula",
    "zhuangtongfa.material-theme",
    "orta.vscode-jest",
    "littlefoxteam.vscode-python-test-adapter",
    "ms-vscode-remote.remote-wsl",
    "humao.rest-client"
  ]
}
```

in case you want to uninstall all these extensions:
```bash
code --uninstall-extension github.copilot
code --uninstall-extension tabnine.tabnine-vscode
code --uninstall-extension genieai.chatgpt-vscode
code --uninstall-extension esbenp.prettier-vscode
code --uninstall-extension dbaeumer.vscode-eslint
code --uninstall-extension christian-kohler.path-intellisense
code --uninstall-extension coenraads.bracket-pair-colorizer-2
code --uninstall-extension streetsidesoftware.code-spell-checker
code --uninstall-extension ritwickdey.liveserver
code --uninstall-extension formulahendry.auto-rename-tag
code --uninstall-extension eamodio.gitlens
code --uninstall-extension wayou.vscode-todo-highlight
code --uninstall-extension alefragnani.project-manager
code --uninstall-extension chrmarti.regex
code --uninstall-extension wix.vscode-import-cost
code --uninstall-extension oderwat.indent-rainbow
code --uninstall-extension msjsdiag.debugger-for-chrome
code --uninstall-extension usernamehw.errorlens
code --uninstall-extension ms-python.python
code --uninstall-extension xabikos.javascriptsnippets
code --uninstall-extension hollowtree.vue-snippets
code --uninstall-extension octref.vetur
code --uninstall-extension bradlc.vscode-tailwindcss
code --uninstall-extension batisteo.vscode-django
code --uninstall-extension yzhang.markdown-all-in-one
code --uninstall-extension esbenp.vscode-docsify
code --uninstall-extension arjun.swagger-viewer
code --uninstall-extension ms-azuretools.vscode-docker
code --uninstall-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --uninstall-extension mtxr.sqltools
code --uninstall-extension mongodb.mongodb-vscode
code --uninstall-extension pkief.material-icon-theme
code --uninstall-extension dracula-theme.theme-dracula
code --uninstall-extension zhuangtongfa.material-theme
code --uninstall-extension orta.vscode-jest
code --uninstall-extension littlefoxteam.vscode-python-test-adapter
code --uninstall-extension ms-vscode-remote.remote-wsl
code --uninstall-extension humao.rest-client

```
Uninstall All Extensions in Bulk (One Liner):

```bash
code --list-extensions | xargs -n 1 code --uninstall-extension
```
```bash
code --list-extensions | foreach { code --uninstall-extension $_ }
```
 To List all installed extensions in Vs Code
```bash
code --profile <profile-name> --list-extensions
```