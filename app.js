// ------------------------------------------------------------
// app.js（アプリのエントリーポイント）
// Express サーバーの起動・ミドルウェア設定・ルート読込を行う
// REST API　の考え方を用いている
// ------------------------------------------------------------

// Expressフレームワークを読み込む（HTTP サーバーを簡単に作るためのライブラリ）
const express = require("express");

// CORS（別ドメインからアクセスを許可する仕組み）ミドルウェアを読み込む
// Swiftアプリ（iOS → http://xx.xx.xx.xx:3000）とAPIサーバーの通信に必要
const cors = require("cors");

const http = require("http");        // ← 追加：WebSocketとExpressを同じサーバーで動かす
const WebSocket = require("ws");     // ← 追加


// ------------------------------------------------------------
//  ルーティングモジュールの読み込み
//  ./routes/auth.js
//  ./routes/messages.js
//  ./routes/rooms.js
//  を読み込む
//  Expressの "app.use()" でURLパスに割り当てる
// ------------------------------------------------------------
const authRoutes = require("./routes/auth");         // ログイン・ユーザー認証系
const messageRoutes = require("./routes/messages");  // メッセージ取得・送信
const roomRoutes = require("./routes/rooms");        // チャットルーム取得など

// ------------------------------------------------------------
// Expressアプリケーションの作成
// ------------------------------------------------------------
const app = express();

// ------------------------------------------------------------
// ミドルウェア設定
// ------------------------------------------------------------

// JSON形式のリクエストボディを自動で解析する
// SwiftのURLRequestで送るJSONを "req.body" に展開してくれる
app.use(express.json());

// CORSを許可する（iOSアプリからのリクエストに必要）
app.use(cors());

// ------------------------------------------------------------
// ルーターをURLパスに紐づける
// ------------------------------------------------------------

// /auth/login → authRoutes 内の POST /login が呼ばれる
// /auth/register などもここで扱える
app.use("/auth", authRoutes);

// /messages/... → messagesRoutes 内のエンドポイントが呼ばれる
app.use("/messages", messageRoutes);

// /rooms/... → roomRoutes 内のエンドポイントが呼ばれる
app.use("/rooms", roomRoutes);

// WebSocket 初期化ファイル
const { initWebSocket } = require("./websocket/connection");

// Express を HTTP server に乗せる
const server = http.createServer(app);

// WebSocket を初期化
initWebSocket(server);

// ------------------------------------------------------------
// サーバーをポート3000で起動
// ------------------------------------------------------------
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
  // http://16.176.165.34:3000 でアクセス可能
});