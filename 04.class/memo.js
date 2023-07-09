export class Memo {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  get items() {
    return this._value;
  }
}
