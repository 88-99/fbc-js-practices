#!/usr/bin/env node

import { MemoList } from "./memo_list.js";
import { Memo } from "./memo.js";
import { Content } from "./content.js";
import { program } from "commander";

const main = function () {
  program
    .option("-l, --list", "display list")
    .option("-d, --delete", "delete a memo")
    .parse();
  const options = program.opts();

  const memoList = new MemoList();
  if (options.list) {
    memoList.selectMemo();
  } else if (options.delete) {
    console.log("メモを選択して Enterキー を押してください");
    memoList.deleteMemo();
  } else {
    console.log("保存は Enterキー を押した後に Ctrl + C を押してください");
    registerNewMemo();
  }

  function registerNewMemo() {
    const content = new Content();
    content
      .input()
      .then(() => {
        const memo = new Memo(content.lines[0], content.lines.join("\n"));
        return memo;
      })
      .then((memo) => {
        const memoList = new MemoList();
        memoList.addMemo(memo);
        memoList.writeJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

main();
