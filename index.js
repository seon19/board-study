import express, {Router} from "express";
import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test1234",
    database: "burumi"
})
const app = express();
const router = Router();

app.use(express.json());

// 게시글 몽땅 가져오기 
router.get("/list", (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM notices", (error, rows, fields) => {
        if(error) throw new Error("오류 발생");
        res.status(200).json({result: rows});
    })
});

// 게시글 하나 가져오기 
router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM notices WHERE _id=${id}`, (error, rows, fields) => {
        if(error) console.log(error);
        res.status(200).json({result: rows[0]});
    })
});

// 게시글 작성
router.post("/write", (req, res) => {
    const body = req.body;
    try {
        connection.query(`INSERT INTO notices (title, content) VALUE ('${body.title}', '${body.content}')`);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

    res.status(200).json({result: "success"});
})

app.use("/article", router);
app.listen(3000, () => {
    connection.connect();
    console.log("서버가 열림.");
})