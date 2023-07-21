import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

function insertRecord() {
  return new Promise((resolve) => {
    db.run("CREATE TABLE books (title TEXT)", () => {
      const stmt = db.prepare("INSERT INTO books VALUES (?)");
      for (let i = 0; i < 10; i++) {
        stmt.run("title" + (i + 1));
      }
      stmt.finalize();
      resolve();
    });
  });
}

insertRecord()
  .then(() => {
    setTimeout(function () {
      db.each("SELECT rowid AS id, title FROM books", (err, row) => {
        console.log(row.id + ": " + row.title);
      });
    }, 10);
  })
  .then(() => {
    () => {
      db.run("DROP TABLE books");
      db.close();
    };
  });
