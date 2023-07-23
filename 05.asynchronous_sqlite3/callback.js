import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
  db.run("INSERT INTO books (title) VALUES ('title1')", () => {
    db.run("INSERT INTO books (title) VALUES ('title2')", () => {
      db.run("INSERT INTO books (title) VALUES ('title3')", () => {
        db.run("INSERT INTO books (title) VALUES ('title4')", () => {
          db.each(
            "SELECT rowid AS id, title FROM books ORDER BY id ASC",
            (err, row) => {
              console.log(row.id + ": " + row.title);
            },
            () => {
              db.run("DROP TABLE books", () => {
                db.close();
              });
            }
          );
        });
      });
    });
  });
});
