import * as readline from "node:readline/promises";

export class Content {
  #lines;
  constructor() {
    this.#lines = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  get lines() {
    return this.#lines;
  }

  set lines(line) {
    this.#lines.push(line);
  }

  input() {
    return new Promise((resolve) => {
      this.rl.on("line", (input) => {
        this.lines = input;
      });

      this.rl.on("close", () => {
        this.rl.close();
        resolve(this.#lines);
      });
    });
  }
}
