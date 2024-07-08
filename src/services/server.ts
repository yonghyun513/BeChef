import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "morning",
});

// 데이터베이스 연결 관련 콘솔
connection.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결 오류:", err);
    return;
  }
  console.log("데이터베이스에 연결되었습니다.");
});

app.get("/search", (req, res) => {
  const { query } = req.query;
  const searchQuery = `
    SELECT s.storeId, s.name AS storeName, s.address, s.latitude, s.longitude, m.name AS menuName 
    FROM stores s 
    LEFT JOIN menus m ON s.storeId = m.storeId
    WHERE s.name LIKE ? OR s.address LIKE ? OR m.name LIKE ?
  `;
  connection.query(
    searchQuery,
    [`%${query}%`, `%${query}%`, `%${query}%`],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err); // 추가된 로그
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
