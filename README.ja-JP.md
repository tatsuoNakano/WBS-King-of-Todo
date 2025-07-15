# DevKitBase

## 🌐 Language Versions

- 🇺🇸 [English (EN)](./README.md)
- 🇯🇵 [日本語 (JA-JP)](./README.ja-JP.md)
- 🇨🇳 [简体中文 (ZH-CN)](./README.zh-CN.md)


# DevKitBase Desktop App

# DevKitBase

**DevKitBase** は、**Gatsby** と **Electron** を統合して構築された、クロスプラットフォーム対応のデスクトップアプリケーションです。  
Web技術の柔軟性とElectronのローカル常駐性を兼ね備え、開発者の生産性を高める多機能な支援環境を提供します。

## 主な特徴

本アプリケーションは、**React + Bootstrapベースの洗練されたUI**と、**D3.jsやVanta.jsなどの視覚化ライブラリ**を活用し、次のような多彩な機能を実現しています：

- ガントチャート・ToDo・タイムトラッキングなどによる **プロジェクト管理**
- マインドマップ・曼荼羅チャート・5W1H による **思考支援・整理**
- Markdownメモ、PlantUML、i18nJSONエディタなどによる **技術ドキュメント整備**
- DB設計、ライセンスチェック、グラフ描画、Webツール群などの **開発補助機能**

UIは **ダークモードに最適化されたBootstrapベースの構成** で、デスクトップでの操作に最適化されています。  
PWA対応によりスマートフォンでも起動は可能ですが、**画面レイアウトがモバイルに最適化されていないため実用性は限定的**です。

## 🛡 プライバシーと外部通信について

DevKitBaseは、**ローカルファーストの設計思想**に基づき、原則として **ユーザーのデータを外部に送信しない** 安全設計を採用しています。

ただし、以下の機能においては外部サービスと通信が発生します：

- **PlantUML機能**  
  UML図を外部の PlantUML サーバーで描画します（エディタ側から画像リクエストを送信）

- **JavaScriptライセンスチェッカー**  
  ライブラリ情報を [unpkg](https://unpkg.com) 経由で取得します（CDN APIを使用）

これらを除くすべての機能は **完全にローカル環境で動作** し、ユーザーの思考・作業・データは外部に漏れることはありません。

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


> Gatsby + Electron 製の統合開発支援ツール  
> 各機能はローカル保存＆オフライン動作可能で、Web版とも同期可能

---

## 🧭 ナビゲーション & 管理系

| 機能名 | 説明 |
|--------|------|
| **ホーム** | アプリ全体のトップ画面。各機能への入口となります。 |
| **設定** | ローカルストレージの初期化やバックアップ、データ復元などを実行できます。 |
| **Zen-mode** | Vanta.jsやパーティクル背景による癒しの集中モード。 |

---

## 📋 タスク・進捗管理

| 機能名 | 説明 |
|--------|------|
| **ガントチャート** | D3.jsベースでプロジェクトのスケジュールを可視化。 |
| **ToDo** | シンプルなチェックボックス付きタスクリスト。 |
| **ToDo Time** | 「今日・週・月・年」など時間軸と連動したToDo管理。 |
| **要件定義 ToDo** ～ **運用・保守 ToDo** | 開発フェーズ別にToDoを分割管理。 |
| **SWOT分析 ToDo** | 強み・弱み・機会・脅威を分析し、タスク化する支援ツール。 |
| **PDCAs** | PDCA/OODA/STPD/DCAPの4フレームワークを縦グリッドで比較記述。 |

---

## ⌛ 時間・メモ・可視化

| 機能名 | 説明 |
|--------|------|
| **タイムマネージャー** | 作業・休憩タイマーを記録＆可視化（円グラフ対応）。 |
| **メモ** | Markdown風のシンプルなメモ帳。複数タブ・ローカル保存対応。 |
| **マインドマップ** | D3.jsベースのテキスト中心の階層型マインドマップ。 |
| **曼荼羅チャート** | 目標と8要素を整理する9マスの思考整理ツール。 |
| **5W1H** | Who / What / When / Where / Why / How を分けて記述。 |
| **グラフジェネレーター** | 数値配列を使って棒・折れ線・円グラフを生成。 |

---

## 🌐 設計・構成・仕様管理

| 機能名 | 説明 |
|--------|------|
| **ディレクトリ構成図** | テキスト入力からディレクトリ構成図を生成。Markdown出力可能。 |
| **i18nJson** | JSON翻訳ファイルの編集・整形・構文エラー検出機能付き。 |
| **PlantUML** | UML記述用PlantUMLの入力→図式変換支援。 |
| **DBデザイナー** | GUIでテーブル名・カラム名を登録し、ER設計の支援が可能。 |

---

## 🧪 開発補助ツール

| 機能名 | 説明                                     |
|--------|----------------------------------------|
| **JavaScriptライセンスチェッカー** | `package.json`を解析してライブラリのライセンス情報を表示。   |
| **WebHopper** | よく使うURLをテンプレート登録して起動                   |
| **テキスト変換** | 改行テキスト → Markdown・HTMLリスト・SQL句などに一括変換。 |
| **グリッドコピーボード** | 複数行テキストをグリッド形式で編集・コピー可能。               |
| **ダイスロール** | 6候補から1つをランダム抽選。             |

---

## 💰 管理・分析支援

| 機能名 | 説明 |
|--------|------|
| **開発家計簿** | プロジェクトごとに費用・収益・日付を記録。 |

---

### 🧩 合計機能数：**32機能**（2025年7月時点）

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

