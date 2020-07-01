# go-todo-client

```
cue-lab 2019の成果物
```

- vue3.0(beta)+Typescript で実装
https://composition-api.vuejs.org/#summary

- バックエンドは Golang(echo)

## memo

- LINE でリマインド
- share 機能で簡単に LINE 連携
- Google ログイン doing

- タグでタスクをフィルタ
- タスクの新規追加はモーダル
- タグの新規追加はモーダル
- 一度作ったタグは更新できない
- 既存のタスクをタップで編集モーダル(期限、タイトル、詳細を変更できる)
- 既存のタスクのタグアイコンアップでタグ編集モーダル

## API

### データモデル

- タスク
```
    id: string タスクID
    title: string タスク名
    detail: string  タスク詳細
    limit: string　佐期限
    tags: Tag[]　タグ
    user: string　ユーザー
```

- タグ
```
    id: string　タグID
    name: string　タグ名
    user: string　ユーザー
```

### タスクAPI
#### GET /tasks タスク一覧取得
##### パラメータ
query:なし
header[x-user]:ユーザー

##### レスポンス
タスクのjson配列

---

#### POST /tasks タスク新規登録

##### パラメータ
body:タスクjson
header[x-user]:ユーザー

##### レスポンス
追加されたタスクのID

---

#### PUT /tasks タスク更新
##### パラメータ
body:タスクjson
header[x-user]:ユーザー

##### レスポンス
なし

---

#### DELETE /tasks　タスク削除
##### パラメータ
query:削除対象のタスクID
header[x-user]:ユーザー

##### レスポンス
なし

---

#### POST /tasks/tags　タグ付け
―

### タグAPI

---

#### POST /tags
タグ新規登録
##### パラメータ
body:タグjson
header[x-user]:ユーザー

##### レスポンス
なし


## 実行方法
```
npm install
npm run serve
```
