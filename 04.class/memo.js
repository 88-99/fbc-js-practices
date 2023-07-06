#!/usr/bin/env node

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import fs from "node:fs";
import enquirer from "enquirer";
import { program } from "commander";

const { Select } = enquirer;
const rl = readline.createInterface({ input, output });

program
  .option("-l, --list", "display list")
  .option("-d, --delete", "delete a memo")
  .parse();
const options = program.opts();

function select_memo() {
  const prompt = new Select({
    name: "memo",
    message: "メモを選択して Enterキー を押してください",
    choices: memos,
  });
  prompt
    .run()
    .then((key) => {
      let choice = prompt.choices.find((ch) => ch.name === key);
      console.log(choice.value);
    })
    .catch(console.error);
}

function delete_memo() {
  const prompt = new Select({
    name: "memo",
    message: "delete a memo",
    choices: memos,
  });
  prompt
    .run()
    .then((key) => {
      const filteredMemos = memos.filter((obj) => obj.name !== key);

      fs.writeFile("memo.json", JSON.stringify(filteredMemos), (err) => {
        if (err) {
          console.error("Error writing to memo.json:", err);
          return;
        }
      });
    })
    .catch(console.error);
}

let lines = [];
const memo = {
  name: "",
  value: "",
};

function purse_memo_json() {
  return JSON.parse(fs.readFileSync("memo.json", "utf8"));
}
const memos = purse_memo_json();

function registerNewMemo() {
  rl.on("line", (input) => {
    lines.push(input);
    return memo;
  });

  rl.on("close", () => {
    console.log("Input received:");
    memo.name = lines[0];
    memo.value = lines.join("\n");
    memos.push(memo);

    fs.writeFile("memo.json", JSON.stringify(memos), (err) => {
      if (err) {
        console.error("Error writing to memo.json:", err);
        return;
      }
      console.log("Data has been written to memo.json");
    });

    rl.close();
  });
}

if (options.list) {
  select_memo();
} else if (options.delete) {
  console.log("メモを選択して Enterキー を押してください");
  delete_memo();
} else {
  console.log("保存は Enterキー を押した後に Ctrl + C を押してください");
  registerNewMemo();
}
