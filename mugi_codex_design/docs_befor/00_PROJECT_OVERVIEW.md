# 00_PROJECT_OVERVIEW.md

## Project name

Boulangerie Mugi no Akari

読み：ブーランジェリー 麦の灯り

## Site type

架空のベーカリー店舗向けWebサイト。

## Goal

住宅街にある小さなパン屋「Boulangerie Mugi no Akari」の魅力を伝え、来店・取り置き予約・問い合わせ・SNSフォローにつなげる。

## Main objectives

- 初めてのお客様に店舗の雰囲気やこだわりを伝える。
- 営業時間、定休日、住所、アクセス、電話番号を分かりやすく伝える。
- 商品メニューを写真付きで見やすく掲載する。
- パンの取り置き予約をWeb上で受け付け、DBに保存する。
- 予約以外のお問い合わせをWeb上で受け付け、DBに保存する。
- Instagram、X、LINE公式アカウントへ誘導する。
- スマートフォンでも使いやすいレスポンシブUIにする。
- ポートフォリオとして見栄えするUI、アニメーション、READMEを整える。

## Store concept

住宅街にある小さな焼きたてパンのお店。天然酵母、国産小麦、季節の素材を使ったパンが人気。

## Store features

- 毎朝7時から焼きたてパンを販売する。
- 人気商品は午前中に売り切れることがある。
- 季節限定メニューがある。
- Instagramで新商品や焼き上がり情報を発信している。
- 電話対応の負担を減らすため、Web予約・お問い合わせを導入したい。
- 初めて来店する人にも店舗の雰囲気や場所を分かりやすく伝えたい。

## Target users

- 通勤・通学前にパンを購入したい人。
- 近隣に住む主婦層。
- カフェ利用をしたい人。
- 週末に家族で利用したい人。
- 人気商品の取り置きをしたい人。
- 大量注文やイベント出店について問い合わせたい人。

## Initial release scope

Implement:

- Top page
- About page
- Menu page
- Reservation page
- Contact page
- SNS links
- Responsive layout
- Basic SEO metadata
- UI decoration and animations
- Form validation
- Confirmation/completion states
- Menu data listing from DB
- Reservation DB saving
- Contact inquiry DB saving
- Store information display
- Google Map iframe placeholder or embedded map area

Out of scope for initial release:

- Admin dashboard
- Authentication/login
- Payment
- Real-time inventory
- Actual email sending
- Staff notification management
- CMS integration
- Multi-language support
- Production-level spam protection

## Completion criteria

The initial release is complete when:

- All pages are implemented and navigable.
- Menu items are displayed from PostgreSQL via API.
- Category filtering works on the menu page.
- Reservation form validates input, displays confirmation, and saves to DB.
- Contact form validates input and saves to DB.
- SNS links work and are safe external links.
- Layout does not break on PC, tablet, or smartphone.
- Warm bakery-like design and subtle animations are implemented.
- Basic SEO metadata is configured.
- README explains the project purpose, stack, features, setup, and future improvements.
