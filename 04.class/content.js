import * as readline from "node:readline/promises";

export class Content {
  constructor() {
    this._lines = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  get lines() {
    return this._lines;
  }

  set lines(line) {
    this._lines.push(line);
  }

  input() {
    return new Promise((resolve, reject) => {
      this.rl.on("line", (input) => {
        this.lines = input;
      });

      this.rl.on("close", () => {
        this.rl.close();
        resolve(this.lines);
      });
    });
  }
}
