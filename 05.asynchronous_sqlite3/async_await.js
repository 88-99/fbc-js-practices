import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable() {
  return new Promise((resolve) => {
    db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
      resolve();
    });
  });
}

function insertTitle1() {
  return new Promise((resolve) => {
    db.run("INSERT INTO books (title) VALUES ('title1')", function () {
      console.log(`lastID: ${this.lastID}`);
      resolve();
    });
  });
}

function insertTitle2() {
  return new Promise((resolve) => {
    db.run("INSERT INTO books (title) VALUES ('title2')", function () {
      console.log(`lastID: ${this.lastID}`);
      resolve();
    });
  });
}

function insertTitle3() {
  return new Promise((resolve) => {
    db.run("INSERT INTO books (title) VALUES ('title3')", function () {
      console.log(`lastID: ${this.lastID}`);
      resolve();
    });
  });
}

function insertTitle4() {
  return new Promise((resolve) => {
    db.run("INSERT INTO books (title) VALUES ('title4')", function () {
      console.log(`lastID: ${this.lastID}`);
      resolve();
    });
  });
}

function selectTitle() {
  return db.each(
    "SELECT id, title FROM books ORDER BY id ASC",
    (err, row) => {
      console.log(`${row.id}: ${row.title}`);
    },
    () => {
      db.run("DROP TABLE books", () => {
        db.close();
      });
    }
  );
}

async function main() {
  await createTable();
  await insertTitle1();
  await insertTitle2();
  await insertTitle3();
  await insertTitle4();
  selectTitle();
}

main();
