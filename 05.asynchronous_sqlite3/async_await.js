import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable() {
  return new Promise((resolve) => {
    db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
      resolve();
    });
  });
}

function insertTitle(title) {
  return new Promise((resolve) => {
    db.run("INSERT INTO books (title) VALUES (?)", [title], function () {
      console.log(`lastID: ${this.lastID}`);
      resolve();
    });
  });
}

function selectTitle() {
  return new Promise((resolve) => {
    db.each("SELECT id, title FROM books ORDER BY id ASC", (err, row) => {
      console.log(`${row.id}: ${row.title}`);
      resolve();
    });
  });
}

function dropTable() {
  return new Promise((resolve) => {
    db.run("DROP TABLE books");
    resolve();
  });
}

function dbClose() {
  db.close();
}

async function main() {
  await createTable();
  await insertTitle("title1");
  await insertTitle("title2");
  await insertTitle("title3");
  await insertTitle("title4");
  await selectTitle();
  await dropTable();
  dbClose();
}

main();
