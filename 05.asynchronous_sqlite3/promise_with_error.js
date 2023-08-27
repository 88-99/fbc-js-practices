import sqlite3 from "sqlite3";
import { run, each } from "./functions_with_error.js";
import { close } from "./functions.js";

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
  .catch((err) => console.error("Error発生1", err))
  .then((record) => {
    if (record) {
      console.log(`lastID: ${record.lastID}`);
    }

    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title2",
      "content2"
    );
  })
  .catch((err) => console.error("Error発生2", err))
  .then((record) => {
    if (record) {
      console.log(`lastID: ${record.lastID}`);
    }

    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title3",
      "content3"
    );
  })
  .catch((err) => console.error("Error発生3", err))
  .then((record) => {
    if (record) {
      console.log(`lastID: ${record.lastID}`);
    }

    return run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      "title4",
      "content4"
    );
  })
  .catch((err) => console.error("Error発生4", err))
  .then((record) => {
    if (record) {
      console.log(`lastID: ${record.lastID}`);
    }

    return each(
      db,
      "SELECT id, title, content FROM books ORDER BY id ASC",
      (row) => console.log(`${row.id}: ${row.title}, ${row.content}`)
    );
  })
  .catch((err) => console.error("Error発生5", err))
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db));
