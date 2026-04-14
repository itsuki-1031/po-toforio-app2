# po-toforio-app2

# アプリ名
YouTube風動画検索アプリ

## 概要
YouTube Data APIを使用して動画検索・再生ができるアプリです。
カテゴリ選択や検索機能を実装しています。

## 使用技術
- JavaScript
- React
- Vite
- Axios
- Tailwind CSS
- YouTube Data API

## 機能
- 動画検索（キーワード入力）
- カテゴリ別検索（アニメ / ゲーム / 音楽 / 映画）
- 動画再生ページ（ルーティング）
- ローディング表示
- ドロップダウンUI

## 工夫した点
- API通信の非同期処理（async/await）
- useStateによる状態管理
- useEffectで初期データ取得
- ドロップダウンUIでカテゴリ選択を実装

## 今後追加したい機能
- お気に入り機能
- 検索履歴
- ページネーション
- レスポンシブデザイン改善

## 起動方法
```bash
npm install
npm run dev