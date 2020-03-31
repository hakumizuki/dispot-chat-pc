# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# dispot-chat-pcの概要
- dispotのチャット機能のみ(pc版)テーブル設計
  - users
    name|string|null: false, unique: true|
    email|string|nf, ut|
    password|string|nf|
    image|string|nf(*1 = defaultを設定して、nfを外す予定、サイズを正方形に直す)|
    text|text||
    - has_many: groups(through: groups_users), messages, groups_users

  - groups
    name|string|nf, ut|
    image|string|nf(*1)|
    - has_many: users(through: groups_users), messages, groups_users

  - notes
    name|string|nf(*1)|
    content|text||
    image|string||
    url|string||
    group_id|reference|nf, ft|
    - belongs_to: group

  - groups_users
    user_id|reference|nf, ft|
    group_id|reference|nf, ft|
    - belongs_to: user, group

  - messages
    content(urlを感知してリンクにする)|text||
    image|string||
    user_id|reference|nf, ft|
    group_id|reference|nf, ft|
    - belongs_to: user, group

    グループ招待機能