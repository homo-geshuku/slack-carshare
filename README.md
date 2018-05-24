# slack-carshare
slackからいい感じに下宿カーのガソリン割り勘を実現するなにか

## ページ

[https://homo-geshuku.github.io/slack-carshare/index](https://homo-geshuku.github.io/slack-carshare/index)

## 使い方

1. URLにパラメータとして"?client_id=hoge&client_secret=fuga"の形でSlackのclient_idとclient_secretを追記してhttps://homo-geshuku.github.io/slack-carshare/index へアクセス(" https://homo-geshuku.github.io/slack-carshare/index)?client_id=hoge&client_secret=fuga "の形でアクセス
2. ダイアログボックスに従い、Slack認証画面からoAuth認証を通す
3. 上部の日付で開始日と終了日を入力(wip)
4. その日付の期間内のSlackチャンネルの投稿が表示(wip)
