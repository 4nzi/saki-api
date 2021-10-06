## 仕様

- 漫画-saki-のキャラデータを返すAPI
- 学校のデータには所属しているキャラを含める

## プラットフォーム

- Web API
- 誰でも叩ける

## URI設計

| メソッド | URI                    | 詳細          |
| -------- | ---------------------- | ------------- |
| GET      | /api/v1/characters     | キャラのリスト |
| GET      | /api/v1/characters/:id | キャラの詳細　 |    
| GET      | /api/v1/schools        | 学校のリスト   |
| GET      | /api/v1/schools/:id    | 学校の詳細 　  |

## 技術

- Node.js(Express)
- Firebase(Functions, Firestore)

