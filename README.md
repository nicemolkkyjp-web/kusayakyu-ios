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
