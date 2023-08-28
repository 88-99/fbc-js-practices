import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", function () {
  db.run("INS INTO books (title) VALUES ('title1')", function (err) {
    if (err) {
      console.error("Error発生", err.message);
    } else {
      console.log(`lastID: ${this.lastID}`);
    }
    db.run("INSERT INTO books (title) VALUES ('title2')", function (err) {
      if (err) {
        console.error("Error発生2", err.message);
      } else {
        console.log(`lastID: ${this.lastID}`);
      }
      db.run("INSERT INTO books (title) VALUES ('title3')", function (err) {
        if (err) {
          console.error("Error発生3", err.message);
        } else {
          console.log(`lastID: ${this.lastID}`);
        }
        db.run("INSERT INTO books (title) VALUES ('title4')", function (err) {
          if (err) {
            console.error("Error発生4", err.message);
          } else {
            console.log(`lastID: ${this.lastID}`);
          }
          db.each(
            "SEL id, title FROM books ORDER BY id ASC",
            (err, row) => {
              if (err) {
                console.error("Error発生5", err.message);
              } else {
                console.log(`${row.id}: ${row.title}`);
              }
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
