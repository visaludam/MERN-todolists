CREATE DATABASE mytodo;

CREATE TABLE todolist(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)