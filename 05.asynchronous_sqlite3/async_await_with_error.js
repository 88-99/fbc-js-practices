#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { run, each, close } from "./functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  try {
    await run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, content TEXT)"
    );

    const record1 = await run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content1"
    );
    console.log(`lastID: ${record1.lastID}`);
  } catch (err) {
    console.error("Error発生1", err.message);
  }

  try {
    const record2 = await run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content2"
    );
    console.log(`lastID: ${record2.lastID}`);
  } catch (err) {
    console.error("Error発生2", err.message);
  }

  try {
    const record3 = await run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content3"
    );
    console.log(`lastID: ${record3.lastID}`);
  } catch (err) {
    console.error("Error発生3", err.message);
  }

  try {
    const record4 = await run(
      db,
      "INSERT INTO books (title, content) VALUES (?, ?)",
      null,
      "content4"
    );
    console.log(`lastID: ${record4.lastID}`);
  } catch (err) {
    console.error("Error発生4", err.message);
  }

  try {
    await each(
      db,
      "SELECT id, name, content FROM books ORDER BY id ASC",
      (row) => console.log(`${row.id}: ${row.title}, ${row.content}`)
    );
  } catch (err) {
    console.error("Error発生5", err.message);
  }

  try {
    await run(db, "DROP TABLE books");
    await close(db);
  } catch (err) {
    console.error("Error発生6", err.message);
  }
}

main();
