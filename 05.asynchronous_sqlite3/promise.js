import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable() {
  return new Promise((resolve) => {
    db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
      resolve();
    });
  });
}

createTable()
  .then(() => insertTitle("title1"))
  .then(() => insertTitle("title2"))
  .then(() => insertTitle("title3"))
  .then(() => insertTitle("title4"))
  .then(() => selectRecord())
  .then(() => doropTable())
  .then(() => db.close());

function insertTitle(title) {
  return new Promise((resolve) => {
    db.run("INSERT INTO books (title) VALUES (?)", [title], function () {
      console.log(`lastID: ${this.lastID}`);
      resolve();
    });
  });
}

function selectRecord() {
  return new Promise((resolve) => {
    return db.each(
      "SELECT id, title FROM books ORDER BY id ASC",
      (err, row) => {
        console.log(`${row.id}: ${row.title}`);
        resolve();
      }
    );
  });
}

function doropTable() {
  return new Promise((resolve) => {
    db.run("DROP TABLE books");
    resolve();
  });
}
