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

# MySQL
```sql
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(255),
  text TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
