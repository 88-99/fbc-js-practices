import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL)",
  function () {
    db.run("INSERT INTO books (title) VALUES (null)", function (err) {
      if (err) {
        console.error("Error発生1", err.message);
      } else {
        console.log(`lastID: ${this.lastID}`);
      }
      db.run("INSERT INTO books (title) VALUES (null)", function (err) {
        if (err) {
          console.error("Error発生2", err.message);
        } else {
          console.log(`lastID: ${this.lastID}`);
        }
        db.run("INSERT INTO books (title) VALUES (null)", function (err) {
          if (err) {
            console.error("Error発生3", err.message);
          } else {
            console.log(`lastID: ${this.lastID}`);
          }
          db.run("INSERT INTO books (title) VALUES (null)", function (err) {
            if (err) {
              console.error("Error発生4", err.message);
            } else {
              console.log(`lastID: ${this.lastID}`);
            }
            db.each(
              "SELECT id, name FROM books ORDER BY id ASC",
              (err, row) => {
                if (err) {
                  console.error("Error発生5", err.message);
                } else {
                  console.log(`${row.id}: ${row.title}`);
                }
              },
              (err) => {
                if (err) {
                  console.error("Error発生6", err.message);
                } else {
                  db.run("DROP TABLE books", () => {
                    db.close();
                  });
                }
              }
            );
          });
        });
      });
    });
  }
);
