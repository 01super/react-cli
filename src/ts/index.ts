const password = '123456';
// 存取器
class Employee {
  private _name = '';

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (password === '123456') {
      this._name = newName;
    } else {
      console.error('forbid');
    }
  }
}

const empl = new Employee();
console.log(empl.name);
empl.name = '234';
console.log(empl.name);