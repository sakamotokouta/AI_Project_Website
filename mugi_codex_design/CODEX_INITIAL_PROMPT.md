# CODEX_INITIAL_PROMPT.md

以下をCodexの最初の依頼として貼り付けてください。

---

AGENTS.md と docs/ 配下の設計書をすべて読んでください。

このリポジトリで、架空のベーカリー店舗「Boulangerie Mugi no Akari」のWebサイトを、環境構築から実装まで進めてください。

## 必ず守る方針

- Nuxt 3 + Vue 3 + TypeScriptで実装してください。
- バックエンドはNuxtの `server/api` で実装してください。
- Expressなどの別バックエンドサーバーは作成しないでください。
- DBはPostgreSQLを使用してください。
- DBアクセスはPrismaを使用してください。
- ローカルPostgreSQLはDocker Composeで起動できるようにしてください。
- フォームバリデーションにはZodを使用してください。
- スタイリングはSCSSで実装してください。
- メニュー情報、予約内容、お問い合わせ内容はDBに保存してください。
- 店舗情報とSNSリンクは初期リリースではローカル定数で管理してください。
- 管理画面、ログイン、決済、実メール送信、リアルタイム在庫は初期リリース対象外です。

## 最初に行うこと

1. 設計書全体を読み、実装計画を短く提示してください。
2. Nuxt 3プロジェクトが未作成なら作成してください。
3. 依存関係を追加してください。
4. `docker-compose.yml`、`.env.example`、Prisma設定を作成してください。
5. Prisma schema、migration、seedを作成してください。
6. APIを実装してください。
7. ページとコンポーネントを実装してください。
8. SCSSでレスポンシブデザインを整えてください。
9. READMEを作成してください。
10. 最後に `npm run build` で確認し、結果を報告してください。

## 実装対象ページ

- `/` トップページ
- `/about` 店舗紹介ページ
- `/menu` メニュー一覧ページ
- `/reserve` 予約フォームページ
- `/contact` お問い合わせページ

## 実装対象API

- `GET /api/menu`
- `GET /api/menu/recommended`
- `POST /api/reservations`
- `POST /api/contacts`

## 完了条件

- Docker ComposeでPostgreSQLが起動できること。
- Prisma migrationとseedが実行できること。
- メニュー一覧がDBから表示されること。
- 予約フォームが入力、確認、送信、完了まで動作し、DB保存されること。
- お問い合わせフォームが入力、送信、完了まで動作し、DB保存されること。
- PC、タブレット、スマートフォンで表示崩れがないこと。
- 基本SEOが設定されていること。
- READMEに環境構築と起動手順が書かれていること。

作業中に不明点が出た場合は、設計書の方針を優先して、初期リリースに必要な範囲で実装してください。
