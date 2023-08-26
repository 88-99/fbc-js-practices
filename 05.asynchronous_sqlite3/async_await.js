import sqlite3 from "sqlite3";
import { run, each, close } from "./functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, content TEXT)"
  );

  const record1 = await run(
    db,
    "INSERT INTO books (title, content) VALUES (?, ?)",
    "title1",
    "content1"
  );
  console.log(`lastID: ${record1.lastID}`);

  const record2 = await run(
    db,
    "INSERT INTO books (title, content) VALUES (?, ?)",
    "title2",
    "content2"
  ); // .then((record) => console.log(`lastID: ${record.lastID}`));
  console.log(`lastID: ${record2.lastID}`);

  const record3 = await run(
    db,
    "INSERT INTO books (title, content) VALUES (?, ?)",
    "title3",
    "content3"
  );
  console.log(`lastID: ${record3.lastID}`);

  const record4 = await run(
    db,
    "INSERT INTO books (title, content) VALUES (?, ?)",
    "title4",
    "content4"
  );
  console.log(`lastID: ${record4.lastID}`);

  await each(
    db,
    "SELECT id, title, content FROM books ORDER BY id ASC",
    (row) => console.log(`${row.id}: ${row.title}, ${row.content}`)
  );

  await run(db, "DROP TABLE books");
  await close(db);
}
main();
