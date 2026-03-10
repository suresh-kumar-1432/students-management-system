const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.get("/students", async (req, res) => {

  try {

    const result = await pool.query("SELECT * FROM students");

    res.json(result.rows);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Failed to fetch students" });

  }

});

app.post("/students", async (req, res) => {

  try {

    const { name, email, age } = req.body;

    const result = await pool.query(
      "INSERT INTO students(name,email,age) VALUES($1,$2,$3) RETURNING *",
      [name, email, age]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Failed to add student" });

  }

});

app.put("/students/:id", async (req, res) => {

  try{
    const id = req.params.id;
  const { name, email, age } = req.body;

  await pool.query(
    "UPDATE students SET name=$1,email=$2,age=$3 WHERE id=$4",
    [name, email, age, id]
  );

  res.json({ message: "Student updated" });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: "Failed to fetch students" });
  }

});

app.delete("/students/:id", async (req, res) => {
  
  try{
    const id = req.params.id;

  await pool.query(
    "DELETE FROM students WHERE id=$1",
    [id]
  );

  res.json({ message: "Student deleted" });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Failed to fetch students" });
  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});