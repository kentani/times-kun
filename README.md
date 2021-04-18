# 分報くん

## Setup

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

## References
- https://qiita.com/jiroshin/items/dcc398285c652554e66a
- https://kosa3.medium.com/gas%E3%82%92clasp%E3%81%A8typescript%E3%81%A7%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E9%96%8B%E7%99%BA%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F-e7835d1763ed
