# Get Inspired App — state分析メモ

## 目的

React公式「Reactの流儀」の考え方に沿って、Get Inspired Appで **何をstateとして保持し、何をstateにしないか** を整理する。

## 判定基準

1. 操作によって変化し、再レンダーに反映する必要があるか。
2. propsとして親から渡される値ではないか。
3. 既存のstateやprops、固定データから算出できないか。

**既存の値から算出できるものは、新たなstateにしない。**

## state分析一覧

| 対象                             | stateか    | 理由                                                                                    |
| -------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| `language`                       | ○          | 日本語／英語の切り替え操作で変化する。`DescribingUi.jsx` で保持する。                   |
| `index`                          | ○          | 「Inspire me again」ボタンで次の表示対象へ進む。`InspirationGenerator.jsx` で保持する。 |
| `setLanguage`                    | ×          | `language` のstate更新関数であり、state値そのものではない。                             |
| `setIndex`                       | ×          | `index` のstate更新関数であり、state値そのものではない。                                |
| `inspiration`                    | ×          | `inspirations[index]` から毎回取得できる。                                              |
| `inspirations`                   | ×          | `inspirations.js` で定義した固定データ。                                                |
| `inspiration.type`               | ×          | 選択した`inspiration`のプロパティ。                                                     |
| `inspiration.value`              | ×          | 選択した`inspiration`のプロパティ。                                                     |
| `language`（子コンポーネント内） | ×（props） | `InspirationGenerator` では親から受け取るprops。stateの所有者は `DescribingUi`。        |
| `children`                       | ×（props） | 親コンポーネントから渡される要素。                                                      |
| `year`                           | ×（props） | `Copyright` に親から渡される値。                                                        |
| タイトル・説明文・ボタンの文言   | ×          | `language` に応じた条件分岐で決まる。                                                   |
| 翻訳済みの名言                   | ×          | `inspiration.value[language]` から取得できる。                                          |
| 背景色                           | ×          | 色データの `inspiration.value` から決まる。                                             |

## stateの所有場所とデータの流れ

```text
DescribingUi
├── state: language ('ja' / 'en')
├── 言語切り替えボタン → setLanguage(...)
├── FancyText（タイトル） ← languageに応じたtext
└── InspirationGenerator ← props: language
    ├── state: index
    ├── inspiration = inspirations[index]  ← 算出値
    ├── FancyText（名言） ← inspiration.value[language] ※quoteの場合
    ├── Color ← inspiration.value ※colorの場合
    ├── 次へボタン → setIndex(...)
    └── Copyright ← childrenとして受け取る
```

※ `FancyText` と `Color` は条件に応じてどちらか一方がレンダーされる。`Copyright` は `InspirationGenerator` が直接importしているわけではない。

## 実装コードによる確認

### 1. 言語はstate

```jsx
const [language, setLanguage] = useState("ja");
```

言語切り替えボタンが `setLanguage` を呼び出すと、言語に依存する表示が更新される。

### 2. 表示位置はstate

```jsx
const [index, setIndex] = React.useState(0);
const next = () => setIndex((index + 1) % inspirations.length);
```

ボタン操作で `index` が変化する。

### 3. 選択中のデータはstateではない

```jsx
const inspiration = inspirations[index];
```

`index` と固定配列 `inspirations` があれば取得できるため、別途 `useState` で保持する必要はない。

### 4. 表示文字列もstateではない

```jsx
<FancyText text={inspiration.value[language]} />
```

言語と選択データから求められる。別のstateとして保存すると同期の手間が増える。

## 結論

Get Inspired Appで独立して保持する必要があるstateは **`language` と `index` の2つ**。

- `language`：`DescribingUi.jsx` が管理し、必要な子へpropsで渡す。
- `index`：`InspirationGenerator.jsx` が管理する。
- その他の表示データは、props・固定データ・stateから算出する。

この設計により、stateの重複を避け、データの不整合を防ぎやすくなる。
