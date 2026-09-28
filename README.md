# kusayakyu-ios

草野球マスター（本体: `nicemolkkyjp-web/sokyu-master-codex`、本番 https://kusayakyu.vercel.app ）
をiOSアプリとして配布するための、Capacitor製ネイティブシェルです。

アプリの中身はほぼ空で、起動すると`capacitor.config.ts`の`server.url`に設定した本番URLを
そのまま読み込みます。Web版に変更を入れれば、ストア再審査なしでアプリ側にも即座に反映されます。

## 初回セットアップ（Apple Developer側）

1. developer.apple.com → Certificates, Identifiers & Profiles → Identifiers で
   新しいBundle IDを登録する（`capacitor.config.ts`の`appId`と同じ値。デフォルトは
   `com.hiroyaapps.kusayakyu`）
2. 配布用証明書（Apple Distribution）: 既存のものがあれば流用可。無ければ新規作成し
   `.p12`でエクスポート
3. 配布用プロビジョニングプロファイル: 上記Bundle IDと証明書を紐付けて新規作成
4. App Store Connectでこのアプリのレコードを新規作成
5. App Store Connect APIキー: 他アプリで発行済みのものがあれば流用可

## GitHub Secretsの設定

| Secret名 | 内容 |
|---|---|
| IOS_DIST_CERTIFICATE_P12_BASE64 | 配布用証明書(.p12)をbase64化した文字列 |
| IOS_DIST_CERTIFICATE_PASSWORD | 上記.p12のパスワード |
| IOS_PROVISIONING_PROFILE_BASE64 | プロビジョニングプロファイルをbase64化した文字列 |
| APPLE_TEAM_ID | Apple DeveloperのTeam ID |
| APPSTORE_CONNECT_API_KEY_ID | App Store Connect APIキーのKey ID |
| APPSTORE_CONNECT_API_ISSUER_ID | 同Issuer ID |
| APPSTORE_CONNECT_API_PRIVATE_KEY | .p8ファイルの中身 |

## 実行

mainブランチにpushすると自動的にビルド〜TestFlightアップロードが走ります。
手動実行はGitHub Actionsタブの「iOS TestFlight」→ Run workflow から。

## App Store 申請の下書き（「審査へ提出」の手前まで）

入力する中身（説明文・キーワード・審査メモ・スクリーンショットなど）は `store/metadata.json` と
`store/screenshots/` にまとめてあります。

1. GitHub Secrets に次を登録する（公開したくない情報なのでリポジトリには書かない）

   | Secret名 | 内容 |
   |---|---|
   | APP_REVIEW_CONTACT_FIRST_NAME | 審査の連絡先：名 |
   | APP_REVIEW_CONTACT_LAST_NAME | 審査の連絡先：姓 |
   | APP_REVIEW_CONTACT_PHONE | 審査の連絡先：電話番号（例 +81 90 1234 5678） |
   | APP_REVIEW_CONTACT_EMAIL | 審査の連絡先：メール |
   | APP_REVIEW_DEMO_USER | 審査用デモアカウントのメールアドレス |
   | APP_REVIEW_DEMO_PASSWORD | 審査用デモアカウントのパスワード |
   | APP_STORE_COPYRIGHT | 著作権表示（例 `2026 Hiroya Shimizu`） |

2. Actions タブ →「App Store 申請の下書きを入力」→ Run workflow
   - `check`：いまの状態を読むだけ（何も変えない）
   - `apply`：下書きを入力する（何度実行しても同じ結果になる）
3. 「Appのプライバシー」だけは APIキーでは入力できないため、パソコンで実行する
   （Edge が開くので Apple ID でログインすると、自動で入力して公開まで行う）

   ```
   cd scripts\app-privacy
   npm install
   node set-app-privacy.mjs
   ```

4. App Store Connect で内容を確認して「審査用に追加」→「審査へ提出」
