---
marp: true
---

<!-- https://xhiroga.github.io/nestjs-meetup-online1-demo/README -->

# NestJSでつくるマルチテナントSaaS

---

# Agenda

- はじめに
- NestJS × マルチテナント × MongoDB
- NestJS × マルチテナント × 認証
- NestJS × マルチテナント × ロギング

---

# はじめに

---

## 自己紹介

[さわら \(@xhiroga\) / Twitter](https://twitter.com/xhiroga)

---

## 会社紹介

[株式会社 justInCaseTechnologies \| 保険を変える保険テック会社](https://justincase-tech.com/)

---

## プロダクト紹介

[保険SaaS基盤: joinsure｜株式会社justInCase：少額短期保険](https://justincase.jp/joinsure)

---

## チーム紹介

### 技術

---

## チーム紹介

### 文化

---

# NestJS × マルチテナント × MongoDB

---

# TL;DR

- MongoDBのDatabaseでテナントを分割した
- ORMにMongooseを選定した
- MongooseのコネクションはDatabaseと1:1
- リクエストスコープでMongooseをInjectするとメモリ不足になる
- Serviceのメソッド実行時、適切なコネクションでModelを生成する

---

# MongoDBのDatabaseでテナントを分割した

## 前提

- AWS DocumentDBを用いる
    - MongoDB互換のマネージドサービス
- テナントごとにデータを分離する必要がある

---

## MongoDBによるマルチテナント構成

Databaseでテナントを分割した。

| 単位 | Pros | Cons |
| --- | --- | --- |
| Cluster | セキュリティが最も高い | インフラ費用、管理コストいずれも高い, テナント数に比例してコストが増加  |
| Database | インフラ費用がテナント数に比例しない, RBACを活用しやすい | DatabaseをまたいだJOINのような処理ができないため、マスターデータとテナント固有データのJOIN処理は工夫が必要 |
| Collection | インフラ費用がテナント数に比例しない, 一つのコネクションを使い回せるので、パフォーマンスが高い | 特定のテナントのCollectionのみアクセス可能なRoleを発行するのが煩雑になる |
| Row | 実装は簡単 | MongoDBはRLSをサポートしていない |

---

## ORMにMongooseを選定した

MongoDB事例の多さから、手堅くMongooseを選定しました。

|  | NestJSサポート | Pros | Cons |
| --- | --- | --- | --- |
| mongoose | 公式Moduleあり | 実績が多い, NestJS公式ドキュメントでも取り上げられている, Transactionが使える | 公式Moduleはあるが、複数Connectionをサポートしていない |
| Typegoose | - | クラスやデコレーターを使ってモデルを素早く構築できる | 設定難易度が高い |
| TypeORM | 公式Moduleあり | 事例が多い（ただし、多くはRDBのもの） | MongoDB4系をサポートしておらず、結果Transactionが使えない |
| MikroORM | MikroORM公式のNestJS Moduleあり
https://docs.nestjs.com/recipes/mikroorm |  | 事例が少ない |
| Prisma | Moduleのサポートはなし。ただし、公式ドキュメントに解説あり。
https://docs.nestjs.com/recipes/prisma |  | MongoDBサポートはPreview |
| MongoDB SDK | - | ORM相当の処理を自前で書く必要がある | 柔軟性が高い |

---

## リクエストスコープでMongooseをInjectするとメモリ不足になる

（意訳）MongoDBとのコネクションをリクエストスコープごとに生成すれば、リクエストごとに適切なテナントに接続できるよ。

- [node\.js \- How to change a Database connection dynamically with Request Scope Providers in Nestjs? \- Stack Overflow](https://stackoverflow.com/questions/55571382/how-to-change-a-database-connection-dynamically-with-request-scope-providers-in)

---

## リクエストスコープでMongooseをInjectするとメモリ不足になる

デモ: 

```shell
# https://github.com/xhiroga/nestjs-meetup-online1-demo
% yarn dev
% curl localhost:33000/mytenant/cats
```

---

## Serviceのメソッド実行時、適切なコネクションでModelを生成する

2通りのやり方が存在する。

1. DIを使わない。ConnectionのPoolを自前で持ち、サービスの呼び出し時にModelを生成する。
2. DIを使う。Modelをリクエストスコープで宣言し、ConnectionのPoolをするProviderをInjectする。

---

## Serviceのメソッド実行時、適切なコネクションでModelを生成する

### DIを使わないサンプル

```ts
@Injectable()
export const CatsService {
    constructor() {
        private readonly connectionProvider: ConnectionProvider;
    }

    async  getCats() {
        const connection = await this.connectionProvider.getConnection();
        const cats = await connectionProvider.model('cats').find();
        return cats;
    }
}
```

```ts
@Injectable()
export class ConnectionProvider{
    // 省略
    getConnection() {
        const tenant = this.request.params.tenantId;
    }
}

```
---

## Serviceのメソッド実行時、適切なコネクションでModelを生成する

### DIを使うサンプル

デモ


---

## まとめ

単にMongooseをリクエストスコープで利用するとコネクション数に問題が発生する。
MongoDBのコネクションを自前で管理し、Model生成時に適切に注入することで要件とパフォーマンスを両立できる。

---

# NestJS × マルチテナント × ロギング

---



---

# EOS
