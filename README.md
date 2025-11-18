# API開発

## まずはSSH接続を実施
```zsh
ssh -i ~/.ssh/Test-API-Server.pem ubuntu@16.176.165.34
```

## EC2サーバーからMysql DBにアクセス
```zsh
mysql -h test-database.c7cowisaex51.ap-southeast-2.rds.amazonaws.com -u taiki -p
```

# 目次
- [MySQL](#mysql)
  - [MySQL基本コマンド集](#based-mysql-command)   

# MySQL
```sql
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255),
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Based MySQL Command

ここでは、MySQL 上でよく使う基本コマンドを、実際の操作例とともに説明します。  
対話モード（`mysql>` プロンプト）で実行することを想定しています。

---

## 1. データベース一覧の表示

```sql
SHOW DATABASES;
```

**説明：**  
現在の MySQL サーバー上に存在するデータベースの一覧を表示します。

---

## 2. 使用するデータベースの選択

```sql
USE appdb;
```

**説明：**  
作業対象とするデータベースを選択します。

---

## 3. テーブル一覧を表示

```sql
SHOW TABLES;
```

**説明：**  
選択中のデータベースに存在するテーブルの一覧を表示します。

---

## 4. テーブル作成（CREATE TABLE）

```sql
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255),
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**カラムの説明：**

- `id INT AUTO_INCREMENT PRIMARY KEY`  
  - 自動採番の主キー（1,2,3...）  
- `user VARCHAR(255)`  
  - 投稿者名（最大255文字）  
- `text TEXT`  
  - メッセージ本文（長めの文字列向け）  
- `created_at DATETIME DEFAULT CURRENT_TIMESTAMP`  
  - レコード作成時に現在時刻を自動挿入

---

## 5. テーブル構造の確認（DESCRIBE）

```sql
DESCRIBE messages;
```

**説明：**  
テーブルのカラム構成・型・キーなどを確認できます。

---

## 6. データの挿入（INSERT）

```sql
INSERT INTO messages (user, text)
VALUES ('taiki', 'hello');
```

**説明：**  
`id` と `created_at` は自動で入るため指定不要。

---

## 7. データの取得（SELECT）

```sql
SELECT id, user, text, created_at
FROM messages
ORDER BY id DESC;
```

**説明：**  
`ORDER BY id DESC` で新しい順に並び替え。

---

## 8. テーブル内の全件確認

```sql
SELECT * FROM messages;
```

**説明：**  
すべてのカラムを取得。とりあえず中身を確認したいときに便利。

---

## 9. MySQL からログアウト

```sql
EXIT;
```

**説明：**  
MySQL プロンプトを終了し、シェルに戻ります。

---
