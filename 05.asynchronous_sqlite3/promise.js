import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function run(db, sql, bindValue) {
  return new Promise((resolve) => {
    db.run(sql, [bindValue], function () {
      resolve(this);
    });
  });
}

function each(db, sql) {
  return new Promise((resolve) => {
    const responses = [];
    db.each(sql, (err, response) => {
      responses.push(response);
      resolve(responses);
    });
  });
}

function close(db) {
  return new Promise((resolve) => {
    db.close();
    resolve();
  });
}

run(db, "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)")
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", "title1"))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", "title2"))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", "title3"))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", "title4"))
  .then((record) => {
    console.log(`lastID: ${record.lastID}`);
  })
  .then(() => each(db, "SELECT id, title FROM books ORDER BY id ASC"))
  .then((records) => {
    for (const record of records) {
      console.log(`${record.id}: ${record.title}`);
    }
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db));
