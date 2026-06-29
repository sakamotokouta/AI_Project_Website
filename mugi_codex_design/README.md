# Boulangerie Mugi no Akari

架空のベーカリー店舗「Boulangerie Mugi no Akari」のフルスタック Nuxt 3 サイトです。店舗紹介、メニュー閲覧、取り置き予約、お問い合わせを初期リリース範囲として実装しています。

## Stack

- Nuxt 3 / Vue 3 / TypeScript
- Nuxt `server/api`
- PostgreSQL / Prisma
- Docker Compose
- Zod
- SCSS
- npm

## Features

- トップ、About、Menu、Reserve、Contact ページ
- PostgreSQL に保存したメニューの一覧表示
- カテゴリ別メニュー絞り込み
- 予約フォームの入力、確認、完了状態
- 予約内容と予約商品を DB に保存
- 問い合わせフォームの DB 保存
- Zod によるクライアント/サーバーバリデーション
- 店舗情報と SNS リンクはローカル定数で管理
- レスポンシブデザイン、基本 SEO、reduced motion 対応

## Setup

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```


Nuxt app: `http://localhost:3000`

## Environment

`.env`:

```env
DATABASE_URL="postgresql://mugi_user:mugi_password@localhost:5432/mugi_no_akari?schema=public"
```

`DATABASE_URL` は Prisma と Nuxt server 側でのみ使用します。

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run db:studio
```

PowerShell の実行ポリシーで `npm` が止まる場合は、Windows では `npm.cmd run build` のように `npm.cmd` を使用してください。

## API

- `GET /api/menu?category=ALL`
- `GET /api/menu/recommended`
- `POST /api/reservations`
- `POST /api/contacts`

## Initial Release Exclusions

- 管理画面
- ログイン/認証
- 決済
- 実メール送信
- リアルタイム在庫
- CMS

## Future Improvements

- 管理画面からのメニュー更新
- 店舗通知メール
- スパム対策
- 在庫数と予約可能数の管理
- 本番向け画像最適化と OGP 画像差し替え
