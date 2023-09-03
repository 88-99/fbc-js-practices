import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", function () {
  db.run("INSERT INTO books (title) VALUES ('title1')", function () {
    console.log(`lastID: ${this.lastID}`),
      db.run("INSERT INTO books (title) VALUES ('title2')", function () {
        console.log(`lastID: ${this.lastID}`),
          db.run("INSERT INTO books (title) VALUES ('title3')", function () {
            console.log(`lastID: ${this.lastID}`),
              db.run(
                "INSERT INTO books (title) VALUES ('title4')",
                function () {
                  console.log(`lastID: ${this.lastID}`),
                    db.each(
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
              );
          });
      });
  });
});
