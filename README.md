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

# EOS
