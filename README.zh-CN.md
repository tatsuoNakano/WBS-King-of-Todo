# DevKitBase

  [![Sponsor](https://img.shields.io/badge/Sponsor-❤_on_GitHub-red?logo=github)](https://github.com/sponsors/tatsuoNakano)

## 🌐 语言版本

- 🇪🇸 [英文 (EN)](./README.md)
- 🇯🇵 [日本語 (JA-JP)](./README.ja-JP.md)
- 🇨🇳 [简体中文 (ZH-CN)](./README.zh-CN.md)

---

# DevKitBase 桌面应用

**DevKitBase** 是一款培合了 **Gatsby** 和 **Electron** 的跨平台桌面应用程序。\
它结合了网页技术的灵活性和 Electron 的本地应用环境，为开发者提供一个多功能高效的工具组合。

---

## 🔧 主要特性

本应用使用了精美的 **React + Bootstrap UI** 和视觉化库，如 **D3.js** 和 **Vanta.js**，实现了如下功能：

- 使用 Gantt 图表、ToDo 列表和时间跟踪进行 **项目管理**
- 使用思维导图、曼虎累图和 5W1H 编辑器提供 **思考和规划支持**
- 支持 Markdown 备笔、PlantUML 和 i18n JSON 编辑器的 **技术文档工具**
- **开发工具**，包括数据库设计、授权检查器、图表生成器和 Web 工具

UI 完全为 **黑色模式** 和桌面操作进行优化\
它支持 PWA 启动，可以在手机上启动，但 **应用布局未为移动端进行优化，所以实际可用性有限**。

---

## 🛡 隐私保护 & 外部通信

DevKitBase 遵循 **本地优先设计思想**，默认不会 **将用户数据发送到外部服务器**。

但是，以下功能需要和外部服务通信：

- **PlantUML 演示器**\
  使用外部 PlantUML 服务器生成 UML 图。

- **JavaScript 授权检查器**\
  通过 [unpkg](https://unpkg.com) CDN API 获取库信息

除此之外，**所有功能均在本地环境中完全运行**，确保您的工作数据和思维等不会泄露。

---

> Gatsby + Electron 开发支持工具  
> 所有功能可本地保存 & 离线运行，并与 Web 版本同步

| 功能名 | 描述 |
|--------|------|
| **首页** | 应用的主界面，功能入口点。 |
| **设置** | 可初始化本地存储、备份与数据恢复。 |
| **专注模式** | 使用 Vanta.js 粒子背景打造沉浸式专注体验。 |

---

## 📋 任务与进度管理

| 功能名 | 描述 |
|--------|------|
| **甘特图** | 基于 D3.js 显示项目排期。 |
| **待办事项** | 简洁的复选框式任务清单。 |
| **时间轴 ToDo** | 按天/周/月/年划分的时间维度任务管理。 |
| **阶段性 ToDo** | 按开发阶段（需求、测试、运营等）细分管理。 |
| **SWOT 分析 ToDo** | 支持强弱点、机会、威胁分析并转为任务。 |
| **PDCAs** | 支持 PDCA/OODA/STPD/DCAP 的纵向网格式比较。 |

---

## ⌛ 时间 & 笔记 & 可视化

| 功能名 | 描述 |
|--------|------|
| **时间管理器** | 记录与可视化工作/休息时间（支持圆图）。 |
| **笔记** | Markdown 风格的多标签本地保存型记事工具。 |
| **思维导图** | 基于 D3.js 的文本树状思维导图。 |
| **曼陀罗图** | 9格图形，整理目标与8个相关要素。 |
| **5W1H** | 分栏书写 Who/What/When/Where/Why/How。 |
| **图表生成器** | 输入数值数组生成柱状图、折线图、饼图等。 |

---

## 🌐 架构 & 编辑 & 规范

| 功能名 | 描述 |
|--------|------|
| **目录结构图** | 从文本生成目录结构图，可导出为 Markdown。 |
| **i18nJson 编辑器** | 支持 JSON 多语言翻译、格式化与语法错误检测。 |
| **PlantUML 工具** | 输入 UML 描述语法并渲染图像。 |
| **数据库设计器** | 通过 GUI 输入表名/字段名进行数据库结构设计。 |

---

## 🧪 开发者工具

| 功能名 | 描述 |
|--------|------|
| **JS 许可证检查器** | 分析 `package.json` 中库的许可证信息。 |
| **WebHopper** | 注册常用链接模板并一键启动。 |
| **文本转换器** | 将换行文本批量转为 Markdown、HTML、SQL 等格式。 |
| **网格剪贴板** | 可编辑的网格型文本复制工具。 |
| **骰子抽选器** | 从6个候选项中随机选择一个。 |

---

## 💰 管理与分析

| 功能名 | 描述 |
|--------|------|
| **开发记账本** | 记录每个项目的费用、收入与日期。 |

---

### 🧩 功能总数：**32个功能**（截至 2025 年 7 月）

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

  [![Sponsor](https://img.shields.io/badge/Sponsor-❤_on_GitHub-red?logo=github)](https://github.com/sponsors/tatsuoNakano)


