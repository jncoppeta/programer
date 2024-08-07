const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "password",
    database: "programer"
})

app.listen(8081, () => {
    console.log("listening on port 8081")
    db.connect(function(err){
        if(err) throw err;
        console.log("Database connected!")
    })
})

app.get('/', (req, res) => {
    return res.json("You hit the backend!")
})

app.get("/exercises", (req, res) => {
    const sql = "SELECT * FROM exercises";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/weeks", (req, res) => {
    programName = req.query.program
    weekNum = req.query.week
    const sql = `SELECT numDay FROM programer.weeks WHERE \`week\` = '${weekNum}' AND \`program\` = '${programName}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/weeks/info", (req, res) => {
    programName = req.query.program
    weekNum = req.query.week
    const sql = `SELECT * FROM \`programer\`.\`weeks\` WHERE \`week\` = '${weekNum}' AND \`program\` = '${programName}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/weeks/program", (req, res) => {
    programName = req.query.program
    weekNum = req.query.week
    const sql = `SELECT * FROM \`programer\`.\`weeks\` WHERE \`program\` = '${programName}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/weeks/total", (req, res) => {
    programName = req.query.program
    const sql = `SELECT * FROM programer.weeks WHERE \`program\` = '${programName}'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/exercises/day", (req, res) => {
    const day = req.query.day
    const week = req.query.week
    programName = req.query.programName
    const sql = `SELECT * FROM programer.exercises WHERE \`day\` = '${day}' AND \`week\` = '${week}' AND \`programName\` = '${programName}';`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/exercises/program", (req, res) => {
    const program = req.query.program
    const sql = `SELECT * FROM programer.exercises WHERE \`programName\` = '${program}';`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/exercises/id", (req, res) => {
    const id = req.query.id
    const sql = `SELECT * FROM \`programer\`.\`exercises\` WHERE \`id\` = '${id}';`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/exercises/week", (req, res) => {
    const week = req.query.week
    programName = req.query.programName
    const sql = `SELECT * FROM programer.exercises WHERE \`week\` = '${week}' AND \`programName\` = '${programName}';`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/programs", (req, res) => {
    const sql = `SELECT * FROM programer.programs`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/programs/pending", (req, res) => {
    const sql = `SELECT * FROM programs WHERE \`status\` = 'pending'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.get("/programs/published", (req, res) => {
    const sql = `SELECT * FROM programs WHERE \`status\` = 'published'`;
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/create/exercise", (req, res) => {

    const sql = `INSERT INTO \`programer\`.\`exercises\` (\`name\`, \`warmupSets\`, \`workingSets\`, \`reps\`, \`percentage\`, \`notes\`, \`day\`, \`week\`, \`programName\`) VALUES ('${decodeURIComponent(req.body.name)}', '${decodeURIComponent(req.body.warmupSets)}', '${decodeURIComponent(req.body.workingSets)}', '${decodeURIComponent(req.body.reps)}', '${decodeURIComponent(req.body.percentage)}', '${decodeURIComponent(req.body.notes)}', '${decodeURIComponent(req.body.day)}', '${decodeURIComponent(req.body.week)}', '${decodeURIComponent(req.body.programName)}');`;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/create/program", (req, res) => {

    const sql = `INSERT INTO \`programer\`.\`programs\` (\`name\`, \`description\`, \`status\`) VALUES ('${decodeURIComponent(req.body.name)}', '${decodeURIComponent(req.body.description)}', 'pending');`;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/add/week", (req, res) => {

    console.log(req.body)
    const sql = `INSERT INTO \`programer\`.\`weeks\` (\`week\`, \`numDay\`, \`program\`) VALUES ('${decodeURIComponent(req.body.weekNum)}', '${decodeURIComponent(req.body.dayNum)}', '${decodeURIComponent(req.body.program)}');`;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.put("/update/exercise", (req, res) => {
    
    const sql = `UPDATE \`programer\`.\`exercises\` SET ${decodeURIComponent(req.body.body)} WHERE (\`id\` = '${decodeURIComponent(req.body.id)}');`;
    console.log(sql)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.put("/publish/program", (req, res) => {
    
    const sql = `UPDATE \`programer\`.\`programs\` SET \`status\` = 'published' WHERE (\`id\` = '${decodeURIComponent(req.body.id)}');`;
    console.log(sql)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.put("/backlog/program", (req, res) => {
    
    const sql = `UPDATE \`programer\`.\`programs\` SET \`status\` = 'pending' WHERE (\`id\` = '${decodeURIComponent(req.body.id)}');`;
    console.log(sql)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.put("/weeks/modify-days", (req, res) => {
    
    const sql = `UPDATE \`programer\`.\`weeks\` SET \`numDay\` = '${req.body.numDays}' WHERE (\`week\` = '${decodeURIComponent(req.body.weekNum)}' AND \`program\` = '${decodeURIComponent(req.body.programName)}');`;
    console.log(sql)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.put("/weeks/week", (req, res) => {
    
    const sql = `UPDATE \`programer\`.\`weeks\` SET \`week\` = '${req.body.week}' WHERE (\`id\` = '${decodeURIComponent(req.body.id)}');`;
    console.log(sql)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.delete("/remove/exercise", (req, res) => {
    const sql = `DELETE FROM \`programer\`.\`exercises\` WHERE (\`id\` = '${req.body.id}');`;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.delete("/remove/program", (req, res) => {
    const sql = `DELETE FROM \`programer\`.\`programs\` WHERE (\`id\` = '${req.body.id}');`;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.delete("/remove/day", (req, res) => {
    const sql = `DELETE * FROM \`programer\`.\`exercises\` WHERE (\`id\` = '${req.body.id}');`;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.delete("/remove/week", (req, res) => {
    const sql = `DELETE FROM \`programer\`.\`weeks\` WHERE (\`id\` = '${req.body.id}');`;
    console.log(sql)
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

