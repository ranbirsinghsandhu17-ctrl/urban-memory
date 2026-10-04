const express = require("express");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test MySQL connection
app.get("/api/test", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS test");

        res.json({
            message: "MySQL connected successfully!",
            result: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

// Get subjects
app.get("/api/subjects", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM subjects ORDER BY id DESC"
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Add subject
app.post("/api/subjects", async (req, res) => {
    try {

        const { name } = req.body;

        const [result] = await db.execute(
            "INSERT INTO subjects (name) VALUES (?)",
            [name]
        );

        res.json({
            message: "Subject added successfully",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

// Get tasks
app.get("/api/tasks", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM tasks ORDER BY id DESC"
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

// Add task
app.post("/api/tasks", async (req, res) => {

    try {

        const { title } = req.body;

        const [result] = await db.execute(
            "INSERT INTO tasks (title) VALUES (?)",
            [title]
        );

        res.json({
            message: "Task added successfully",
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
});

app.listen(3000, () => {

    console.log(
        "StudyTrack running at http://localhost:3000"
    );

});