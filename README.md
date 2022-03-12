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
- NestJS × マルチテナント × カスタム要件
- NestJS × マルチテナント × 運用

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
- 

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

# EOS
