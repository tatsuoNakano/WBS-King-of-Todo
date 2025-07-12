# DevKitBase

# DevKitBase Desktop App

**DevKitBase** は、Gatsby と Electron を統合して構築されたデスクトップアプリケーションです。  
モダンな UI フレームワークや視覚化ライブラリを用いて、ToDo管理、タイムトラッキング、マインドマップなどの開発支援機能を提供します。

## Web版はこちら
devkitbase.netlify.app/

---

## 📦 使用技術スタック

### フレームワーク & 言語

- [Gatsby](https://www.gatsbyjs.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Electron](https://www.electronjs.org/)

### UI & スタイリング

- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)

### エディタ & パーサ

- [Ace Editor (`react-ace`, `ace-builds`)](https://github.com/securingsincity/react-ace)
- [jsonc-parser](https://www.npmjs.com/package/jsonc-parser)
- [react-json-pretty](https://github.com/chenckang/react-json-pretty)

### グラフ & ビジュアライズ

- [D3.js](https://d3js.org/)
- [PlantUML Encoder](https://github.com/markushedvall/plantuml-encoder)

### ユーティリティ・その他

- [Sortable.js](https://sortablejs.github.io/Sortable/)
- [Prettier](https://prettier.io/)
- [replace-in-file](https://www.npmjs.com/package/replace-in-file)
- [json5](https://www.npmjs.com/package/json5)

### デプロイ
- Netlify
---

## 🛠️ 開発セットアップ

```bash
# クローンして移動
git clone https://github.com/yourusername/devkitbase.git
cd devkitbase

# パッケージをインストール
npm install

# Gatsby ビルド → path 修正 → Electron用 dist にコピー
npm run build

# Electron アプリのビルド（NSIS, DMG, AppImageなど）
npx electron-builder

# 開発モードで起動（Gatsby + Electron 同時起動）
npm run dev
```
# 実装機能

##  実装済み機能一覧

- ホーム
- ガントチャート
- ディレクトリ構成図
- タイムマネージャー
- メモ
- マインドマップ
- i18nJson
- PlantUML
- ダイスロール
- ToDo
- ToDo Time
- 要件定義 ToDo
- 基本設計 ToDo
- 詳細設計 ToDo
- 実装 ToDo
- テスト ToDo
- ビルド・配布 ToDo
- 運用・保守 ToDo
