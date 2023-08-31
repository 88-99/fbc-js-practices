import sqlite3 from "sqlite3";
import { run, each, close } from "./functions.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, content TEXT)"
)
  .then(() =>
    run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content1"
    )
  )
  .catch((err) => console.error("Error発生1", err.message))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content2"
    );
  })
  .catch((err) => console.error("Error発生2", err.message))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content3"
    );
  })
  .catch((err) => console.error("Error発生3", err.message))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content4"
    );
  })
  .catch((err) => console.error("Error発生4", err.message))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return each(
      db,
      "SELECT id, name, content FROM books ORDER BY id ASC",
      (row) => console.log(`${row.id}: ${row.title}, ${row.content}`)
    );
  })
  .catch((err) => console.error("Error発生5", err.message))
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db));
