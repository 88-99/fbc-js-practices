import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(sql, title) {
  return new Promise((resolve) => {
    db.run(sql, [title], function () {
      resolve(this);
    });
  });
}

function each(sql) {
  return new Promise((resolve) => {
    return db.each(sql, (err, row) => console.log(`${row.id}: ${row.title}`));
  });
}

function close() {
  db.close();
}

run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)")
  .then(() =>
    run("INSERT INTO books (title) VALUES (?)", "title1").then((response) => {
      console.log(`lastID: ${response.lastID}`);
    })
  )
  .then(() =>
    run("INSERT INTO books (title) VALUES (?)", "title2").then((response) => {
      console.log(`lastID: ${response.lastID}`);
    })
  )
  .then(() =>
    run("INSERT INTO books (title) VALUES (?)", "title3").then((response) => {
      console.log(`lastID: ${response.lastID}`);
    })
  )
  .then(() =>
    run("INSERT INTO books (title) VALUES (?)", "title4").then((response) => {
      console.log(`lastID: ${response.lastID}`);
    })
  )
  .then(() => each("SELECT id, title FROM books ORDER BY id ASC"))
  .then(() => run("DROP TABLE books"))
  .then(() => close());
