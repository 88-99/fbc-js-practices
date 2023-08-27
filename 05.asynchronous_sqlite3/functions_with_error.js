function run(db, sql, ...params) {
  return new Promise((resolve, reject) => {
    db.run(sql, ...params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function each(db, sql, callback) {
  return new Promise((resolve, reject) => {
    db.each(
      sql,
      (err, row) => {
        callback(row);
      },
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

export { run, each };
