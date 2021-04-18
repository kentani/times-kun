# 分報くん

## ClaspとGASのSetup

### clone
```sh
git clone https://github.com/kentani/times-kun.git
or
git clone git@github.com:kentani/times-kun.git
or
gh repo clone kentani/times-kun
```

### GASでAPIの設定をオンにする
[こちら](https://script.google.com/home/usersettings)からGoogle Apps Script APIをオンにする

### claspのインストールとログイン

```sh
npm i @google/clasp -g
clasp login
```

### プロジェクトの作成

```sh
npm init -y
npm install -D @google/clasp
npm install -S @types/google-apps-script
clasp create <プロジェクト名>
```

※ standaloneを選択する

※ 既存のGASからclaspプロジェクトを作成する場合は `clasp clone <スクリプトID>`

### .clasp.jsonでルートディレクトリを指定

```json
{
  "scriptId":"スクリプトID",
  "rootDir": "./src",
}
```

### ルートディレクトリを作成

```
mkdir src
```

## 利用するclaspコマンド

### open

```sh
clasp open
```

### pull

```sh
clasp pull
```

### push

```sh
clasp push
```

## デプロイする
- GASで「新しいデプロイ > 種類の選択 > ウェブアプリ」を選択
  - アクセスできるユーザーを全員にする
  - デプロイ
  - ウェブアプリのURLをコピーする

## How to use

### 事前準備
- ClaspとGASのSetupとデプロイを済ませる
- 分報を集約させるチャンネルを作成する（例：times__all）
- Copy link でチャンネルのリンクをコピーしチャンネルIDをコピーする

### Bot作成
- [こちら](https://api.slack.com/apps)から Create New App
- Basic Information
  - App Credentialsで以下をコピーする
    - App ID
    - Verification Token
  - Display Informationで以下を設定する
    - App name（例：分報くん）
    - Short description（例：分報を一つのチャンネルに集約する）
    - App icon & Preview（例：/images/times-kun.png）
    - Background color（例：#000000）
- App Home
  - App Display Nameで以下を編集する
    - Display Name (Bot Name)（例：分報くん）
    - Default Name（例：times-kun）
  - Home Tab
    - 有効にする
- OAuth & Permissions
  - Scopesで以下を追加する
    - channels:history
    - channels:join
    - channels:read
    - chat:write
  - OAuth Tokens for Your Workspace
    - Install to Workspace でワークスペースにBotをインストール
    - Bot User OAuth Tokenをコピーする
- Event Subscriptions
  - Subscribe to bot eventsで以下を追加
    - message.channels
- GASのプロパティを設定する
  - setup.jsのsetPropertiesで以下を設定する
    - VerificationToken = Verification Token
    - AccessToken = Bot User OAuth Token 
    - PostChannel = 集約するチャンネルのID
    - BotId = App ID
  - setProperties を実行
- Event Subscriptions
  - Enable Events
   - 有効にする
   - Request URLでAPIの検証
     - ウェブアプリのURLを貼り付ける
     - VerifiedになればOK

### Bot導入
- 分報を集約させるチャンネル（例：times__all）でBot（例：分報くん）にメンションし参加させる
- 集約したいチャンネルでBot（例：分報くん）にメンションし参加させる
- setup.jsのjoinChannelsで`/^times_/`にマッチするチャンネルに一括で参加させることも可能

## References
- clasp
  - https://qiita.com/jiroshin/items/dcc398285c652554e66a
  - https://kosa3.medium.com/gas%E3%82%92clasp%E3%81%A8typescript%E3%81%A7%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E9%96%8B%E7%99%BA%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F-e7835d1763ed
- slack
  - https://zenn.dev/ryo_kawamata/articles/times-all-bot
