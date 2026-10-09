# Get Inspired App — コンポーネント階層図

React公式「UIの記述（Describing the UI）」の演習で作成したアプリに、日本語／英語切り替えを追加した現在の構成です。

## 1. コンポーネント階層図（レンダーツリー）

```text
DescribingUi
├── h1「UI の記述（章全体）」
├── div.language-switch
│   ├── button「日本語」
│   └── button「English」
├── FancyText（title=true：アプリのタイトル）
├── InspirationGenerator（language を props で受け取る）
│   ├── p（名言／カラーの案内文）
│   ├── [条件付き表示]
│   │   ├── FancyText（type === 'quote' の場合：名言）
│   │   └── Color（type === 'color' の場合：色の四角形）
│   ├── button.inspire-button（次の名言／カラーへ）
│   └── Copyright（children として渡された要素）
└── p
    └── Link（Day 3 の目次へ戻る）
```

> `FancyText`（名言）と `Color` は同時にはレンダーされません。現在の `inspiration.type` に応じて片方だけが表示されます。
>
> `Copyright` は `DescribingUi` で `<InspirationGenerator>...</InspirationGenerator>` の内側に記述され、`children` として表示されます。

## 2. コンポーネント間のデータの流れ

```text
DescribingUi
│
├── state: language ('ja' / 'en')
│   ├── 言語切り替えボタン → setLanguage('ja' / 'en')
│   ├── FancyText（タイトルの表示文字列）
│   └── InspirationGenerator（language={language}）
│       ├── state: index（表示中のデータ位置）
│       ├── inspirations[index] → inspiration
│       ├── quote → FancyText（text={inspiration.value[language]}）
│       ├── color → Color（value={inspiration.value}）
│       └── 次へボタン → setIndex(...)
│
└── Copyright（year={2004}）
```

- **`language`**：親の `DescribingUi` が管理。タイトル・説明文・名言・ボタンの言語を切り替える。
- **`index`**：子の `InspirationGenerator` が管理。表示する名言／カラーを切り替える。
- **`inspirations.js`**：名言の英語・日本語テキストとカラーコードを保持するデータファイル。Reactコンポーネントではない。

## 3. モジュール依存ツリー（import関係）

```text
DescribingUi.jsx
├── react（useState）
├── react-router-dom（Link）
├── FancyText.jsx
├── InspirationGenerator.jsx
│   ├── react
│   ├── inspirations.js
│   ├── FancyText.jsx
│   └── Color.jsx
└── Copyright.jsx
```

> `Copyright.jsx` は `InspirationGenerator.jsx` から直接 import されていません。`DescribingUi.jsx` が import して、`children` として渡しています。

## 4. ファイルごとの役割

| ファイル | 役割 |
|---|---|
| `DescribingUi.jsx` | 画面全体の構成、言語 state、言語切り替えボタン |
| `FancyText.jsx` | タイトルまたは名言のテキストを表示 |
| `InspirationGenerator.jsx` | 現在の名言／カラーの選択、次へボタン、言語に応じた表示 |
| `Color.jsx` | カラーコードに応じた色の四角形を表示 |
| `Copyright.jsx` | コピーライト表示 |
| `inspirations.js` | 名言（日本語・英語）とカラーのデータ |
| `index.css` | 言語切り替えボタン、次へボタン、色の四角形などのスタイル |

## 5. レンダーツリーとモジュール依存ツリーの違い

- **レンダーツリー**：実際に画面へ表示されるコンポーネントの親子関係。`quote` / `color` によって変化する。
- **モジュール依存ツリー**：どのファイルがどのファイルを `import` しているか。表示状態が変わっても、import関係そのものは変わらない。

※ 上記は会話内で確認した実装をもとにした図です。`index.css` のimport元や、その他のアプリ全体のルーティング階層は含めていません。
