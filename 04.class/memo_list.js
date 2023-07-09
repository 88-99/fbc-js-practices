import fs from "node:fs";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoList {
  constructor() {
    this.memos = JSON.parse(fs.readFileSync("memo.json", "utf8"));
  }

  get items() {
    return this.memos;
  }

  set items(memo) {
    this.memos.push(memo);
  }

  writeJsonFile(memos) {
    fs.writeFile("memo.json", JSON.stringify(memos), (err) => {
      if (err) {
        console.error("Error writing to memo.json:", err);
        return;
      }
      console.log("登録しました！");
    });
  }

  select_memo(memos) {
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

  delete_memo(memos) {
    const prompt = new Select({
      name: "memo",
      message: "削除するメモを選択し、Enterキー を押してください",
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
          console.log("削除しました！");
        });
      })
      .catch(console.error);
  }
}
