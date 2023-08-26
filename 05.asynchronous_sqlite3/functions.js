function run(db, sql, ...params) {
  return new Promise((resolve) => {
    db.run(sql, ...params, function () {
      resolve(this);
    });
  });
}

function each(db, sql, callback) {
  return new Promise((resolve) => {
    db.each(
      sql,
      (err, row) => {
        callback(row);
      },
      () => {
        resolve();
      }
    );
  });
}

function close(db) {
  return new Promise((resolve) => {
    db.close(() => resolve());
  });
}

export { run, each, close };
