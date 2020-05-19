const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/todo", async(req,res) => {
    try{
        const {description} = req.body
        const newToDo = await pool.query("INSERT INTO todolist (description) VALUES($1) RETURNING *",[description]);
        res.json(newToDo.rows[0])
    }catch(e){
        console.log(e.message);
    }
})
//get all todolist
app.get("/todo", async(req,res) => {
    try{
        const allToDo = await pool.query("SELECT * FROM todolist");
        res.json(allToDo.rows)
    }catch(e){
        console.log(e.message);
    }
})

//get a specific todo
app.get("/todo/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const toDo = await pool.query("SELECT * FROM todolist WHERE todo_id = $1",[id]);
        res.json(toDo.rows[0])
    }catch(e){
        console.log(e.message);
    }
})

//update a specific todo
app.put("/todo/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await pool.query("UPDATE todolist SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("ToDo is updated !")
    }catch(e){
        console.log(e.message);
    }
})

//delete a todo
app.delete("/todo/:id", async(req,res) => {
    try{
        const {id} = req.params;
        const deleteToDo = await pool.query("DELETE FROM todolist WHERE todo_id = $1",[id]);
        res.json("ToDo is deleted !")
    }catch(e){
        console.log(e.message);
    }
})

app.listen(5000, ()=> {
    console.log("Server has started on port 5000.");
});
