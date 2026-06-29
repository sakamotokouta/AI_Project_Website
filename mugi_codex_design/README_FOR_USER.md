# README_FOR_USER.md

このフォルダは、Codexに読み込ませるための設計書一式です。

## 含まれるファイル

- `AGENTS.md`
  - Codex向けのプロジェクトルールです。
- `CODEX_INITIAL_PROMPT.md`
  - Codexに最初に貼り付けるプロンプトです。
- `docs/00_PROJECT_OVERVIEW.md`
  - プロジェクト概要です。
- `docs/01_ENVIRONMENT_SETUP.md`
  - 環境構築手順です。
- `docs/02_SYSTEM_DESIGN.md`
  - システム構成設計です。
- `docs/03_DATABASE_DESIGN.md`
  - PostgreSQL / Prisma のDB設計です。
- `docs/04_API_DESIGN.md`
  - Nuxt server/api のAPI設計です。
- `docs/05_FRONTEND_DESIGN.md`
  - 画面・コンポーネント・UI設計です。
- `docs/06_IMPLEMENTATION_TASKS.md`
  - 実装タスク一覧です。
- `docs/07_TEST_CHECKLIST.md`
  - 動作確認チェックリストです。

## 使い方

1. 新しいGitリポジトリ、または作業用フォルダを用意します。
2. このフォルダ内の `AGENTS.md` と `docs/` をリポジトリ直下に配置します。
3. `CODEX_INITIAL_PROMPT.md` の本文をCodexに貼り付けます。
4. Codexに実装を進めてもらいます。

## 重要方針

- バックエンドはNuxtの `server/api` で作成します。
- Expressは使いません。
- DBはPostgreSQLです。
- ORMはPrismaです。
- ローカルDBはDocker Composeで起動します。
