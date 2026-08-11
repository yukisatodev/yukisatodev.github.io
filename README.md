# yukisatodev.github.io

自己紹介・制作物をまとめたポートフォリオサイトです。フレームワークを使わず、HTML・CSS・TypeScriptのみで一から実装しています。

🔗 **公開URL**: https://yukisatodev.github.io/

## このサイトについて

元プラント設計エンジニアが、Webエンジニアを目指してキャリアを積み重ねていく過程の記録も兼ねたサイトです。詳しい制作背景はサイト内の「このサイトについて」セクションにまとめています。

## 構成

```
yukisatodev.github.io/
  index.html               # メインページ(自己紹介・Works・スキル・年表・お問い合わせ)
  thanks.html               # お問い合わせフォーム送信後の完了ページ
  hero-illustration.png     # Aboutセクション・Worksサムネイル用イラスト
  profile-illustration.png  # Profile(年表)セクション用イラスト
  thoughts-illustration.png # Thoughtsセクション用イラスト
  sitecheck-thumb.png       # Site Checkのサムネイル
  nedaka-thumb.png          # Nedaka.のサムネイル
  src/
    main.ts                # サイトの挙動を書いたTypeScriptソース
    tsconfig.json           # コンパイル設定
```

`src/main.ts`をコンパイルした結果が`index.html`に埋め込まれる形で使われています（ビルドツールなしで完結させるため、コンパイル済みのJSを直接埋め込む構成にしています）。

## 使用技術

- HTML5 / CSS3（Grid、カスタムプロパティ、アニメーション）
- TypeScript（型を付けて実装し、コンパイルしたJSを埋め込み）
- SVG（座標計算から描画したスキルレーダーチャート）
- Canvas API（ドラッグで線を引けるミニツール）
- Intersection Observer API（スクロール演出）
- Formspree（お問い合わせフォームの送信）

## イラストについて

About・Profile・Thoughtsセクションの背景イラストと、Worksのサムネイル画像は、AI画像生成（ChatGPT）で作成しています。サイトの配色・世界観に合わせたプロンプトを自分で設計し、各セクションの内容に合わせて描き分けています。

## 開発について

普段のコーディングに加え、Claude Codeも部分的に活用しながら開発・改修を進めています。例えば、モバイル表示でナビゲーションの高さがナビの背景（backdrop）に隠れて見切れてしまう不具合は、Claude Codeで修正しました。

## 掲載中の制作物

- 🖥️ このポートフォリオサイト自体
- 🔍 [Site Check](https://github.com/yukisatodev/site-check-frontend-) — URLを入れるとSEO・セキュリティ・パフォーマンスを診断し、改善提案まで返すツール
- 📈 [Nedaka.](https://github.com/yukisatodev/nedaka-frontend) — 睡眠記録を株価チャートに見立てて可視化するツール。ローソク足・移動平均線・アナリスト風コメントつき

## ローカルで確認する

`index.html`をブラウザで直接開くだけで確認できます（ビルド不要）。
