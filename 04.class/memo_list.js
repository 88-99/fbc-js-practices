import fs from "node:fs";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoList {
  #memos;
  constructor() {
    this.#memos = JSON.parse(fs.readFileSync("memo.json", "utf8"));
  }

  addMemo(memo) {
    this.#memos.push(memo);
  }

  writeJsonFile() {
    fs.writeFile("memo.json", JSON.stringify(this.#memos), (err) => {
      if (err) {
        console.error("Error writing to memo.json:", err);
        return;
      }
      console.log("登録しました！");
    });
  }

  selectMemo() {
    const prompt = new Select({
      name: "memo",
      message: "メモを選択して Enterキー を押してください",
      choices: this.#memos,
    });
    prompt
      .run()
      .then((key) => {
        let choice = prompt.choices.find((ch) => ch.name === key);
        console.log(choice.value);
      })
      .catch(console.error);
  }

  deleteMemo() {
    const prompt = new Select({
      name: "memo",
      message: "削除するメモを選択し、Enterキー を押してください",
      choices: this.#memos,
    });
    prompt
      .run()
      .then((key) => {
        const filteredMemos = this.#memos.filter((obj) => obj.name !== key);

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
