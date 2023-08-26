import sqlite3 from "sqlite3";
import { run, each, close } from "./functions.js";

const db = new sqlite3.Database(":memory:");

run(db, "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, content TEXT)")
  .then(() =>
    run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title1",
      "content1"
    )
  )
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title2",
      "content2"
    );
  })
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title3",
      "content3"
    );
  })
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title4",
      "content4"
    );
  })
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
    each(db, "SELECT id, title, content FROM books ORDER BY id ASC", (row) =>
      console.log(`${row.id}: ${row.title}, ${row.content}`)
    );
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db))
  .catch((err) => console.error("Error発生", err));
