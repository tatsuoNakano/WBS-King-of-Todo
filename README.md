
# DevKitBase

## 🌐 Language Versions

- 🇺🇸 [English (EN)](./README.md)
- 🇯🇵 [Japanese (JA-JP)](./README.ja-JP.md)
- 🇨🇳 [Simplified Chinese (ZH-CN)](./README.zh-CN.md)

  [![Sponsor](https://img.shields.io/badge/Sponsor-❤_on_GitHub-red?logo=github)](https://github.com/sponsors/tatsuoNakano)


---

# DevKitBase Desktop App

**DevKitBase** is a cross-platform desktop application built by integrating **Gatsby** and **Electron**.\
It combines the flexibility of web technologies with the persistent environment of Electron, offering a powerful and multifunctional toolkit to boost developer productivity.

---

## 🔧 Key Features

This application leverages a **refined React + Bootstrap UI** and visualization libraries like **D3.js** and **Vanta.js** to deliver a rich set of tools:

- **Project management** with Gantt charts, ToDo lists, and time tracking
- **Thinking and planning support** with mind maps, Mandala charts, and 5W1H editors
- **Technical documentation tools**, such as Markdown notes, PlantUML, and i18n JSON editors
- **Developer utilities** including DB design, license checkers, graph generators, and web tools

The UI is fully optimized for **dark mode** and desktop interaction.\
Although PWA-compatible and launchable on smartphones, **it is not optimized for mobile screen layouts**, and its usability on mobile is limited.

---

## 🛡 Privacy & External Communication

DevKitBase follows a **local-first design philosophy**, ensuring that **user data is never sent externally** by default.

However, the following features involve external communication:

- **PlantUML Renderer**\
  Generates UML diagrams using an external PlantUML server (requests image via URL)

- **JavaScript License Checker**\
  Retrieves library metadata via [unpkg](https://unpkg.com) CDN API

All other features operate **entirely in the local environment**, ensuring that your work, ideas, and data remain private.

---

## 📦 Tech Stack

### Frameworks & Languages

- [Gatsby](https://www.gatsbyjs.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Electron](https://www.electronjs.org/)

### UI & Styling

- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

### Editors & Parsers

- [Ace Editor (](https://github.com/securingsincity/react-ace)[`react-ace`](https://github.com/securingsincity/react-ace)[, ](https://github.com/securingsincity/react-ace)[`ace-builds`](https://github.com/securingsincity/react-ace)[)](https://github.com/securingsincity/react-ace)
- [jsonc-parser](https://www.npmjs.com/package/jsonc-parser)
- [react-json-pretty](https://github.com/chenckang/react-json-pretty)

### Graphs & Visualization

- [D3.js](https://d3js.org/)
- [PlantUML Encoder](https://github.com/markushedvall/plantuml-encoder)

### Utilities & Misc

- [Sortable.js](https://sortablejs.github.io/Sortable/)
- [Prettier](https://prettier.io/)
- [replace-in-file](https://www.npmjs.com/package/replace-in-file)
- [json5](https://www.npmjs.com/package/json5)

### Deployment

- Netlify

---

## 🛠️ Development Setup

```bash
# Clone and enter the directory
git clone https://github.com/yourusername/devkitbase.git
cd devkitbase

# Install dependencies
npm install

# Build Gatsby → Fix paths → Copy to Electron dist
npm run build

# Build Electron app (NSIS, DMG, AppImage, etc.)
npx electron-builder

# Start in development mode (Gatsby + Electron)
npm run dev
```




## 🧭 Navigation & System Tools

| Feature       | Description |
|---------------|-------------|
| **Home**      | Central landing page with navigation to each tool. |
| **Settings**  | Local data reset, backup, and restore. |
| **Zen-mode**  | Relaxation mode using Vanta.js or particle backgrounds. |

---

## 📋 Task & Project Management

| Feature            | Description |
|--------------------|-------------|
| **Gantt Chart**     | Visual project timeline powered by D3.js. |
| **ToDo**            | Simple task list with checkbox support. |
| **ToDo Time**       | ToDo list categorized by time span (today / week / month / year). |
| **Requirement / Design / Dev / Test / Deploy ToDo** | ToDo sections aligned to development phases. |
| **SWOT ToDo**       | Task planning using SWOT analysis. |
| **PDCAs**           | Compare PDCA / OODA / STPD / DCAP in vertical grid layout. |

---

## ⌛ Time, Notes & Visualization

| Feature              | Description |
|----------------------|-------------|
| **Time Manager**      | Work & break timers with chart visualization. |
| **Memo**              | Markdown-style multi-tab memo with local persistence. |
| **Mind Map**          | Hierarchical mind map using D3.js. |
| **Mandala Chart**     | Japanese 9-grid idea organization tool. |
| **5W1H**              | Separate inputs for Who / What / When / Where / Why / How. |
| **Graph Generator**   | Visualize number arrays as bar/line/pie charts. |

---

## 🌐 Design & Structure Tools

| Feature             | Description |
|---------------------|-------------|
| **Directory Mapper** | Convert indented text to directory tree (Markdown exportable). |
| **i18n JSON Editor** | Syntax-highlighted editor for multilingual JSON files. |
| **PlantUML Tool**    | Input UML text and render diagrams via external PlantUML server. |
| **DB Designer**      | GUI-based table & column schema designer. |

---

## 🧪 Developer Utilities

| Feature                     | Description |
|-----------------------------|-------------|
| **JavaScript License Checker** | Extract licenses from pasted `package.json` using unpkg. |
| **WebHopper**                | Save, manage, and launch sets of frequently used URLs. |
| **Text Converter**           | Convert line-separated text into Markdown, HTML, SQL, etc. |
| **Clipboard Grid**           | Edit and copy multi-line data in a structured grid format. |
| **Dice Roller**              | Randomly choose one from six options. |

---

## 💰 Budget & Finance

| Feature         | Description |
|-----------------|-------------|
| **Dev Ledger**   | Track cost/revenue logs by project. |

---

### ✅ Total Features: **32** (as of July 2025)

## 🌍 言語対応について / Language Support / 语言支持

### 🇯🇵 日本語

現在、このソフトウェアは **日本語のみ対応** しています。  
今後、**英語版・中国語版などの翻訳対応** も視野に入れています。

翻訳や国際化対応にご協力いただける方がいらっしゃいましたら、  
ぜひ [Issue](https://github.com/nakanoTatsuo/devkitbase/issues) や [Pull Request](https://github.com/nakanoTatsuo/devkitbase/pulls) にてご連絡ください。  
OSSとして一緒に育てていただける仲間を歓迎します。

---

### 🇨🇳 简体中文

目前，本软件**仅支持日语界面**。  
未来计划**支持英文、简体中文等多语言翻译**。

如果您有兴趣参与本项目的翻译或国际化工作，  
欢迎通过 [Issue](https://github.com/nakanoTatsuo/devkitbase/issues) 或 [Pull Request](https://github.com/nakanoTatsuo/devkitbase/pulls) 与我们联系。  
我们欢迎愿意共同成长 OSS 项目的协作者。

---

### 🇺🇸 English

Currently, this software **only supports the Japanese interface**.  
We are planning to support **English, Simplified Chinese**, and other languages in the future.

If you are interested in helping with translation or localization,  
please reach out via [Issue](https://github.com/nakanoTatsuo/devkitbase/issues) or submit a [Pull Request](https://github.com/nakanoTatsuo/devkitbase/pulls).  
We warmly welcome contributors who want to help grow this OSS project together.

